#define CATCH_CONFIG_MAIN
#include "catch2/catch_amalgamated.cpp"
#include <memory>
#include "nodes.cpp"
#include <iostream>

using namespace Teppanyaki;

TEST_CASE("Gain", "[node]") {
	AudioSignal signal;
	ControlSignal control;
	Gain gainNode;

	Control gainConstant = 0.8;
	for(int i = 0; i < control.size(); i++) {
		control[i] = (Control) 1 / (i + 1);
	}

	REQUIRE( signal.size() == BlockSize );

	SECTION( "Given identity signal and constant, returns constants signal" ) {
		signal.fill(1.0);
		gainNode.process(signal, gainConstant);
		bool flag = true;

		for(auto el: signal) {
			REQUIRE( el == gainConstant );
		}
	}

	SECTION( "Given identity signal and variable control, returns variable control" ) {
		signal.fill(1.0);
		gainNode.process(signal, control);

		for(int i = 0; i < control.size(); i++) {
			REQUIRE( signal[i] == control[i] );
		}
	}

}

TEST_CASE("Sample and Hold", "[node]") {

	SECTION("Scalar input, scalar sampler") {
		SampleAndHold sah;

		Sample s = 0.5;
		Control c = 0;
		REQUIRE( sah.process(s, c) == 0 ); // Initial value is 0

		c = 1;
		REQUIRE( sah.process(s, c) == 0.5); // Sample

		c = 0;
		REQUIRE( sah.process(s, c) == 0.5); // Hold
	}

	SECTION("Vector input, scaler sampler") {
		SampleAndHold sah;
		AudioSignal signal;
		for(int i = 0; i < signal.size(); i++) {
			signal[i] = (Sample) 1 / (i + 1);
		}

		// Initial value is 0
		Control c = 0;
		sah.process(signal, c);
		for(auto el: signal) {
			REQUIRE( el == 0 );
		}

		// Sample
		AudioSignal reference;
		for(int i = 0; i < signal.size(); i++) {
			signal[i] = (Sample) 1 / (i + 1);
			reference[i] = signal[i];
		}
		c = 1;
		sah.process(signal, c);
		for(int i = 0; i < signal.size(); i++) {
			REQUIRE( signal[i] == reference[i] );
		}

		// Hold
		for(int i = 0; i < signal.size(); i++) {
			signal[i] = (Sample) 1 / (i + 1);
		}
		c = 0;
		sah.process(signal, c);
		for(auto el: signal) {
			REQUIRE( el == reference.back() );
		}
	}

	SECTION("Vector input, vector sampler") {
		SampleAndHold sah;
		AudioSignal signal;
		AudioSignal reference;
		for(int i = 0; i < signal.size(); i++) {
			signal[i] = (Sample) 1 / (i + 1);
			reference[i] = signal[i];
		}

		// Inclusive
		int sb = 20;
		int se = 40;
		ControlSignal control;
		for(int i = 0; i < control.size(); i++) {
			if(i < sb || i > se) {
				control[i] = 0;
			}
			else {
				control[i] = 1;
			}
		}

		sah.process(signal, control);
		// std::cout << "Signal out: " << std::endl;
		// for(int i = 0; i < signal.size(); i++) {
		// 	std::cout << "[" << i <<"] S: " << signal[i] << " R: " << reference[i] << std::endl;
		// }

		for(int i = 0; i < signal.size(); i++) {
			if(i < sb) {
				REQUIRE( signal[i] == 0 );			}
			else if(i > se) {
				REQUIRE( signal[i] == reference[se] );
			}
			else {
				REQUIRE( signal[i] == reference[i] );
			}
		}
			
	}
}

TEST_CASE("Slew limiter", "[node]") {
	SECTION( "Test difference") {
		AudioSignal signal;
		SlewLimiter sl;

		// Alternating 0s and 1s in groups of 8
		auto setSignal = [] (AudioSignal& s) {
			for(int i = 0; i < s.size(); i++) {
				int r = i / 8;
				s[i] = r % 2 == 0 ? 0 : 1;
			}
		};

		std::array<Control, 4> slews = {0.5, 0.2, 0.001, 0.0000001};

		for(Control slew: slews) {
			setSignal(signal);
			sl.process(signal, slew);
			for(int i = 1; i < signal.size(); i++) {
				REQUIRE(std::abs(signal[i] - signal[i - 1]) <= slew);
			}

		}
	}
}

TEST_CASE("Random", "[node]") {
	std::array<float, 4> lower = {0, 2, 4, 8};
	std::array<float, 4> upper = {0, 4, 16, 64};
	Random rnd;

	for(int i = 0; i < lower.size(); i++) {
		Control r = rnd.process(lower[i], upper[i]);
		REQUIRE( (r >= lower[i] && r <= upper[i]) );
	}
}

TEST_CASE("Sequential switch", "[node]") {
	SequentialSwitch<AudioSignal, 4> swt;
	AudioSignal signal;
	AudioSignal zeros;

	for(int i = 0; i < signal.size(); i++) {
			signal[i] = (Sample) 1 / (i + 1);
	}	

	zeros.fill(0);

	// i:    0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
	// bank: 0 1 1 2 2 3 3 0 0 1  1  2  2  3  3  0
	// trig: 0 1 0 1 0 1 0 1 0 1  0  1  0  1  0  1
	// assm: 0 1 1 2 2 3 3 0 0 1  1  2  2  3  3  0
	// ^^^ Assumed state of SequentialSwitch

	for(int i = 0; i < 16; i++) {
		int bank = ((i + 1) / 2) % 4;
		Control trig = i % 2 == 0 ? 0 : 1;
		swt.process(signal, trig);
		for(int j = 0; j < 4; j++) {
			auto comp = j == bank ? signal : zeros;
			REQUIRE(std::equal(comp.begin(), comp.end(), swt.output[j].begin(), swt.output[j].end()));
		}
	}

}

