#include "simple_delay.hpp"
#include <algorithm>
#include <emscripten/bind.h>

const int BUFFER_SIZE = 128;
const int BYTES_PER_CHANNEL = BUFFER_SIZE * sizeof(float);

class SimpleDelayKernel {
 public:
  SimpleDelayKernel() {
    SimpleDelay::init();
  }

  SimpleDelay::MonoBuffer input_buffer;
  SimpleDelay::MonoBuffer output_buffer;

  const SimpleDelay::Parameters params = {.regen = 0.8, .delay_time = 0.5, .mix = 0.5 };

  void Process(uintptr_t input_ptr, uintptr_t output_ptr,
               unsigned channel_count) {
    float* input_raw = reinterpret_cast<float*>(input_ptr);
    float* output_raw = reinterpret_cast<float*>(output_ptr);

    std::copy_n(input_raw, BUFFER_SIZE, input_buffer.begin());

    output_buffer = SimpleDelay::process(input_buffer, params);
    for(int channel = 0; channel < channel_count; channel++) {
      std::copy_n(output_buffer.begin(), BUFFER_SIZE, output_raw + channel * BUFFER_SIZE);
    }

  }
};


EMSCRIPTEN_BINDINGS(CLASS_SimpleDelayKernel) {
  emscripten::class_<SimpleDelayKernel>("SimpleDelayKernel")
      .constructor()
      .function("process",
                &SimpleDelayKernel::Process,
                emscripten::allow_raw_pointers());
}
