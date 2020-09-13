var Constants = {
    RAMP_TIME: 3000,
    NUMBER_OF_LINES: 2,
    MAX_DELAY_TIME: 3,
    SAMPLE_RATE: 44100,
    MAX_ENVELOPES: 10
}

var DefaultDelayParameters = {
    delayTime: 0.8,
    regen: 0.6
}

class EnvelopeFollowerWorklet extends AudioWorkletProcessor {
    constructor() {
        super();
        this.numberOfEnvelopes = 9;

        this.lastSample = new Array(Constants.MAX_ENVELOPES).fill(0);
        this.lastSign = new Array(Constants.MAX_ENVELOPES).fill(0);
        this.currentLength = 0;
        this.minimumLength = Constants.RAMP_TIME + 1;
    }

    followEnvelopes(sample) {
        var flag = true;

        // For each level but the top one, find whether we're at a local maximum to get the envelope
        for (var i = 0; flag && i < (this.numberOfEnvelopes - 2); i++) {
            var delta = sample - this.lastSample[i];
            var sign = delta == 0 ? this.lastSign[i] : delta / Math.abs(delta);
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
            
            var i = this.numberOfEnvelopes - 2;
            var delta = sample - this.lastSample[i];
            var sign = delta == 0 ? this.lastSign[i] : delta / Math.abs(delta);
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

    process(inputs, outputs, parameters) {
        var input = inputs[0][0];

        for(var i = 0; i < input.length; i++) {
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
