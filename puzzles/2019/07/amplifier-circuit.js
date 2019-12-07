const {
	buildInputProvider,
	buildOutputHandler,
} = require('./intcode-computer-interactions');

const {
	runSoftware,
} = require('./intcode-computer');

const getMaxThrustSignal = software => {
	const initialSignal = 0;

	const phaseSettingPermutations = getPhaseSettingPermutations();

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

const getPhaseSettingPermutations = () => {
	const permutations = [];

	for (let i0 = 0; i0 < 5; i0++ ) {
		for (let i1 = 0; i1 < 5; i1++ ) {
			for (let i2 = 0; i2 < 5; i2++ ) {
				for (let i3 = 0; i3 < 5; i3++ ) {
					for (let i4 = 0; i4 < 5; i4++ ) {
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