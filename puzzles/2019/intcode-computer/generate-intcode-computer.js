'use strict';

const { buildIntcodeComputer, } = require('./intcode-computer');
const { operationCodes, } = require('./operation-codes');

function* generateIntcodeComputer(software) {
	const intcodeComputer = buildIntcodeComputer(software);
	let outputSinceInput = [];

	while(true) {
		const input = yield {
			outputSinceInput: outputSinceInput,
			// _debug is used to expose intcode computer internals for
			// integration tests, and should not be used elsewhere.
			_debug: {
				software: intcodeComputer.software,
			},
		};

		intcodeComputer.addToInputQueue(input);

		outputSinceInput = [];

		while (true) {
			intcodeComputer.runUntil([
				operationCodes.input,
				operationCodes.output,
				operationCodes.halt,
			]);

			const { currentOperationCode, } = intcodeComputer;
			if (currentOperationCode === operationCodes.halt) {
				return {
					outputSinceInput: outputSinceInput,
					// _debug is used to expose intcode computer internals for
					// integration tests, and should not be used elsewhere.
					_debug: {
						software: intcodeComputer.software,
					},
				};
			} else if (currentOperationCode === operationCodes.output) {
				outputSinceInput.push(intcodeComputer.readFromOutputHeap());
			} else if (currentOperationCode === operationCodes.input) {
				break;
			} else {
				throw new Error(
					'intcode computer exited with unexpected code: ' +
					currentOperationCode.toString()
				);
			}
		}
	};
};

module.exports = {
	generateIntcodeComputer,
};