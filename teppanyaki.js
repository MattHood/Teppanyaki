var Constants = {
    RAMP_TIME: 3000,
    NUMBER_OF_LINES: 8,
    MAX_DELAY_TIME: 3,
    SAMPLE_RATE: 44100,
    MAX_ENVELOPES: 10
}

var DefaultDelayParameters = {
    delayTime: 0.8,
    regen: 0.6
}

class Teppanyaki {
    rangeParams = {
        delayMin: 0.3,
        delayMax: 1.6,
        regenMin: 0.3,
        regenMax: 0.8
    }

    init_delay_lines() {
        for(var i = 0; i < Constants.NUMBER_OF_LINES; i++) {
            this.lines[i] = {
                inputGain: this.audioContext.createGain(),
                delayLine: new AudioWorkletNode(this.audioContext, 'delay-worklet'),
                outputGain: this.audioContext.createGain()
            };
            
            this.globalInput.connect(this.lines[i].inputGain)
                       .connect(this.lines[i].delayLine)
                       .connect(this.lines[i].outputGain)
                       .connect(this.globalOutput);
        }
        this.lines[0].inputGain.gain.value = 1;
        this.lines[0].outputGain.gain.value = 1;
    }
    constructor(context, inputNode) {
        this.audioContext = context;
        this.lines = new Array(Constants.NUMBER_OF_LINES);
        this.globalInput = this.audioContext.createGain();
        this.globalInput.gain.value = 0.8;
        this.globalOutput = this.audioContext.createGain();
        
        inputNode.connect(this.globalInput);
        

        this.audioContext.audioWorklet
                    .addModule('delay_worklet.js')
                    .then(() => {
                        this.init_delay_lines();

                    });

        this.globalOutput.connect(this.audioContext.destination);

        this.audioContext.audioWorklet
                    .addModule('envelope_follower_worklet.js')

                    .then(() => {
                        this.env = new AudioWorkletNode(this.audioContext, 'envelope-follower');
                        inputNode.connect(this.env);
                        this.env.port.onmessage = this.envelope.bind(this);
                    });

        this.activeLine = 0;

    }

    randomInRange(min, max) {
        return Math.random()*(max - min) + min;
    }

    envelope(evt) {
        let currentTime = this.audioContext.currentTime;
        let prev = this.activeLine;
        let next = (this.activeLine + 1) % Constants.NUMBER_OF_LINES;
        let future = (next + 1) % Constants.NUMBER_OF_LINES;

        let nextDelayTimeParam = this.lines[next].delayLine.parameters.get("delayTime");
        let nextRegenParam = this.lines[next].delayLine.parameters.get("regen");

        this.lines[prev].inputGain.gain.linearRampToValueAtTime(0, currentTime + Constants.RAMP_TIME);

        this.lines[next].delayLine.port.postMessage({message: "clear"});
        nextDelayTimeParam.setValueAtTime(this.randomInRange(this.rangeParams.delayMin, this.rangeParams.delayMax), currentTime);
        nextRegenParam.setValueAtTime(this.randomInRange(this.rangeParams.regenMin, this.rangeParams.regenMax), currentTime);
        this.lines[next].outputGain.gain.linearRampToValueAtTime(1, currentTime + Constants.RAMP_TIME);
        this.lines[next].inputGain.gain.linearRampToValueAtTime(1, currentTime + Constants.RAMP_TIME);

        this.lines[future].outputGain.gain.linearRampToValueAtTime(0, currentTime + Constants.RAMP_TIME);

        this.activeLine = next;

    }

}
