#include "Teppanyaki.hpp"
#include <array>
#include <numeric>
#include <iostream>

namespace Teppanyaki {

EnvelopeFollower::EnvelopeFollower() : lp({ .cutoff = EnvelopeCutoff, .Q = EnvelopeQ }) { }

void EnvelopeFollower::differenceFilter(std::array<Sample, BufferSize>& buffer, int level = 0) {
  std::adjacent_difference(buffer.begin(), buffer.end(), buffer.begin());
  buffer[0] = buffer[0] - previous[level];
  previous[level] = buffer.back();
  if(level < envelopeLevels) {
    differenceFilter(buffer, level + 1);
  }
} 

bool EnvelopeFollower::process(Buffer buffer, /*Control cutoff*/ int level) {
  //lp.setParams({.cutoff = cutoff, .Q = 4 });
  std::array<Sample, BufferSize> lowpassed;
  envelopeLevels = level;

  for(int i = 0; i < BufferSize; i++) {
    lowpassed[i] = lp.process(buffer[i]);
  }
  differenceFilter(lowpassed);

  // auto previousDifference = previous[envelopeLevels];

  // Find minima. Doesn't bail early as that will give inconsistent performance based on where the minima might be located in the array
  bool flag = false;
  bool printFlag = false;
  // if(lowpassed[0] > 0 && previousDifference < 0) {
  //   flag = true;
  // }
  for(int i = 1; i < BufferSize; i++) {
    // Equality excluded as it's better to miss a minima than to trigger halfway through a note
    if(lowpassed[i] != 0) {
      printFlag = true;
    }
    // if(printFlag) {
    //   std::cout << lowpassed[i] << " ";
    // }
    if(lowpassed[i] > 0 && lowpassed[i-1] < 0) {
      flag = true;
    }
  }
  //if(printFlag) { std::cout << std::endl; };
  previousDifference = lowpassed.back();
  return flag;
}

}
