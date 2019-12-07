const {
	buildInputProvider,
	buildOutputHandler,
} = require('./intcode-computer-interactions');

const {
	runSoftware,
} = require('./intcode-computer');

const getMaxThrustSignal = software => {
	const initialSignal = 0;
	const minPhaseSetting = 0;
	const maxPhaseSetting = 4;

	const phaseSettingPermutations =
		getPhaseSettingPermutations(minPhaseSetting, maxPhaseSetting);

	let maxThrustSignal = getThrustSignal(
		software, initialSignal, phaseSettingPermutations[0]
	);

	phaseSettingPermutations.forEach(permutation => {
		const thrustSignal = getThrustSignal(
			software, initialSignal, permutation
		);
		maxThrustSignal = Math.max(maxThrustSignal, thrustSignal);
	});

	return maxThrustSignal;
};

const getPhaseSettingPermutations = (min, max) => {
	const permutations = [];

	for (let i0 = min; i0 <= max; i0++ ) {
		for (let i1 = min; i1 <= max; i1++ ) {
			for (let i2 = min; i2 <= max; i2++ ) {
				for (let i3 = min; i3 <= max; i3++ ) {
					for (let i4 = min; i4 <= max; i4++ ) {
						const permutation = [i0, i1, i2, i3, i4,];
						const permutationHasDuplicates =
                            new Set(permutation).size !== permutation.length;
						if (!permutationHasDuplicates) {
							permutations.push(permutation);
						}
					}
				}
			}
		}
	}

	return permutations;
};

const getThrustSignal = (software, initialSignal, phaseSettings) => {
	let signal = initialSignal;

	for (let ampIndex = 0; ampIndex < phaseSettings.length; ampIndex++) {
		const softwareCopy = JSON.parse(JSON.stringify(software));

		const inputProvider = buildInputProvider([
			phaseSettings[ampIndex],
			signal,
		]);

		const {
			handleOutput,
			getOutput,
		} = buildOutputHandler();

		runSoftware(
			softwareCopy,
			inputProvider,
			handleOutput
		);

		const outputs = getOutput();
		signal = outputs[outputs.length - 1];
	}

	return signal;
};

module.exports = {
	getMaxThrustSignal,
};