const { operationCodes, } = require('./operation-codes');
const { parameterModeCodes, } = require('./parameter-mode-codes');
const { buildOperations, } = require('./intcode-operations');
const { buildRunUntil, } = require('./intcode-runner');
const { buildAddToInputQueue, } = require('./intcode-io-handler');

const buildIntcodeComputer = software => {
	const self = {
		software: copySoftware(software),
		instructionPtr: 0,
		currentOperationCode: null,
		outputHeap: [],
		inputQueue: [],
	};
	const operations = buildOperations(
		self,
		operationCodes,
		parameterModeCodes
	);
	const runUntil = buildRunUntil(self, operations);
	const addToInputQueue = buildAddToInputQueue(self);

	return Object.assign(
		self,
		{ operations, },
		{ runUntil, },
		{ addToInputQueue, }
	);
};

const copySoftware = software => {
	return JSON.parse(JSON.stringify(software));
};

module.exports = {
	buildIntcodeComputer,
};