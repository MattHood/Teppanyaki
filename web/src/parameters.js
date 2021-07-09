import {Constants, DefaultParameters} from './constants.js';

export default class TeppanyakiParameters {
	constructor(teppanyakiReference) {
		this.tepp = teppanyakiReference;

		// Take the properties defined in DefaultParameters
		// and copy them over to this class. Most of these 
		// will be 'pull'-style properties, which Teppanyaki 
		// can query when it has an opportunity.
		for(let [param, value] of Object.entries(DefaultParameters)) {
			this[param] = value;
		}
	}

	// There isn't a good opportunity in the Teppanyaki class to chamge the envelope level, 
	// so this uses the Teppanyaki reference to push the value to the envelope follower.
	set envelopeLevel(val) {
		if(this.tepp.env !== undefined) {
			let p = this.tepp.env.parameters.get('level');
			p.value = val; 
		}
	}

	set mix(val) {
		let wetGain = val;
		let dryGain = 1 - val;
		this.tepp.wetOutput.gain.linearRampToValueAtTime(wetGain, this.delta());
		this.tepp.dryInput.gain.linearRampToValueAtTime(dryGain, this.delta());
	}

	randomInRange(min, max) {
		return Math.random()*(max - min) + min;
	}

	quantizeDelayTime(time) {
		let beatsPerSecond = this.bpm / 60;
		let subdivisionTime = beatsPerSecond / this.subdivision;
		let multiplier = Math.round(time / subdivisionTime);
		let quantizedTime = multiplier * subdivisionTime;
		return quantizedTime;
	}

	realiseParametersAsLineSettings() {
		let lineSettings = {
			delayTime: this.randomInRange(this.delayMin, this.delayMax),
			regen: this.randomInRange(this.regenMin, this.regenMax),
			pan: this.randomInRange(this.panMin, this.panMax),
			highpass: this.cutoffHP,
			lowpass: this.cutoffLP
		};

		if(this.quantize == 1) {
			lineSettings.delayTime = this.quantizeDelayTime(lineSettings.delayTime);
		}

		return lineSettings;
	}

	delta() {
		return this.tepp.audioContext.currentTime + Constants.RAMP_TIME;
	}

	

}