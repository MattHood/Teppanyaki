#pragma once
#include <array>
#include <memory>

namespace Teppanyaki  {
  using Sample = float;
  using Control = float;
  struct StereoSample { Sample left; Sample right; };
  struct MinMax { Control min; Control max; };
 
  constexpr int SampleRate = 44100;
  const int NumberOfLines = 32;
  const int BufferSize = 128;
  constexpr Control MaximumDelayTime = 3;
  constexpr int MaximumDelaySamples = SampleRate * MaximumDelayTime;
  const Control MaximumControlDelta = 20 / SampleRate;
  const Control LowpassQ = 0.7;
  const Control HighpassQ = 0.7;
  const Control EnvelopeQ = 0.2;
  const Control EnvelopeCutoff = 10;
  const float PotInputMaxM = 0.675;
  const float PotInputMinM = 0.325;
  const int DefaultEnvelopeLevels = 6;
  const MinMax TimeBounds = { .min = 0.1, .max = MaximumDelayTime };
  const MinMax RegenBounds = { .min = 0, .max = 0.9 };
  const MinMax FilterBounds = { .min = 20, .max = 20000 };
  const MinMax PanBounds = { .min = -1, .max = 1 };
  const int MaxEnvelopes = 10;
  
  // C-style array for external compatibility
  using Buffer = Sample[BufferSize];
  using StereoBuffer = StereoSample[BufferSize];
  

  namespace Filter {

    struct BiquadCoefficients { float a0, a1, a2, b0, b1, b2; };
    struct FilterParameters { Control cutoff; Control Q; };
    BiquadCoefficients calculateLowpassBiquadCoefficients(const FilterParameters& params);
    BiquadCoefficients calculateHighpassBiquadCoefficients(const FilterParameters& params);

    struct Biquad {
      Biquad(BiquadCoefficients initial);
      Sample process(Sample input);
      BiquadCoefficients C;
      Sample y1, y2, x1, x2;
    };

    struct Lowpass {
      Lowpass(FilterParameters inital);
      Sample process(Sample input);
      void setParams(FilterParameters params);
      Biquad biquad;
    };

    struct Highpass {
      Highpass(FilterParameters initial);
      Sample process(Sample input);
      void setParams(FilterParameters params);
      Biquad biquad;
    };

  }

  namespace Utilities {

    Control randomUniform(MinMax bounds);
    StereoSample monoToStereo(Sample sample, Control pan);

    struct SlewLimiter {
      Control process(Control input);
      Control previousOutput;
      Control slew = MaximumControlDelta;
    };

    struct Gain {
      Sample process(Sample input);
      Control gain = 1;
    };

    struct GainWithSlew {
      Sample process(Sample input);
      Control gain;
      SlewLimiter slew;
    };

    // index from target?
    template<class T, int N>
    struct RingBuffer {
      // TODO Do we need zero initialisation?
      std::unique_ptr<std::array<T, N>> buffer;
      int target = 0;
      RingBuffer();
      void advanceTarget();
      //void clear(T clearValue);
      T& relative(int n = 0);
      T& operator[](int n);
    };

  }

  namespace Delay {
    struct DelayLineParameters { Control time; Control regen; Control pan; Control lowpass; Control highpass; };
    enum DelayLineState { Active = 0, Passive = 1, Closing = 2, Clearing = 3 };
    struct StateParams { Control inputGain; Control outputGain; bool wipe; };
    struct DelayModuleParameters { MinMax time; MinMax regen; MinMax pan; MinMax filter; bool quantize; Control bpm; int subdivision; };

    const DelayLineParameters defaultDelayLineParameters =
      { .time = 1, .regen = 0.4, .pan = 0, .lowpass = 6000, .highpass = 500 };
    const DelayModuleParameters defaultDelayModuleParameters =
      { .time = { .min = 0.5, .max = 1.5 },
        .regen = { .min = 0.2, .max = 0.6 },
        .pan = { .min = -1, .max = 1 },
        .filter = { .min = 500, .max = 6000 },
        .quantize = false,
        .bpm = 120,
        .subdivision = 4 };

    int timeToSamples(Control time);
    
    
    struct DelayLine {
      DelayLine(const DelayLineParameters& initial);
      Sample process(Sample input);
      void setParams(DelayLineParameters update);
      void clear();
      Filter::Lowpass lowpassFilter;
      Filter::Highpass highpassFilter;
      DelayLineParameters params;
      Utilities::RingBuffer<Sample, MaximumDelaySamples> buffer;
    };

    // This part may have problems
    const std::array<const StateParams, 4> ParamTable {{
      { 1, 1, false }, // [Active]
      { 0, 1, false }, // [Passive]
      { 0, 0, false }, // [Closing]
      { 0, 0, true  }  // [Clearing]
    }};

    Control quantizeDelayTime(Control unquantizedTime, Control bpm);
    DelayLineParameters collapseModuleParametersToLine(const DelayModuleParameters& params);
    
    struct DelayModule {
      DelayLine delayLine;
      Utilities::GainWithSlew inputGain;
      Utilities::GainWithSlew outputGain;
      DelayModule();
      StereoSample process(Sample input);
      void advanceToState(DelayLineState& state, const DelayModuleParameters& updatedParams);
    };

    DelayLineState stateFromIndex(int index, int currentOffset);

    class DelayManager {
      // Need to initialise delayModules?
      Utilities::RingBuffer<DelayModule, NumberOfLines> delayModules;
    
    public:
      StereoSample process(Sample input);
      void triggerLineAdvance(const DelayModuleParameters& updatedParams);
      DelayManager();
    };

  }

  struct EnvelopeFollower {
    bool process(Buffer buffer, int level);
    //bool process(Buffer buffer, Control cutoff);
    void differenceFilter(std::array<Sample, BufferSize>& buffer, int level);
    int envelopeLevels = DefaultEnvelopeLevels;
    EnvelopeFollower();
    Filter::Lowpass lp;
    std::array<Sample, MaxEnvelopes> previous { 0 };
    Sample previousSample = 0;
    Sample previousDifference = 0;
  };

  struct KernelParameters { MinMax time; MinMax regen; MinMax filter; MinMax pan; bool quantize; Control bpm; int subdivision; Control envelopeSize; };
  Delay::DelayModuleParameters kernelParametersToDelayModule(const KernelParameters& params);

  class TeppanyakiKernel {
  public:
    void process(Buffer input, StereoBuffer output, const KernelParameters& params);
    void setParams(const KernelParameters& updatedParams);
  private:
    Delay::DelayManager delays;
    EnvelopeFollower envelopeFollower;
  };

  struct ControlParameters {
    Control time; Control regen; Control filter;
    Control pan; Control envelopeSize; Control mix;
    bool quantize; Control bpm; int subdivision;
  };

  struct InputCoefficients { float a; float b; float c; };

  
  constexpr InputCoefficients calculateInputCoefficients(float m);
  MinMax parametriseScalarInputs(Control control);
  MinMax scaleMinMax(MinMax input, Control inf, Control sup);
  KernelParameters controlParametersToKernel(const ControlParameters& params);

  class Teppanyaki {
  public:
    void process(StereoBuffer input, StereoBuffer output, const ControlParameters& params);
  private:
    TeppanyakiKernel kernel;
    Buffer inputBuffer;
  };

}
  

  
  
