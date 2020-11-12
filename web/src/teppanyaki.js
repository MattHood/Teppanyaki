import Constants from './constants.js';
import DelayLine from './delay_line.js';
import TeppanyakiParameters from './parameters.js';
import {AudioWorkletNode} from 'standardized-audio-context';

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

		this.parameterState = new TeppanyakiParameters(this);

	}

	getParameterStore() {
		return this.parameterState;
	}

	


	// eslint-disable-next-line no-unused-vars
	envelope(evt) {
		let prev = this.activeLine;
		let next = (this.activeLine + 1) % Constants.NUMBER_OF_LINES;
		let after = (next + 1) % Constants.NUMBER_OF_LINES;
		let future = (after + 1) % Constants.NUMBER_OF_LINES;

		let newParams = this.parameterState.realiseParametersAsLineSettings(this.parameterState);

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

