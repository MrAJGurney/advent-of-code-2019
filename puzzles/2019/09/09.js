const {
	readIntcodeSoftware,
} = require('./file-interactions');
const {
	operationCodes,
} = require('../intcode-computer/operation-codes');
const {
	buildIntcodeComputer,
} = require('../intcode-computer/intcode-computer');

const solveFirstChallenge = () => {
	const softwareFile = './input.txt';
	const software = readIntcodeSoftware(softwareFile);
	const input = 1;

	const intcodeComputer = buildIntcodeComputer(software);
	intcodeComputer.addToInputQueue(input);
	intcodeComputer.runUntil([operationCodes.halt,]);

	return intcodeComputer.outputHeap[0];
};

const solveSecondChallenge = () => {
	const softwareFile = './input.txt';
	const software = readIntcodeSoftware(softwareFile);
	const input = 2;

	const intcodeComputer = buildIntcodeComputer(software);
	intcodeComputer.addToInputQueue(input);
	intcodeComputer.runUntil([operationCodes.halt,]);

	return intcodeComputer.outputHeap[0];
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};