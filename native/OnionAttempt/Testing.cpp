#include "Teppanyaki.hpp"
#include <iostream>

int main() {
  //Teppanyaki::Delay::DelayLine dl{Teppanyaki::Delay::defaultDelayLineParameters};
  //Teppanyaki::Delay::DelayModule dm{};
  //Teppanyaki::Delay::DelayManager dmg{};

  Teppanyaki::Teppanyaki tepp;
  Teppanyaki::StereoBuffer input;
  Teppanyaki::StereoBuffer output;

  

  for(int i = 0; i < Teppanyaki::BufferSize; i++) {
    Teppanyaki::Sample val = i < 32 ? 1.0f : 0.0f;
    input[i] = { .left = val, .right = val };
  }

  Teppanyaki::ControlParameters params = {
    .time = 0.2,
    .regen = 0.3,
    .filter = 0.5,
    .pan = 0,
    .envelopeSize = 0.5,
    .mix = 0.5,
    .quantize = false,
    .bpm = 120,
    .subdivision = 4
  };

  tepp.process(input, output, params);

  for(int i = 0; i < Teppanyaki::BufferSize; i++) {
    std::cout << output[i].left << ", " << output[i].right << std::endl;
  }

  return 0;
}
