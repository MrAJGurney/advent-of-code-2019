'use strict';

const {
	IntcodeComputer,
} = require('./intcode-computer');

const { OPERATIONS, } = require('./operations');

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

const getMaxThrustSignalWithFeedback = software => {
	const initialSignal = 0;
	const minPhaseSetting = 5;
	const maxPhaseSetting = 9;

	const phaseSettingPermutations =
		getPhaseSettingPermutations(minPhaseSetting, maxPhaseSetting);

	let maxThrustSignal = getThrustSignalWithFeedback(
		software, initialSignal, phaseSettingPermutations[0]
	);

	phaseSettingPermutations.forEach(permutation => {
		const thrustSignal = getThrustSignalWithFeedback(
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
						const permutation = [i0, i1, i2, i3, i4, ];
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
		const amplifier = new IntcodeComputer(software);
		amplifier.addInput(phaseSettings[ampIndex]);
		amplifier.addInput(signal);
		amplifier.runUntilAfter([OPERATIONS.halt.code, ]);
		signal = amplifier.consumeOutput();
	}

	return signal;
};

const getThrustSignalWithFeedback = (
	software,
	initialSignal,
	phaseSettings
) => {
	const amplifiers = [];
	for (let ampIndex = 0; ampIndex < phaseSettings.length; ampIndex++) {
		const amplifier = new IntcodeComputer(software);
		amplifier.addInput(phaseSettings[ampIndex]);
		amplifiers.push(amplifier);
	}

	let signal = initialSignal;
	let ampIndex = 0;
	let finalOperationCode = null;
	while (true) {
		const amplifier = amplifiers[ampIndex];
		amplifier.addInput(signal);
		finalOperationCode = amplifier
			.runUntilAfter([OPERATIONS.halt.code, OPERATIONS.output.code, ]);
		if (finalOperationCode === OPERATIONS.halt.code) {
			break;
		}
		signal = amplifier.consumeOutput();
		ampIndex = (ampIndex + 1) % amplifiers.length;
	}

	return signal;
};

module.exports = {
	getMaxThrustSignal,
	getMaxThrustSignalWithFeedback,
};