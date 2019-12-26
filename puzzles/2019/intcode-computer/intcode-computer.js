
const {
	buildAddToInputQueue,
	buildReadFromOutputHeap,
} = require('./intcode-io-handler');
const { buildOperations, } = require('./intcode-operations');
const {
	buildGetReadValue,
	buildGetWritePosition,
} = require('./intcode-parameter-modes');
const { buildRunUntil, } = require('./intcode-runner');
const { operationCodes, } = require('./operation-codes');
const { parameterModeCodes, } = require('./parameter-mode-codes');

const buildIntcodeComputer = software => {
	const self = {
		software: copySoftware(software),

		instructionPtr: 0,
		relativeBase: 0,

		currentOperationCode: null,

		outputHeap: [],
		inputQueue: [],
	};

	const getReadValue = buildGetReadValue(
		self,
		parameterModeCodes
	);

	const getWritePosition = buildGetWritePosition(
		self,
		parameterModeCodes
	);

	const parameterValueGetters = {
		getReadValue,
		getWritePosition,
	};

	const operations = buildOperations(
		self,
		operationCodes,
		parameterValueGetters
	);

	const runUntil = buildRunUntil(self, operations);

	const addToInputQueue = buildAddToInputQueue(self);

	const readFromOutputHeap = buildReadFromOutputHeap(self);

	return Object.assign(
		self,
		{ operations, },
		{ runUntil, },
		{ addToInputQueue, },
		{ readFromOutputHeap, }
	);
};

const copySoftware = software => {
	return JSON.parse(JSON.stringify(software));
};

module.exports = {
	buildIntcodeComputer,
};