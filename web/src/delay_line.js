import {Constants, InitialDelayParameters, DefaultParameters} from './Constants.js';

export class DelayLine {
	constructor(audioContext, inputNode, outputNode) {
		this.ac = audioContext;

		this.inputGain = this.ac.createGain();
		this.delay = this.ac.createDelay(Constants.MAX_DELAY_TIME);
		this.highpass = this.ac.createBiquadFilter();
		this.lowpass = this.ac.createBiquadFilter();
		this.feedback = this.ac.createGain();
		this.panner = this.ac.createStereoPanner();
		this.outputGain = this.ac.createGain();

		this.inputGain.gain.value = 0;
		this.delay.delayTime.value = InitialDelayParameters.delayTime;
		this.highpass.type = 'highpass';
		this.highpass.frequency.value = DefaultParameters.cutoffHP;
		this.highpass.Q.value = DefaultParameters.resonanceHP;
		this.lowpass.type = 'lowpass';
		this.lowpass.frequency.value = DefaultParameters.cutoffLP;
		this.lowpass.Q.value = DefaultParameters.resonanceLP;
		this.feedback.gain.value = InitialDelayParameters.regen;
		this.panner.pan.value = InitialDelayParameters.pan;
		this.outputGain.gain.value = 0;

		inputNode
			.connect(this.inputGain)
			.connect(this.delay)		// >---------\
			.connect(this.highpass)		//	Feedback |
			.connect(this.lowpass)		//	loop	 |
			.connect(this.feedback)		// 			 |
			.connect(this.delay)		// <---------/
			.connect(this.panner)
			.connect(this.outputGain)
			.connect(outputNode);
	}

	unmute() {
		this.inputGain.gain.value = 1;
		this.outputGain.gain.value = 1;
	}


	windDown() {
		this.outputGain.gain.linearRampToValueAtTime(0, this.ac.currentTime + Constants.RAMP_TIME);
	}

	clearAudio() {
		this.delay.delayTime.value = 0;
		this.feedback.gain.value = 0;
	}

	reset(delayTime, regen, pan, highpass, lowpass) {
		let rampDelta = this.ac.currentTime + Constants.RAMP_TIME;
		this.delay.delayTime.value = delayTime;
		this.feedback.gain.value = regen;
		this.panner.pan.value = pan;
		this.highpass.frequency.linearRampToValueAtTime(highpass, rampDelta);
		this.lowpass.frequency.linearRampToValueAtTime(lowpass, rampDelta);

		this.outputGain.gain.value = 1;
		this.inputGain.gain.linearRampToValueAtTime(1, rampDelta);
	}

	removeInput() {
		this.inputGain.gain.linearRampToValueAtTime(0, this.ac.currentTime + Constants.RAMP_TIME);
	}



}

export {DelayLine as default};