export const Constants = {
	RAMP_SAMPLES: 3000,
	NUMBER_OF_LINES: 32,
	MAX_DELAY_TIME: 3,
	SAMPLE_RATE: 44100,
	MAX_ENVELOPES: 10,
	RAMP_TIME: 3000 / 44100 // FIXME
};

export const DefaultDelayParameters = {
	delayTime: 0.8,
	regen: 0.6
};

export {Constants as default};