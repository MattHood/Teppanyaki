#include "simple_delay.hpp"

namespace SimpleDelay {


  const int MAX_DELAY_SAMPLES = MAX_DELAY_TIME * SAMPLE_RATE;
  std::array<Sample, MAX_DELAY_SAMPLES> audio_memory;
  int head_index;

  MonoBuffer process(MonoBuffer input, Parameters params) {
    MonoBuffer output;

    int delay_samples = params.delay_time * SAMPLE_RATE;

    for(int i = 0; i < BUFFER_SIZE; i++) {
      output[i] = audio_memory[head_index];
      int future_index = (head_index + delay_samples) % MAX_DELAY_SAMPLES;
      audio_memory[future_index] = (output[i] + input[i]) * params.regen;
      head_index = (head_index + 1) % MAX_DELAY_SAMPLES;
    }

    auto mixer = [params] (Sample wet, Sample dry)
                 { return params.mix * wet + (1 - params.mix * dry);};
    std::transform(output.begin(), output.end(),
                   input.begin(),
                   output.begin(),
                   mixer);
    return output;
  }


}
