namespace Teppanyaki {

	using Sample = float;
	using Control = float;
	const int BlockSize = 64;
	using AudioSignal = std::array<Sample, BlockSize>;
	using ControlSignal = std::array<Control, BlockSize>;

	struct ControlParams {
		Control delayMin;
		Control delayMax;
		Control regenMin;
		Control regenMax;
		Control panMin;
		Control panMax;

		Control envelopeDensity;
		Control lowpass;
		Control highpass;
		bool quantize;
	};
}