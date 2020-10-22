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
		if(this.env !== undefined) {
			let p = this.tepp.env.parameters.get('level');
			p.value = val; 
		}
	}

	set mix(val) {
		let wetGain = val;
		let dryGain = 1 - val;
		let transitionTime = this.tepp.audioContext.currentTime + Constants.RAMP_TIME;
		this.tepp.wetOutput.gain.linearRampToValueAtTime(wetGain, transitionTime);
		this.tepp.dryInput.gain.linearRampToValueAtTime(dryGain, transitionTime);
	}

}