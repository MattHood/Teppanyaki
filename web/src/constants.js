export const Constants = {
	RAMP_SAMPLES: 4000,
	NUMBER_OF_LINES: 32,
	MAX_DELAY_TIME: 3,
	SAMPLE_RATE: 44100,
	MAX_ENVELOPES: 10,
	RAMP_TIME: 4000 / 44100, // FIXME
	SLIDER_STEPS: 127
};

export const InitialDelayParameters = {
	delayTime: 0.8,
	regen: 0.6,
	pan: 0
};

export const DefaultParameters = {
	delayMin: 0.3,
	delayMax: 1.6,
	regenMin: 0.3,
	regenMax: 0.8,
	panMin: -1,
	panMax: 1,
	cutoffHP: 400,
	cutoffLP: 4000,
	resonanceHP: 0.3,
	resonanceLP: 0.3,
	mix: 1,
	envelopeLevel: 8
};

export const ParameterMinimums = {
	delayMin: 0.01,
	delayMax: 0.01,
	regenMin: 0.1,
	regenMax: 0.1,
	panMin: -1,
	panMax: -1,
	cutoffHP: 0,
	cutoffLP: 0,
	resonanceHP: 0,
	resonanceLP: 0,
	mix: 0,
	envelopeLevel: 5
};

export const ParameterMaximums = {
	delayMin: 3,
	delayMax: 3,
	regenMin: 0.9,
	regenMax: 0.9,
	panMin: 1,
	panMax: 1,
	cutoffHP: 20000,
	cutoffLP: 20000,
	resonanceHP: 0.5,
	resonanceLP: 0.5,
	mix: 1,
	envelopeLevel: 10
};

export {Constants as default};