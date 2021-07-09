#include "Teppanyaki.hpp"
#include <cmath>

namespace Teppanyaki {

  Delay::DelayModuleParameters kernelParametersToDelayModule(const KernelParameters& params) {
    // Copy everything except for envelope size really, and maybe wet/dry at some point?
    return {
      .time = params.time,
      .regen = params.regen,
      .filter = params.filter,
      .pan = params.pan,
      .quantize = params.quantize,
      .bpm = params.bpm,
      .subdivision = params.subdivision
    };
  }

  void TeppanyakiKernel::process(Buffer input, StereoBuffer output, const KernelParameters& params) {
    bool envelopeFollowerResult = envelopeFollower.process(input, params.envelopeSize);
    if(envelopeFollowerResult) {
      const Delay::DelayModuleParameters delayParams = kernelParametersToDelayModule(params);
      delays.triggerLineAdvance(delayParams);
    }

    for(int i = 0; i < BufferSize; i++) {
      output[i] = delays.process(input[i]);
    }
  }

  
  constexpr InputCoefficients calculateInputCoefficients(float m) {
    float a = 1.0 / (1 - 3*m + 3*m*m);
    float b = -3*a*m;
    float c = 3*a*m*m;
    return { .a = a, .b = b, .c = c} ;
  }

  const InputCoefficients maxCoefficients = calculateInputCoefficients(PotInputMaxM);
  const InputCoefficients minCoefficients = calculateInputCoefficients(PotInputMinM);

  MinMax parametriseScalarInputs(Control control) {
    Control min = minCoefficients.a * std::pow(control, 3)
      + minCoefficients.b * std::pow(control, 2)
      + minCoefficients.c * control;
    Control max = maxCoefficients.a * std::pow(control, 3)
      + maxCoefficients.b * std::pow(control, 2)
      + maxCoefficients.c * control;
    return { .min = min, .max = max };
  }

  Control scaleValue(Control input, Control inf, Control sup) {
    return input * (sup - inf) + inf;
  }

  MinMax scaleMinMax(MinMax input, Control inf, Control sup) {
    return { .min = scaleValue(input.min, inf, sup), .max = scaleValue(input.max, inf, sup) };
  }

  MinMax scaleInput(Control control, const MinMax& bounds) {
    return scaleMinMax(parametriseScalarInputs(control), bounds.min, bounds.max);
  }

  KernelParameters controlParametersToKernel(const ControlParameters& params) {
    return {
      .time = scaleInput(params.time, TimeBounds),
      .regen = scaleInput(params.regen, RegenBounds),
      .filter = scaleInput(params.filter, FilterBounds),
      .pan = scaleInput(params.pan, PanBounds),
      .quantize = params.quantize,
      .bpm = params.bpm,
      .subdivision = params.subdivision
    };
  }

  void stereoBufferToMono(StereoBuffer stereo, Buffer mono) {
    for(int i = 0; i < BufferSize; i++) {
      mono[i] = stereo[i].left + stereo[i].right;
    }
  }

  void Teppanyaki::process(StereoBuffer input, StereoBuffer output, const ControlParameters& params) {
    stereoBufferToMono(input, inputBuffer);
    KernelParameters updatedParams = controlParametersToKernel(params);
    kernel.process(inputBuffer, output, updatedParams);
  }


  
}
