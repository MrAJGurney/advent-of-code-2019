const buildOperations = (self, opcodes) => new Map([
	[opcodes.add, () => handleAdd(self)(),],
	[opcodes.multiply, () => handleMultiply(self)(),],
	[opcodes.halt, () => handleHalt(self)(),],
]);

const handleAdd = self => () => {
	const {
		instructionPtr,
		software,
	} = self;

	const [_, verb, noun, write,] = software.slice(instructionPtr);
	const valueToWrite = parseInt(software[verb]) + parseInt( software[noun]);

	self.software[write] = valueToWrite.toString();
	self.instructionPtr += 4;
	return;
};

const handleMultiply = self => () => {
	const {
		instructionPtr,
		software,
	} = self;

	const [_, verb, noun, write,] = software.slice(instructionPtr);
	const valueToWrite = parseInt(software[verb]) * parseInt( software[noun]);

	self.software[write] = valueToWrite.toString();
	self.instructionPtr += 4;
	return;
};

const handleHalt = self => () => {
	self.instructionPtr += 1;
	return;
};

module.exports = {
	buildOperations,
};