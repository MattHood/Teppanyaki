#ifndef __SIMPLE_DELAY_H_
#define __SIMPLE_DELAY_H_

#include <tuple>
#include <array>
#include <algorithm>

namespace SimpleDelay {
    const int BUFFER_SIZE = 128;
  const int SAMPLE_RATE = 44100;
  const int MAX_DELAY_TIME = 3;
  const int MIN_DELAY_SAMPLES = 2000;
  using Sample = float;
  using MonoBuffer = std::array<Sample, BUFFER_SIZE>;
  using StereoSample = std::tuple<Sample, Sample>;
  using StereoBuffer = std::array<StereoSample, BUFFER_SIZE>;

  typedef struct {
    float regen;
    float delay_time;
    float mix;
  } Parameters;

  void init();
  MonoBuffer process(MonoBuffer input, Parameters params);
}

#endif // __SIMPLE_DELAY_H_
