import Constants from './constants.js';

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

		this.audioContext.audioWorklet
			.addModule('delay_worklet.js')
			.then(() => {
				this.initDelayLines();
			});

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

		// TODO Create from a const
		this.parameterState = {
			delayMin: 0.3,
			delayMax: 1.6,
			regenMin: 0.3,
			regenMax: 0.8,
			mix: 0.5
		};

		this.setMix(this.parameterState.mix);

	}

	initDelayLines() {

		// For each delay line, create the graph
		// GainNode -> DelayLine -> GainNode,
		// with input and output muted.
		for(var i = 0; i < Constants.NUMBER_OF_LINES; i++) {
			this.lines[i] = {
				inputGain: this.audioContext.createGain(),
				delayLine: new AudioWorkletNode(this.audioContext, 'delay-worklet'),
				outputGain: this.audioContext.createGain()
			};

			this.lines[i].inputGain.gain.value = 0;
			this.lines[i].outputGain.gain.value = 0;
			
			this.wetInput.connect(this.lines[i].inputGain)
				.connect(this.lines[i].delayLine)
				.connect(this.lines[i].outputGain)
				.connect(this.wetOutput);
		}

		// Unmute the first line
		this.lines[this.activeLine].inputGain.gain.value = 1;
		this.lines[this.activeLine].outputGain.gain.value = 1;
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

	// eslint-disable-next-line no-unused-vars
	envelope(evt) {
		let currentTime = this.audioContext.currentTime;
		let prev = this.activeLine;
		let next = (this.activeLine + 1) % Constants.NUMBER_OF_LINES;
		let future = (next + 1) % Constants.NUMBER_OF_LINES;

		let nextDelayTimeParam = this.lines[next].delayLine.parameters.get('delayTime');
		let nextRegenParam = this.lines[next].delayLine.parameters.get('regen');

		this.lines[prev].inputGain.gain.linearRampToValueAtTime(0, currentTime + Constants.RAMP_TIME);

		this.lines[next].delayLine.port.postMessage({message: 'clear'});
		let newDelayTime = this.randomInRange(this.parameterState.delayMin, this.parameterState.delayMax);
		nextDelayTimeParam.value = newDelayTime;
		let newRegen = this.randomInRange(this.parameterState.regenMin, this.parameterState.regenMax);
		nextRegenParam.value = newRegen;   
		this.lines[next].outputGain.gain.linearRampToValueAtTime(1, currentTime + Constants.RAMP_TIME);
		this.lines[next].inputGain.gain.linearRampToValueAtTime(1, currentTime + Constants.RAMP_TIME);

		this.lines[future].outputGain.gain.linearRampToValueAtTime(0, currentTime + Constants.RAMP_TIME);

		this.activeLine = next;

	}

}

