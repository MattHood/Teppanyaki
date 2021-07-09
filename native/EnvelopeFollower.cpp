#include "Teppanyaki.hpp"
#include <array>
#include <numeric>

namespace Teppanyaki {

EnvelopeFollower::EnvelopeFollower() : lp({ .cutoff = EnvelopeCutoff, .Q = EnvelopeQ }) { }

  bool EnvelopeFollower::process(Buffer buffer, Control cutoff) {
    lp.setParams({.cutoff = cutoff, .Q = EnvelopeQ });
  std::array<Sample, BufferSize> lowpassed;

  for(int i = 0; i < BufferSize; i++) {
    lowpassed[i] = lp.process(buffer[i]);
  }

  // Get slopes
  std::adjacent_difference(lowpassed.begin(), lowpassed.end(), lowpassed.begin());
  lowpassed[0] = lowpassed[0] - previousSample;
  previousDifference = buffer[BufferSize - 1];

  // Find minima. Doesn't bail early as that will give inconsistent performance based on where the minima might be located in the array
  bool flag = false;
  if(lowpassed[0] > 0 && previousDifference < 0) {
    flag = true;
  }
  for(int i = 1; i < BufferSize; i++) {
    // Equality excluded as it's better to miss a minima than to trigger halfway through a note
    if(lowpassed[i] > 0 && lowpassed[i-1] < 0) {
      flag = true;
    }
  }
  previousDifference = lowpassed.back();
  return flag;
}

}
