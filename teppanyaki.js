import {Constants, DefaultParameters} from './constants.js';
import DelayLine from './delay_line.js';

export default class Teppanyaki {

	constructor(context, inputNode) {
		this.audioContext = context;
		this.lines = new Array(Constants.NUMBER_OF_LINES);
		this.wetInput = this.audioContext.createGain();
		this.wetOutput = this.audioContext.createGain();
		this.dryInput = this.audioContext.createGain();
		this.mixedOutput = this.audioContext.createGain();
		this.activeLine = 0;
		
		inputNode.connect(this.wetInput);
		inputNode.connect(this.dryInput);

		// Create NUMBER_OF_LINES delay lines
		for(var i = 0; i < Constants.NUMBER_OF_LINES; i++) {
			this.lines[i] = new DelayLine(this.audioContext, this.wetInput, this.wetOutput);
		}
		// Unmute the first line
		this.lines[this.activeLine].unmute();

		this.wetOutput.connect(this.mixedOutput);
		this.dryInput.connect(this.mixedOutput);
		this.mixedOutput.connect(this.audioContext.destination);

		this.audioContext.audioWorklet
			.addModule('envelope_follower_worklet.js')
			.then(() => {
				this.env = new AudioWorkletNode(this.audioContext, 'envelope-follower');
				inputNode.connect(this.env);
				this.env.port.onmessage = this.envelope.bind(this);
			});

		this.parameterState = DefaultParameters;

		this.setMix(this.parameterState.mix);

	}

	//  Below are the parameters that will be applied to the next delay line
	//
	setDelayTime(min, max) {
		this.parameterState.delayMin = min;
		this.parameterState.delayMax = max;
	}

	setRegen(min, max) {
		this.parameterState.regenMin = min;
		this.parameterState.regenMax = max;
	}

	setPan(min, max) {
		this.parameterState.panMin = min;
		this.parameterState.panMax = max;
	}

	setFilter(hp, lp) {
		this.parameterState.cutoffHP = hp;
		this.parameterState.cutoffLP = lp;
	}

	// Then the more global parameters
	setEnvelopeLevel(level) {
		let p = this.env.parameters.get('level');
		p.value = level;
	}

	setMix(mix) {
		let wetGain = mix;
		let dryGain = 1 - mix;
		let transitionTime = this.audioContext.currentTime + Constants.RAMP_TIME;
		this.wetOutput.gain.linearRampToValueAtTime(wetGain, transitionTime);
		this.dryInput.gain.linearRampToValueAtTime(dryGain, transitionTime);
	}

	randomInRange(min, max) {
		return Math.random()*(max - min) + min;
	}

	realiseParametersAsLineSettings(parameters) {
		let lineSettings = {
			delayTime: this.randomInRange(parameters.delayMin, parameters.delayMax),
			regen: this.randomInRange(parameters.regenMin, parameters.regenMax),
			pan: this.randomInRange(parameters.panMin, parameters.panMax),
			highpass: parameters.cutoffHP,
			lowpass: parameters.cutoffLP
		};
		return lineSettings;
	}


	// eslint-disable-next-line no-unused-vars
	envelope(evt) {
		let prev = this.activeLine;
		let next = (this.activeLine + 1) % Constants.NUMBER_OF_LINES;
		let after = (next + 1) % Constants.NUMBER_OF_LINES;
		let future = (after + 1) % Constants.NUMBER_OF_LINES;

		let newParams = this.realiseParametersAsLineSettings(this.parameterState);

		this.lines[prev].removeInput();
		this.lines[next].reset(
			newParams.delayTime, 
			newParams.regen, 
			newParams.pan,
			newParams.highpass,
			newParams.lowpass);
		this.lines[after].clearAudio();
		this.lines[future].windDown();


		this.activeLine = next;
	}

}

