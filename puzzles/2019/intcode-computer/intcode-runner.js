const buildRunUntil = (self, operations) => finalOperationCodes => {
	while(true) {
		updateCurrentInstruction(self)();
		handleCurrentInstruction(self, operations)();
		if (finalOperationCodes.includes(self.currentOperationCode))
		{
			return operations.code;
		}
	}
};

const updateCurrentInstruction = self => () => {
	updateCurrentOperation(self)();
	return;
};

const updateCurrentOperation = self => () => {
	const {
		instructionPtr,
		software,
	} = self;

	let operationCode = software[instructionPtr].slice(-2);
	operationCode = '0'.repeat(2 - operationCode.length) + operationCode;

	self.currentOperationCode = operationCode;
	return;
};

const handleCurrentInstruction = (self, operations) => () => {
	const { currentOperationCode, } = self;
	const handleOperationCode = operations.get(currentOperationCode);

	if (typeof handleOperationCode !== 'function') {
		throw new Error('Unhandled operation code');
	}

	handleOperationCode();
	return;
};

module.exports = { buildRunUntil, };