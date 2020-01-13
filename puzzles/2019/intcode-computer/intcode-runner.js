'use strict';

const buildRunUntil = (self, operations) => finalOperationCodes => {
	while(true) {
		buildUpdateCurrentInstruction(self)();
		buildHandleCurrentInstruction(self, operations)();
		if (finalOperationCodes.includes(self.currentOperationCode))
		{
			return;
		}
	}
};

const buildRunUntilNextIs = (self, operations) => finalOperationCodes => {
	while(true) {
		buildUpdateCurrentInstruction(self)();
		buildHandleCurrentInstruction(self, operations)();
		if (finalOperationCodes.includes(self.peakNextInstruction()))
		{
			return;
		}
	}
};

const buildUpdateCurrentInstruction = self => () => {
	buildUpdateCurrentOperation(self)();
	return;
};

const buildUpdateCurrentOperation = self => () => {
	const {
		instructionPtr,
		software,
	} = self;

	let operationCode = software[instructionPtr].slice(-2);
	operationCode = '0'.repeat(2 - operationCode.length) + operationCode;

	self.currentOperationCode = operationCode;
	return;
};

const buildHandleCurrentInstruction = (self, operations) => () => {
	const { currentOperationCode, } = self;
	const handleOperationCode = operations.get(currentOperationCode);

	if (typeof handleOperationCode !== 'function') {
		throw new Error('Unhandled operation code');
	}

	handleOperationCode();
	return;
};

const buildPeakNextInstruction = self => () => {
	const {
		instructionPtr,
		software,
	} = self;

	let operationCode = software[instructionPtr].slice(-2);
	operationCode = '0'.repeat(2 - operationCode.length) + operationCode;
	return operationCode;
};

module.exports = {
	buildRunUntil,
	buildRunUntilNextIs,
	buildPeakNextInstruction,
};