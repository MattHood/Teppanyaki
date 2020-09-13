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

class DelayWorklet extends AudioWorkletProcessor {
	headIndex = 0;
	constructor() {
		super();
		this.audioMemory = new Array(Constants.MAX_DELAY_TIME * Constants.SAMPLE_RATE).fill(0);
		this.port.onmessage = this.clear.bind(this);
		
	}
	 // TODO: Max/min parameter values
	static get parameterDescriptors() {
        return [{name: "regen", defaultValue: DefaultDelayParameters.regen},
                {name: "delayTime", defaultValue: DefaultDelayParameters.delayTime}];
    }

	clear(message) {
		this.audioMemory.fill(0);
	}

	// TODO: Add filtering
	process(inputs, outputs, parameters) {
		var regen = parameters.regen[0]
        var delayTime = parameters.delayTime[0]

        var input = inputs[0][0];
        var output = outputs[0][0];
        

        if(typeof input == "undefined") {
        	return true;
        }

        var delaySamples = delayTime * Constants.SAMPLE_RATE;
        for(var i = 0; i < input.length; i++) {
            var futureIndex = (this.headIndex + Math.floor(delaySamples)) % (Constants.MAX_DELAY_TIME * Constants.SAMPLE_RATE);
            this.audioMemory[futureIndex] = (this.audioMemory[this.headIndex] + input[i]) * regen;
            output[i] = this.audioMemory[this.headIndex];
            this.headIndex = (this.headIndex + 1) % (Constants.MAX_DELAY_TIME * Constants.SAMPLE_RATE);
        }
        return true;
	}
}

registerProcessor('delay-worklet', DelayWorklet);