#include "Teppanyaki.hpp"
#include <array>
#include <cmath>

namespace Teppanyaki {
  namespace Filter {
    
    const float Pi = 3.14159265358979;
  
    Biquad::Biquad(BiquadCoefficients initial) {
      C = initial;
      y1 = y2 = x1 = x2 = 0;
    }

    Sample Biquad::process(Sample x0) {
      // Compute Biquad filter, direct form 1:
      // https://en.wikipedia.org/wiki/Digital_biquad_filter#Direct_form_1
      Sample y0 = ( 1 / C.a0 ) * (   C.b0*x0 + C.b1*x1 + C.b2*x2 - C.a1*y1 - C.a2*y2 );

      // Update feedback samples
      y2 = y1; y1 = y0;
      x2 = x1; x1 = x0;

      return y0;
    }

    struct Vals { float cosw0, alpha; };
    Vals intermediateValues(float cutoff, float Q) {
      float w0 = w0 = 2 * Pi * (cutoff / SampleRate);
      return { .cosw0 = std::cos(w0), .alpha = std::sin(w0) / (2 * Q) };
    }

    BiquadCoefficients calculateLowpassBiquadCoefficients(const FilterParameters& params) {
      // See https://webaudio.github.io/Audio-EQ-Cookbook/audio-eq-cookbook.html, equation (15)
      auto V = intermediateValues(params.cutoff, params.Q);
      return {
	      .a0 = 1 + V.alpha,
	      .a1 = -2 * V.cosw0,
	      .a2 = 1 - V.alpha,
	      .b0 = (1 - V.cosw0) / 2,
	      .b1 = (1 - V.cosw0),
	      .b2 = (1 - V.cosw0) / 2
      };
    }
  
    BiquadCoefficients calculateHighpassBiquadCoefficients(const FilterParameters& params) {
      // See https://webaudio.github.io/Audio-EQ-Cookbook/audio-eq-cookbook.html, equation (17)
      auto V = intermediateValues(params.cutoff, params.Q);
      return {
	    .a0 = 1 + V.alpha,
        .a1 = -2 * V.cosw0,
        .a2 = 1 - V.alpha,
        .b0 = (1 + V.cosw0) / 2,
        .b1 = -1 * (1 + V.cosw0),
        .b2 = (1 + V.cosw0) / 2
      };
    }
    
    Lowpass::Lowpass(FilterParameters initial) : biquad(calculateLowpassBiquadCoefficients(initial)) {};  
    void Lowpass::setParams(FilterParameters params) { 
      biquad.C = calculateLowpassBiquadCoefficients(params);
    }
    
    Sample Lowpass::process(Sample input) { return biquad.process(input); }

    Highpass::Highpass(FilterParameters initial) : biquad(calculateHighpassBiquadCoefficients(initial)) {};
    
    void Highpass::setParams(FilterParameters params) {
      biquad.C = calculateHighpassBiquadCoefficients(params);
    }

    Sample Highpass::process(Sample input) { return biquad.process(input); }

  }
}
