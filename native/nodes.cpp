#pragma once
#include "nodes.h"
#include <random>


using namespace Teppanyaki;

// Utility Functions
template <typename T> 
int sgn(T val) {
	return (T(0) < val) - (val < T(0));
}	

// Gain

void Gain::process(AudioSignal& input, Control gain) {
	auto amp = [gain] (Sample s) -> Sample { return s * gain; };
	std::transform(input.begin(), input.end(), input.begin(), amp);
}

void Gain::process(AudioSignal& input, const ControlSignal& gain) {
	auto amp = [] (Sample s, Control c) -> Sample { return s * c; };
	std::transform(input.begin(), input.end(), gain.begin(), input.begin(), amp);
}


// Sample and Hold


Sample SampleAndHold::process(const Sample& input, const Control& sampler) {
	if(sampler == 1) {
		this->storedValue = input;
	}

	return this->storedValue;
}


void SampleAndHold::process(AudioSignal& input, Control sampler) {
	if(sampler == 1) {
		this->storedValue = input.back();
	}
	else {
		input.fill(this->storedValue);
	}
}

void SampleAndHold::process(AudioSignal& input, const ControlSignal& sampler) {
	std::transform(input.begin(), input.end(), sampler.begin(), input.begin(),
		[this] (Sample s, Control c) -> Sample { return this-> process(s, c); });
}



// Slew Limiter
// Note: not smooth a.k.a differentiable
void SlewLimiter::process(AudioSignal& input, Control slew) {

	auto limiter = [slew, this](Sample s) {
		const auto delta = s - lastValue;
		lastValue += sgn(delta) * std::min(std::abs(delta), std::abs(slew));
		return lastValue;
	};

	std::transform(input.begin(), input.end(), input.begin(), limiter);
}



// Random
class Random {
public:
	std::random_device rd;
	std::mt19937 gen;

	Random() : gen(rd()) {

	}

	Control process(Control lower, Control upper) {
		std::uniform_real_distribution<> dist(lower, upper);

		return (Control)dist(gen);
	}

};



// Sequential switch
// Usage: Just access the 'output' array for now. Acts as a buffer.
// Note: block level resolution
template <typename InputType, uint Size>
class SequentialSwitch {
public:
	std::array<InputType, Size> output;
	int index;

	SequentialSwitch() : output() {

	}

	void process(const InputType& input, const Control& trigger) {
		if(trigger != 0) {
			output.at(index).fill(0);
			index = (index + 1) % Size;
		}
		std::copy(input.begin(), input.end(), output.at(index).begin());
	}
};

class BandpassFilter {

}

template<uint Length>
class DelayLine {

	void process(AudioSignal& input, Control time, Control regen, Control)
}


















