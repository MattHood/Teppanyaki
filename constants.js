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
	regen: 0.6,
	pan: 0
};

export const ParameterBounds = {
	DELAY_MIN: 0.01,
	DELAY_MAX: 3,
	REGEN_MIN: 0.1,
	REGEN_MAX: 0.9,
	PAN_LEFT: -1,
	PAN_RIGHT: 1,
	MIX_DRY: 0,
	MIX_WET: 1,
	HIGHPASS: 0,
	LOWPASS: 20000,
	ENVELOPES_MIN: 5,
	ENVELOPES_MAX: 5
}

export {Constants as default};