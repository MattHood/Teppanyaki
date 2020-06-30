#include <iostream>
#include <fstream>
#include "simple_delay.hpp"

const int IMPULSE = 1;

int main(int argc, char** argv) {
  SimpleDelay::init();
  SimpleDelay::MonoBuffer zerobuf;
  SimpleDelay::MonoBuffer onebuf;
  SimpleDelay::MonoBuffer outbuf;
  std::fill(zerobuf.begin(), zerobuf.end(), 0);
  std::fill(onebuf.begin(), onebuf.end(), 1);
  SimpleDelay::Parameters params = { .regen = 0.8, .delay_time = 0.5, .mix =  0.5};

  std::ofstream outfile;
  outfile.open("delay.csv");

  int sample = 0;

  for(int i = 0; i < IMPULSE; i++) {
    outbuf = SimpleDelay::process(onebuf, params);
    for(int j = 0; j < SimpleDelay::BUFFER_SIZE; j++) {
      outfile << sample << "," << outbuf[j] << "\n";
      sample++;
    }
  }

  int remaining = SimpleDelay::MAX_DELAY_TIME * SimpleDelay::SAMPLE_RATE - IMPULSE * SimpleDelay::BUFFER_SIZE;
  for(int i = 0; i < remaining; i++) {
    outbuf = SimpleDelay::process(zerobuf, params);
    for(int j = 0; j < SimpleDelay::BUFFER_SIZE; j++) {
      outfile << sample << "," << outbuf[j] << "\n";
      sample++;
    }
  }

  outfile.close();

  return 0;


}
