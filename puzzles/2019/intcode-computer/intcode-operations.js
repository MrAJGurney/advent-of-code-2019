const defaultParameterMode = '0';

const buildOperations = (
	self,
	operationCodes,
	parameterValueGetters
) => {
	return new Map([
		[operationCodes.add,
			handleAdd(self, parameterValueGetters),],
		[operationCodes.multiply,
			handleMultiply(self, parameterValueGetters),],
		[operationCodes.input,
			handleInput(self, parameterValueGetters),],
		[operationCodes.output,
			handleOutput(self, parameterValueGetters),],
		[operationCodes.jumpIfTrue,
			handleJumpIfTrue(self, parameterValueGetters),],
		[operationCodes.jumpIfFalse,
			handleJumpIfFalse(self, parameterValueGetters),],
		[operationCodes.lessThan,
			handleLessThan(self, parameterValueGetters),],
		[operationCodes.equals,
			handleEquals(self, parameterValueGetters),],
		[operationCodes.adjustRelativeBase,
			handleAdjustRelativeBase(self, parameterValueGetters),],
		[operationCodes.halt,
			handleHalt(self),],
	]);
};

const handleAdd = (self, parameterValueGetters) => () => {
	const {
		getReadValue,
		getWritePosition,
	} = parameterValueGetters;
	const {
		software,
		instructionPtr,
	} = self;

	const operationLength = 4;

	const [
		verb,
		noun,
		write,
	] = software.slice(instructionPtr + 1, instructionPtr + operationLength);

	const [
		verbMode=defaultParameterMode,
		nounMode=defaultParameterMode,
		writeMode=defaultParameterMode,
	] = software[instructionPtr].slice(0, -2).split('').reverse().join('');

	const verbValue = getReadValue(verb, verbMode);
	const nounValue = getReadValue(noun, nounMode);
	const writePosition = getWritePosition(write, writeMode);

	const sum = BigInt(verbValue) + BigInt(nounValue);

	self.software[writePosition] = sum.toString();
	self.instructionPtr += operationLength;
	return;
};

const handleMultiply = (self, parameterValueGetters) => () => {
	const {
		getReadValue,
		getWritePosition,
	} = parameterValueGetters;
	const {
		software,
		instructionPtr,
	} = self;

	const operationLength = 4;

	const [
		verb,
		noun,
		write,
	] = software.slice(instructionPtr + 1, instructionPtr + operationLength);

	const [
		verbMode=defaultParameterMode,
		nounMode=defaultParameterMode,
		writeMode=defaultParameterMode,
	] = software[instructionPtr].slice(0, -2).split('').reverse().join('');

	const verbValue = getReadValue(verb, verbMode);
	const nounValue = getReadValue(noun, nounMode);
	const writePosition = getWritePosition(write, writeMode);

	const product = BigInt(verbValue) * BigInt(nounValue);

	self.software[writePosition] = product.toString();
	self.instructionPtr += operationLength;
	return;
};

const handleInput = (self, parameterValueGetters) => () => {
	const {
		getWritePosition,
	} = parameterValueGetters;
	const {
		software,
		instructionPtr,
		inputQueue,
	} = self;

	const operationLength = 2;

	const [
		write,
	] = software.slice(instructionPtr + 1, instructionPtr + operationLength);

	const [
		writeMode=defaultParameterMode,
	] = software[instructionPtr].slice(0, -2).split('').reverse().join('');

	const writePosition = getWritePosition(write, writeMode);
	const input = inputQueue[0];

	self.software[writePosition] = input.toString();
	self.instructionPtr += operationLength;
	self.inputQueue.shift();
	return;
};

const handleOutput = (self, parameterValueGetters) => () => {
	const {
		getReadValue,
	} = parameterValueGetters;
	const {
		software,
		instructionPtr,
	} = self;

	const operationLength = 2;

	const [
		verb,
	] = software.slice(instructionPtr + 1, instructionPtr + operationLength);

	const [
		verbMode=defaultParameterMode,
	] = software[instructionPtr].slice(0, -2).split('').reverse().join('');

	const verbValue = getReadValue(verb, verbMode);

	self.instructionPtr += operationLength;
	self.outputHeap.push(verbValue);
	return;
};

const handleJumpIfTrue = (self, parameterValueGetters) => () => {
	const {
		getReadValue,
	} = parameterValueGetters;
	const {
		software,
		instructionPtr,
	} = self;

	const operationLength = 3;

	const [
		verb,
		noun,
	] = software.slice(instructionPtr + 1, instructionPtr + operationLength);

	const [
		verbMode=defaultParameterMode,
		nounMode=defaultParameterMode,
	] = software[instructionPtr].slice(0, -2).split('').reverse().join('');

	const verbValue = getReadValue(verb, verbMode);
	const nounValue = getReadValue(noun, nounMode);

	const shouldJump = BigInt(verbValue) !== BigInt(0);

	if (shouldJump) {
		self.instructionPtr = parseInt(nounValue);
		return;
	}

	self.instructionPtr += operationLength;
	return;
};

const handleJumpIfFalse = (self, parameterValueGetters) => () => {
	const {
		getReadValue,
	} = parameterValueGetters;
	const {
		software,
		instructionPtr,
	} = self;

	const operationLength = 3;

	const [
		verb,
		noun,
	] = software.slice(instructionPtr + 1, instructionPtr + operationLength);

	const [
		verbMode=defaultParameterMode,
		nounMode=defaultParameterMode,
	] = software[instructionPtr].slice(0, -2).split('').reverse().join('');

	const verbValue = getReadValue(verb, verbMode);
	const nounValue = getReadValue(noun, nounMode);

	const shouldJump = BigInt(verbValue) === BigInt(0);

	if (shouldJump) {
		self.instructionPtr = parseInt(nounValue);
		return;
	}

	self.instructionPtr += operationLength;
	return;
};

const handleLessThan = (self, parameterValueGetters) => () => {
	const {
		getReadValue,
		getWritePosition,
	} = parameterValueGetters;
	const {
		software,
		instructionPtr,
	} = self;

	const operationLength = 4;

	const [
		verb,
		noun,
		write,
	] = software.slice(instructionPtr + 1, instructionPtr + operationLength);

	const [
		verbMode=defaultParameterMode,
		nounMode=defaultParameterMode,
		writeMode=defaultParameterMode,
	] = software[instructionPtr].slice(0, -2).split('').reverse().join('');

	const verbValue = getReadValue(verb, verbMode);
	const nounValue = getReadValue(noun, nounMode);
	const writePosition = getWritePosition(write, writeMode);

	const isLessThan = BigInt(verbValue) < BigInt(nounValue);

	self.software[writePosition] = isLessThan ? '1' : '0';
	self.instructionPtr += operationLength;
	return;
};

const handleEquals = (self, parameterValueGetters) => () => {
	const {
		getReadValue,
		getWritePosition,
	} = parameterValueGetters;
	const {
		software,
		instructionPtr,
	} = self;

	const operationLength = 4;

	const [
		verb,
		noun,
		write,
	] = software.slice(instructionPtr + 1, instructionPtr + operationLength);

	const [
		verbMode=defaultParameterMode,
		nounMode=defaultParameterMode,
		writeMode=defaultParameterMode,
	] = software[instructionPtr].slice(0, -2).split('').reverse().join('');

	const verbValue = getReadValue(verb, verbMode);
	const nounValue = getReadValue(noun, nounMode);
	const writePosition = getWritePosition(write, writeMode);

	const isEqual = BigInt(verbValue) === BigInt(nounValue);

	self.software[writePosition] = isEqual ? '1' : '0';
	self.instructionPtr += operationLength;
	return;
};

const handleAdjustRelativeBase = (self, parameterValueGetters) => () => {
	const {
		getReadValue,
	} = parameterValueGetters;
	const {
		software,
		instructionPtr,
	} = self;

	const operationLength = 2;

	const [
		verb,
	] = software.slice(instructionPtr + 1, instructionPtr + operationLength);

	const [
		verbMode=defaultParameterMode,
	] = software[instructionPtr].slice(0, -2).split('').reverse().join('');

	const verbValue = getReadValue(verb, verbMode);

	const relativeBaseOffset = parseInt(verbValue);

	self.relativeBase += relativeBaseOffset;
	self.instructionPtr += operationLength;
	return;
};

const handleHalt = self => () => {
	const operationLength = 1;
	self.instructionPtr += operationLength;
	return;
};

module.exports = {
	buildOperations,
};