const buildOperations = (self, opcodes) => new Map([
	[opcodes.add, () => handleAdd(self)(),],
	[opcodes.multiply, () => handleMultiply(self)(),],
	[opcodes.input, () => handleInput(self)(),],
	[opcodes.output, () => handleOutput(self)(),],
	[opcodes.halt, () => handleHalt(self)(),],
]);

const handleAdd = self => () => {
	const {
		software,
		instructionPtr,
	} = self;

	const [_, verb, noun, write,] = software.slice(instructionPtr);
	const valueToWrite = parseInt(software[verb]) + parseInt( software[noun]);

	self.software[write] = valueToWrite.toString();
	self.instructionPtr += 4;
	return;
};

const handleMultiply = self => () => {
	const {
		software,
		instructionPtr,
	} = self;

	const [_, verb, noun, write,] = software.slice(instructionPtr);
	const valueToWrite = parseInt(software[verb]) * parseInt( software[noun]);

	self.software[write] = valueToWrite.toString();
	self.instructionPtr += 4;
	return;
};

const handleInput = self => () => {
	const {
		software,
		instructionPtr,
		inputQueue,
	} = self;

	const [_, write,] = software.slice(instructionPtr);
	const valueToWrite = inputQueue[0];

	self.software[write] = valueToWrite.toString();
	self.instructionPtr += 2;
	self.inputQueue.shift();
	return;
};

const handleOutput = self => () => {
	const {
		software,
		instructionPtr,
	} = self;

	const [_, verb,] = software.slice(instructionPtr);
	const valueToOutput = software[verb];

	self.instructionPtr += 2;
	self.outputHeap.push(valueToOutput);
	return;
};

const handleHalt = self => () => {
	self.instructionPtr += 1;
	return;
};

module.exports = {
	buildOperations,
};