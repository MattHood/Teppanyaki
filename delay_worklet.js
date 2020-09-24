import {Constants, DefaultDelayParameters} from './constants.js';

class DelayWorklet extends AudioWorkletProcessor {
	
	constructor() {
		super();
		this.headIndex = 0;
		this.audioMemory = new Array(Constants.MAX_DELAY_TIME * Constants.SAMPLE_RATE).fill(0);
		this.port.onmessage = this.clear.bind(this);
	
	}
	// TODO: Max/min parameter values
	static get parameterDescriptors() {
		return [{name: 'regen', defaultValue: DefaultDelayParameters.regen},
			{name: 'delayTime', defaultValue: DefaultDelayParameters.delayTime},
			{name: 'pan', defaultValue: DefaultDelayParameters.pan}];
	}

	// eslint-disable-next-line no-unused-vars
	clear(message) {
		this.audioMemory.fill(0);
	}

	clamp(x, min, max) {
		return Math.max(min, Math.min(max, x));
	}

	// FIXME Could use less naive panning
	// -1 <= pan <= 1
	setGlobalPanAmplitudes(pan) {
		this.leftAmp = 0.5*(1 - pan);
		this.rightAmp = 0.5*(1 + pan);

		// Just in case floating point shenanigans give us gain > 1
		//this.leftAmp = this.clamp(this.leftAmp);
		//this.rightAmp = this.clamp(this.rightAmp);
	}

	// TODO: Add filtering
	// TODO: Add pan (global pan amplitudes already set, just do the array ops)
	process(inputs, outputs, parameters) {
		let regen = parameters.regen[0];
		let delayTime = parameters.delayTime[0];
		this.setGlobalPanAmplitudes(parameters.pan[0]);

		let input = inputs[0][0];
		let outputL = outputs[0][0];
		let outputR = outputs[0][1];

		if(typeof input == 'undefined') {
			return true;
		}

		let delaySamples = delayTime * Constants.SAMPLE_RATE;
		for(let i = 0; i < input.length; i++) {
			let futureIndex = (this.headIndex + Math.floor(delaySamples)) % (Constants.MAX_DELAY_TIME * Constants.SAMPLE_RATE);
			this.audioMemory[futureIndex] = (this.audioMemory[this.headIndex] + input[i]) * regen;
			outputL[i] = this.audioMemory[this.headIndex] * this.leftAmp;
			outputR[i] = this.audioMemory[this.headIndex] * this.rightAmp;
			this.headIndex = (this.headIndex + 1) % (Constants.MAX_DELAY_TIME * Constants.SAMPLE_RATE);
		}

		return true;
	}
}

registerProcessor('delay-worklet', DelayWorklet);