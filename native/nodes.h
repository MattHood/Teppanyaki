#pragma once
#include "statics.h"

using namespace Teppanyaki;

class Gain {
public:
	void process(AudioSignal& input, Control gain);
	void process(AudioSignal& input, const ControlSignal& gain);
};

class SampleAndHold {
private:
	Sample storedValue = 0;
public:
	Sample process(const Sample& input, const Control& sampler);
	void process(AudioSignal& input, Control sampler);
	void process(AudioSignal& input, const ControlSignal& sampler);
};

class SlewLimiter {
private:
	Sample lastValue;
public:
	void process(AudioSignal& input, Control slew);
};