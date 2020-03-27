'use strict';

const {
	generateIntcodeComputer,
} = require('../intcode-computer/generate-intcode-computer');
const {
	readIntcodeSoftwareFromFile,
} = require('../intcode-computer/read-intcode-software-from-file');

const solveFirstChallenge = async () => {
	const intcodeSoftware = readIntcodeSoftwareFromFile(__dirname, 'input.txt');
	const intcodeComputer = generateIntcodeComputer(intcodeSoftware);
	intcodeComputer.next();

	const id = 2;

	let intcodeComputerResult = intcodeComputer.next(id);
	let output = intcodeComputerResult.value.outputSinceInput;
	while (!intcodeComputerResult.done) {
		intcodeComputerResult = intcodeComputer.next();
		output = output.concat(intcodeComputerResult.value.outputSinceInput);
		if (intcodeComputerResult.done) {
			break;
		};
	};

	return intcodeComputerResult.value.outputSinceInput.slice(-1)[0];
};

const solveSecondChallenge = async () => {
	const intcodeSoftware = readIntcodeSoftwareFromFile(__dirname, 'input.txt');
	const intcodeComputer = generateIntcodeComputer(intcodeSoftware);
	intcodeComputer.next();

	const id = 5;

	let intcodeComputerResult = intcodeComputer.next(id);
	let output = intcodeComputerResult.value.outputSinceInput;
	while (!intcodeComputerResult.done) {
		intcodeComputerResult = intcodeComputer.next();
		output = output.concat(intcodeComputerResult.value.outputSinceInput);
		if (intcodeComputerResult.done) {
			break;
		};
	};

	return intcodeComputerResult.value.outputSinceInput.slice(-1)[0];
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};