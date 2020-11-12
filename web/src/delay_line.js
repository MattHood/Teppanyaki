import {Constants, InitialDelayParameters, DefaultParameters} from './constants.js';

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
			.connect(this.delay);		// <---------/
		this.lowpass
			.connect(this.panner)
			.connect(this.outputGain)
			.connect(outputNode);
	}

	unmute() {
		this.inputGain.gain.linearRampToValueAtTime(0.8, this.delta());
		this.outputGain.gain.linearRampToValueAtTime(0.8, this.delta());
	}


	windDown() {
		this.outputGain.gain.linearRampToValueAtTime(0, this.delta());
	}

	clearAudio() {
		this.delay.delayTime.linearRampToValueAtTime(0, this.delta());
		this.feedback.gain.linearRampToValueAtTime(0, this.delta());
	}



	reset(delayTime, regen, pan, highpass, lowpass) {

		this.inputGain.gain.linearRampToValueAtTime(0.8, this.delta());
		this.delay.delayTime.value = delayTime;
		this.feedback.gain.linearRampToValueAtTime(regen, this.delta());
		this.panner.pan.linearRampToValueAtTime(pan, this.delta());
		this.highpass.frequency.linearRampToValueAtTime(highpass, this.delta());
		this.lowpass.frequency.linearRampToValueAtTime(lowpass, this.delta());

		this.outputGain.gain.linearRampToValueAtTime(0.8, this.delta());
		
	}

	removeInput() {
		this.inputGain.gain.linearRampToValueAtTime(0, this.delta());
	}

	delta() {
		return this.ac.currentTime + Constants.RAMP_TIME;
	}



}

export {DelayLine as default};