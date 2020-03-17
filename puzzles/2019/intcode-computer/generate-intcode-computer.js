'use strict';

const { buildIntcodeComputer, } = require('./intcode-computer');
const { operationCodes, } = require('./operation-codes');

function* generateIntcodeComputer(software) {
	const intcodeComputer = buildIntcodeComputer(software);

	while(true) {
		const input = yield {
			outputHeap: intcodeComputer.outputHeap,
			software: intcodeComputer.software,
		};

		intcodeComputer.addToInputQueue(input);

		intcodeComputer.runUntil([
			operationCodes.output,
			operationCodes.halt,
		]);

		if(intcodeComputer.halted) {
			return {
				outputHeap: intcodeComputer.outputHeap,
				software: intcodeComputer.software,
			};
		};
	};
};

module.exports = {
	generateIntcodeComputer,
};