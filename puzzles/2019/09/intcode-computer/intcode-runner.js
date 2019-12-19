const buildRunUntil = (self, operations) =>   finalOpcode => {
	while(true) {
		updateCurrentInstruction(self)();
		handleCurrentInstruction(self, operations)();
		if (self.currentOpcode === finalOpcode)
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

	const opcode = software[instructionPtr];

	self.currentOpcode = opcode;
	return;
};

const handleCurrentInstruction = (self, operations) => () => {
	const { currentOpcode, } = self;
	const handleOpcode = operations.get(currentOpcode);

	if (typeof handleOpcode !== 'function') {
		throw new Error('Unhandled operation code');
	}

	handleOpcode();
	return;
};

module.exports = { buildRunUntil, };