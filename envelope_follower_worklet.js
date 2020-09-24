import Constants from './constants.js';

class EnvelopeFollowerWorklet extends AudioWorkletProcessor {
	constructor() {
		super();
		this.numberOfEnvelopes = 8;

		this.lastSample = new Array(Constants.MAX_ENVELOPES).fill(0);
		this.lastSign = new Array(Constants.MAX_ENVELOPES).fill(0);
		this.currentLength = 0;
		this.minimumLength = Constants.RAMP_SAMPLES + 1;
	}

	followEnvelopes(sample) {
		let flag = true;

		// For each level but the top one, find whether we're at a local maximum to get the envelope
		for (let i = 0; flag && i < (this.numberOfEnvelopes - 2); i++) {
			let delta = sample - this.lastSample[i];
			let sign = delta == 0 ? this.lastSign[i] : delta / Math.abs(delta);
			if (this.lastSign[i] == 1 && sign == -1) { // Maximum
				flag = true;
			}
			else {
				flag = false;
			}
			this.lastSample[i] = sample;
			this.lastSign[i] = sign;
		}
		
		// We wish to find the minimum of the top envelope, as a splitting point.
		if (flag) {
			
			let i = this.numberOfEnvelopes - 2;
			let delta = sample - this.lastSample[i];
			let sign = delta == 0 ? this.lastSign[i] : delta / Math.abs(delta);
			if (this.lastSign[i] == -1 && sign == 1) {
				flag = true;
			}
			else {
				flag = false;
			}
			this.lastSample[i] = sample;
			this.lastSign[i] = sign;
		}

		// Check whether the length is too small to be audible
		if (flag && (this.currentLength < this.minimumLength)) {
			flag = false;
		}

		// If we get this far with the flag still set, we've hit a minimum in the top envelope.
		if (flag) {
			this.currentLength = 0;
			return true;

		}
		else {
			this.currentLength += 1;
			return false;
		}
	}

	// eslint-disable-next-line no-unused-vars
	process(inputs, outputs, parameters) {
		let input = inputs[0][0];

		for(let i = 0; i < input.length; i++) {
			if(this.followEnvelopes(input[i])) {
				this.port.postMessage({
					message: 'env',
					contextTimestamp: currentTime,
				});
			}
		}

		return true;
	}
}

registerProcessor('envelope-follower', EnvelopeFollowerWorklet);
