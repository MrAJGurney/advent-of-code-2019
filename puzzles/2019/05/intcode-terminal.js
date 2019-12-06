const OPERATIONS = {
	add: {
		code: 1,
		length: 4,
	},
	multiply: {
		code: 2,
		length: 4,
	},
	input: {
		code: 3,
		length: 2,
	},
	output:  {
		code: 4,
		length: 2,
	},
	jumpIfTrue:  {
		code: 5,
		length: 3,
	},
	jumpIfFalse:  {
		code: 6,
		length: 3,
	},
	lessThan:  {
		code: 7,
		length: 4,
	},
	equals:  {
		code: 8,
		length: 4,
	},
	exit:  {
		code: 99,
		length: 1,
	 },
};

const PARAMETER_MODES = {
	position: 0,
	immediate: 1,
};

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
	return [...number.toString(radix),].map(x => parseInt(x));
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
	if (operation.code === OPERATIONS.add.code) {
		const [verb, noun, write,] = params;
		const [verbMode, nounMode, writeMode,] = paramsModes;
		throwIfParamIsInImmediateMode(writeMode, 'write');
		memoryState[write] =
			getParamValue(verb, verbMode, memoryState) +
			getParamValue(noun, nounMode, memoryState);
		return instructionPtr + operation.length;
	}

	if (operation.code === OPERATIONS.multiply.code) {
		const [verb, noun, write,] = params;
		const [verbMode, nounMode, writeMode,] = paramsModes;
		throwIfParamIsInImmediateMode(writeMode, 'write');
		memoryState[write] =
			getParamValue(verb, verbMode, memoryState) *
			getParamValue(noun, nounMode, memoryState);
		return instructionPtr + operation.length;
	}

	if (operation.code === OPERATIONS.input.code) {
		const [write,] = params;
		const [writeMode,] = paramsModes;
		throwIfParamIsInImmediateMode(writeMode, 'write');
		const id = await requestTerminalInput('ID');
		memoryState[write] = id;
		return instructionPtr + operation.length;
	}

	if (operation.code === OPERATIONS.output.code) {
		const [out,] = params;
		const [outMode,] = paramsModes;
		const output =
			getParamValue(out, outMode, memoryState);
		handleTerminalOutput(output);
		return instructionPtr + operation.length;
	}

	if (operation.code === OPERATIONS.jumpIfTrue.code) {
		const [verb, jumpTo,] = params;
		const [verbMode, jumpToMode,] = paramsModes;
		if (getParamValue(verb, verbMode, memoryState) !== 0) {
			return getParamValue(jumpTo, jumpToMode, memoryState);
		}
		return instructionPtr + operation.length;
	}

	if (operation.code === OPERATIONS.jumpIfFalse.code) {
		const [verb, jumpTo,] = params;
		const [verbMode, jumpToMode,] = paramsModes;
		if (getParamValue(verb, verbMode, memoryState) === 0) {
			return getParamValue(jumpTo, jumpToMode, memoryState);
		}
		return instructionPtr + operation.length;
	};

	if (operation.code === OPERATIONS.lessThan.code) {
		const [verb, noun, write,] = params;
		const [verbMode, nounMode, writeMode,] = paramsModes;
		throwIfParamIsInImmediateMode(writeMode, 'write');
		const isLessThan =
			getParamValue(verb, verbMode, memoryState) <
			getParamValue(noun, nounMode, memoryState);
		memoryState[write] = isLessThan ? 1 : 0;
		return instructionPtr + operation.length;
	}

	if (operation.code === OPERATIONS.equals.code) {
		const [verb, noun, write,] = params;
		const [verbMode, nounMode, writeMode,] = paramsModes;
		throwIfParamIsInImmediateMode(writeMode, 'write');
		const equals =
			getParamValue(verb, verbMode, memoryState) ===
			getParamValue(noun, nounMode, memoryState);

		memoryState[write] = equals ? 1 : 0;
		return instructionPtr + operation.length;
	}

	if (operation.code === OPERATIONS.exit.code) {
		return instructionPtr + operation.length;
	}

	throw new Error('Unhandled operation code');
};

const getParamValue = (param, paramMode, memoryState) => {
	return paramMode === PARAMETER_MODES.immediate ?
		param :
		memoryState[param];
};

const throwIfParamIsInImmediateMode = (paramMode, paramName) => {
	if (paramMode === PARAMETER_MODES.immediate) {
		throw new Error(
			`Param can not be in immediate mode: ${paramName}`
		);
	}
};

module.exports = {
	runDiagnostics,
};