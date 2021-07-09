#include "Teppanyaki.hpp"
#include <cmath>

// TODO param initialisation is probably wrong

namespace Teppanyaki {
    namespace Delay {
      int timeToSamples(Control time)
      {
        return time * SampleRate;
      }

      DelayLine::DelayLine(const DelayLineParameters& initial)
        : lowpassFilter({.cutoff = initial.lowpass, .Q = LowpassQ }),
          highpassFilter({.cutoff = initial.highpass, .Q = HighpassQ})
      {
        params = initial;
      }

      void DelayLine::setParams(DelayLineParameters update)
      {
        params = update;
        lowpassFilter.setParams({.cutoff = params.lowpass, .Q = LowpassQ});
        highpassFilter.setParams({.cutoff = params.highpass, .Q = HighpassQ});
      }

      void DelayLine::clear() {
        // If RingBuffer weren't a leaky abstraction, we could treat this like a normal array. Alas,
        for(int i = 0; i < NumberOfLines; i++) {
          buffer[i] = 0;
        }
      }

      Sample DelayLine::process(Sample input)
      {
        Sample reap = buffer.relative(0);
        Sample sow = reap + input;
        sow = lowpassFilter.process(sow);
        sow = highpassFilter.process(sow);
        sow = params.regen * sow;
        buffer.relative(timeToSamples(params.time)) = sow;
        
        return reap;
      }

      Control quantizeDelayTime(Control unquantizedTime, Control bpm, int subdivision)
      {
        Control beatsPerSecond = bpm / 60;
        Control timeUnit = beatsPerSecond / subdivision;
        Control multiplier = std::round(unquantizedTime / timeUnit);
        return multiplier * timeUnit;
      }

      DelayLineParameters collapseModuleParametersToLine(const DelayModuleParameters& params)
      {
        Control time = Utilities::randomUniform(params.time);
        if(params.quantize) {
          time = quantizeDelayTime(time, params.bpm, params.subdivision);
        }
        return {
          .time = time,
          .regen = Utilities::randomUniform(params.regen),
          .pan = Utilities::randomUniform(params.pan),
          .lowpass = params.filter.max,
          .highpass = params.filter.min
        };
      }
      
      DelayModule::DelayModule() : delayLine(defaultDelayLineParameters) { };

      void DelayModule::advanceToState(DelayLineState& state, const DelayModuleParameters& updatedParams)
      {
        StateParams nextState = ParamTable[state];
        inputGain.gain = nextState.inputGain;
        outputGain.gain = nextState.inputGain;
        if(nextState.wipe) {
          delayLine.clear();
          delayLine.setParams(collapseModuleParametersToLine(updatedParams));
        }
      }

      StereoSample DelayModule::process(Sample input) {
        Sample prePan = outputGain.process(delayLine.process(inputGain.process(input)));
        // Signal flow wants pan DelayModule, but the pan variable organisationally
        // belongs with DelayLine (accompanied by other random variables time, regen).
        return Utilities::monoToStereo(prePan, delayLine.params.pan);
      }

      DelayLineState stateFromIndex(int index) {
        DelayLineState state;
        switch(index) {
        case 0:
          state = DelayLineState::Active;
        case 1:
          state = DelayLineState::Clearing;
        case 2:
          state = DelayLineState::Closing;
        default:
          state = DelayLineState::Passive;
        }
        return state;
      }

      void DelayManager::triggerLineAdvance(const DelayModuleParameters& updatedParams) {
        for(int i = 0; i < NumberOfLines; i++) {
          DelayLineState state = stateFromIndex(i);
          delayModules.relative(i).advanceToState(state, updatedParams);
        }
        // By advancing last, this function can be used on the first run, since RingBuffer
        // starts 'target' at 0.
        delayModules.advanceTarget();
      }

      DelayManager::DelayManager() {
        triggerLineAdvance(defaultDelayModuleParameters);
      }

      StereoSample DelayManager::process(Sample input) {
        StereoSample output = { .left = 0, .right = 0 };
        
        for(int i = 0; i < NumberOfLines; i++) {
          StereoSample lineOutput = delayModules[i].process(input);
          output.left += lineOutput.left; output.right += lineOutput.right;
        }
        return output;
      }
      
    }
}
