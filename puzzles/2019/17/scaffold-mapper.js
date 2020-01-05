const {
	operationCodes,
} = require('../intcode-computer/operation-codes');

const buildScaffoldMapper = intcodeComputer => {
	const self = {
		intcodeComputer,
		scaffolds: [],
	};

	const getAlignmentParameters = buildGetAlignmentParameters();

	const mapScaffolds = buildMapScaffolds(self);

	return Object.assign(
		self,
		{ getAlignmentParameters, },
		{ mapScaffolds, }
	);
};

const buildGetAlignmentParameters = () => () => {};

const buildMapScaffolds = self => () => {
	self.intcodeComputer.runUntil([
		operationCodes.halt,
	]);

	const output = self.intcodeComputer.outputHeap.slice();

	self.scaffolds = output
		.map(code => String.fromCharCode(parseInt(code)))
		.join('')
		.trim()
		.split('\n')
		.map(line => line.split(''));
};

module.exports = {
	buildScaffoldMapper,
};