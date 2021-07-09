#include "Teppanyaki.hpp"
#include <random>
#include <array>
#include <ctime>
#include <cstdlib>
#include <cmath>

namespace Teppanyaki {
  namespace Utilities {
    
    Control randomUniform(MinMax bounds)
    {
      Control range = bounds.max - bounds.min;
      Control offset = bounds.min;
      Control random = (Control) rand() / (Control) RAND_MAX;
      return random * range + offset;
    }

    StereoSample monoToStereo(Sample sample, Control pan) {
      /* Simple pan algorithm:
      // Left:         | Right:
      // -1    0    1  | -1   0    1 
      //       ______  |  _____ 
      //      /        |       \
      //     /         |        \
      //    /          |         \
      //   /           |          \
      */

      const Control leftAmp = pan <= 0 ? 1 : 1 - pan;
      const Control rightAmp = pan < 0 ? 1 + pan : 1; 
      return { .left = leftAmp * sample, .right = rightAmp * sample };
    }

    Sample Gain::process(Sample input) {
      return input * gain;
    }

    inline Control slewLimiterKernel(Control input, Control previousOutput, Control slew) {
      const Control deltaMagnitude = std::abs(input - previousOutput);
      const Control deltaDirection = input >= previousOutput ? 1 : -1;
      return deltaMagnitude <= slew ? input : previousOutput + slew * deltaDirection;
    }

    Sample SlewLimiter::process(Control input) {
      const Control result = slewLimiterKernel(input, previousOutput, slew);
      previousOutput = result;
      return result;
    }

    Sample GainWithSlew::process(Sample input) {
      return input * slew.process(gain);
    }

    template<class T, int N>
    RingBuffer<T, N>::RingBuffer() {
      buffer = std::make_unique<std::array<T, N>>();
    }

    template<class T, int N>
    void RingBuffer<T, N>::advanceTarget() {
      target = (target + 1) % N;
    }

    // Not all 'T' classes will have operator= defined. This is a problem when using DelayModule in the RingBuffer. Owners of the ring buffer will need to do the clearing.
    /* template<class T, int N>
    // void RingBuffer<T, N>::clear(T clearValue) {
    //   for(int i = 0; i < N; i++) {
    //     (*buffer)[i] = clearValue;
    //   }
    // } */

    template<class T, int N>
    T& RingBuffer<T, N>::relative(int n) {
      return (*buffer)[(target + n) % N];
    }

    template<class T, int N>
    T& RingBuffer<T, N>::operator[](int n) {
      return (*buffer)[n % N];
    }

    // Templates need to be implemented with the header. The following workaround is for when you only have a few instances; it sort-of pre-declares the the instances you want to use. Alternatively, the RingBuffer implementation could be split off into its own 'RingBuffer.tpp' file and included wherever needed.
    template struct RingBuffer<Delay::DelayModule, NumberOfLines>;
    template struct RingBuffer<Sample, MaximumDelaySamples>;
    
  }
}
