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
			{name: 'delayTime', defaultValue: DefaultDelayParameters.delayTime}];
	}

	// eslint-disable-next-line no-unused-vars
	clear(message) {
		this.audioMemory.fill(0);
	}

	// TODO: Add filtering
	process(inputs, outputs, parameters) {
		let regen = parameters.regen[0];
		let delayTime = parameters.delayTime[0];

		let input = inputs[0][0];
		let output = outputs[0][0];
		

		if(typeof input == 'undefined') {
			return true;
		}

		let delaySamples = delayTime * Constants.SAMPLE_RATE;
		for(let i = 0; i < input.length; i++) {
			let futureIndex = (this.headIndex + Math.floor(delaySamples)) % (Constants.MAX_DELAY_TIME * Constants.SAMPLE_RATE);
			this.audioMemory[futureIndex] = (this.audioMemory[this.headIndex] + input[i]) * regen;
			output[i] = this.audioMemory[this.headIndex];
			this.headIndex = (this.headIndex + 1) % (Constants.MAX_DELAY_TIME * Constants.SAMPLE_RATE);
		}
		return true;
	}
}

registerProcessor('delay-worklet', DelayWorklet);