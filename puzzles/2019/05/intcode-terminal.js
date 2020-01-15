'use strict';

const { OPERATIONS, } = require('./operations');

const runDiagnostics = async (
	startState,
	requestTerminalInput,
	handleTerminalOutput
) => {
	await computeFinalState(
		startState,
		requestTerminalInput,
		handleTerminalOutput);
	return undefined;
};

const computeFinalState = async (
	startState,
	requestTerminalInput,
	handleTerminalOutput
)  => {
	const memoryState = JSON.parse(JSON.stringify(startState));

	let instructionPtr = 0;
	while(true) {
		const {
			operation,
			params,
			paramsModes,
		} = deconstructInstruction(memoryState, instructionPtr);

		if (operation.code === OPERATIONS.exit.code)
		{
			break;
		}

		instructionPtr = await handleOperation(
			{
				state: {
					memoryState,
					instructionPtr,
				},
				instruction: {
					operation,
					params,
					paramsModes,
				},
				terminalIO: {
					requestTerminalInput,
					handleTerminalOutput,
				},
			}
		);
	}

	return undefined;
};

const deconstructInstruction = (memoryState, instructionPtr) => {
	const {
		paramsModes,
		operation,
	} = deconstructOperation(memoryState[instructionPtr]);

	const paramSliceStart = instructionPtr + 1;
	const paramSliceEnd = instructionPtr + operation.length;
	const params = memoryState.slice(
		paramSliceStart,
		paramSliceEnd
	);

	return { operation, params, paramsModes, };
};

const deconstructOperation = instruction => {
	const splitInstruction = splitDigits(instruction);

	// Adds leading zeros for operation code
	while(splitInstruction.length < 2) {
		splitInstruction.unshift(0);
	}

	const operationCodeDigits = splitInstruction.slice(-2);
	const operationCode =
		operationCodeDigits[0]*10 +
		operationCodeDigits[1];
	const operation = getOperationByCode(operationCode);

	// Removes operation code from instruction
	splitInstruction.pop();
	splitInstruction.pop();

	// Adds leading zeroes to parameter modes
	while(splitInstruction.length < (operation.length - 1)) {
		splitInstruction.unshift(0);
	}

	const paramsModes = splitInstruction.slice().reverse();

	return { paramsModes, operation, };
};

const getOperationByCode = operationCode => {
	const operationName = Object.keys(OPERATIONS).find(name => {
		return OPERATIONS[name].code === operationCode;
	});
	return OPERATIONS[operationName];
};

const splitDigits = number => {
	const radix = 10;
	return [...number.toString(radix), ].map(x => parseInt(x));
};

const handleOperation = async (
	{
		state: {
			memoryState,
			instructionPtr,
		},
		instruction: {
			operation,
			params,
			paramsModes,
		},
		terminalIO: {
			requestTerminalInput,
			handleTerminalOutput,
		},
	}
) => {
	const operationHandler = operation.handle;

	if (typeof operationHandler !== 'function') {
		throw new Error('Unhandled operation code');
	}

	return await operationHandler(
		{
			state: {
				memoryState,
				instructionPtr,
			},
			instruction: {
				operation,
				params,
				paramsModes,
			},
			terminalIO: {
				requestTerminalInput,
				handleTerminalOutput,
			},
		});
};

module.exports = {
	runDiagnostics,
};