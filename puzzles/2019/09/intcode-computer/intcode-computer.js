const { opcodes, } = require('./opcodes');
const { buildOperations, } = require('./intcode-operations');
const { buildRunUntil, } = require('./intcode-runner');

const buildIntcodeComputer = software => {
	const self = {
		software: copySoftware(software),
		instructionPtr: 0,
		currentOpcode: null,
	};

	const operations = buildOperations(self, opcodes);

	const runUntil = buildRunUntil(self, operations);

	return Object.assign(
		self,
		{ operations, },
		{ runUntil, }
	);
};

const copySoftware = software => {
	return JSON.parse(JSON.stringify(software));
};

module.exports = {
	buildIntcodeComputer,
};