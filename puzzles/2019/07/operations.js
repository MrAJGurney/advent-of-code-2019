const OPERATIONS = {
	add: {
		code: 1,
		length: 4,
		handle: args => handleAdd(args),
	},
	multiply: {
		code: 2,
		length: 4,
		handle: args => handleMultiply(args),
	},
	input: {
		code: 3,
		length: 2,
		handle: args => handleInput(args),
	},
	output:  {
		code: 4,
		length: 2,
		handle: args => handleOutput(args),
	},
	jumpIfTrue:  {
		code: 5,
		length: 3,
		handle: args => handleJumpIfTrue(args),
	},
	jumpIfFalse:  {
		code: 6,
		length: 3,
		handle: args => handleJumpIfFalse(args),
	},
	lessThan:  {
		code: 7,
		length: 4,
		handle: args => handleLessThan(args),
	},
	equals:  {
		code: 8,
		length: 4,
		handle: args => handleEquals(args),
	},
	exit:  {
		code: 99,
		length: 1,
		handle: args => handleExit(args),
	 },
};

const PARAMETER_MODES = {
	position: 0,
	immediate: 1,
};

const handleAdd = (
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
	}
) => {
	const [verb, noun, write,] = params;
	const [verbMode, nounMode, writeMode,] = paramsModes;
	throwIfParamIsInImmediateMode(writeMode, 'write');
	memoryState[write] =
        getParamValue(verb, verbMode, memoryState) +
        getParamValue(noun, nounMode, memoryState);
	return instructionPtr + operation.length;
};

const handleMultiply = (
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
	}
) => {
	const [verb, noun, write,] = params;
	const [verbMode, nounMode, writeMode,] = paramsModes;
	throwIfParamIsInImmediateMode(writeMode, 'write');
	memoryState[write] =
        getParamValue(verb, verbMode, memoryState) *
        getParamValue(noun, nounMode, memoryState);
	return instructionPtr + operation.length;
};

const handleInput = (
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
		},
	}
) => {
	const [write,] = params;
	const [writeMode,] = paramsModes;
	throwIfParamIsInImmediateMode(writeMode, 'write');
	const id = requestTerminalInput('ID');
	memoryState[write] = id;
	return instructionPtr + operation.length;
};

const handleOutput = (
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
			handleTerminalOutput,
		},
	}
) => {
	const [out,] = params;
	const [outMode,] = paramsModes;
	const output =
        getParamValue(out, outMode, memoryState);
	handleTerminalOutput(output);
	return instructionPtr + operation.length;
};

const handleJumpIfTrue = (
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
	}
) => {
	const [verb, jumpTo,] = params;
	const [verbMode, jumpToMode,] = paramsModes;
	if (getParamValue(verb, verbMode, memoryState) !== 0) {
		return getParamValue(jumpTo, jumpToMode, memoryState);
	}
	return instructionPtr + operation.length;
};

const handleJumpIfFalse = (
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
	}
) => {
	const [verb, jumpTo,] = params;
	const [verbMode, jumpToMode,] = paramsModes;
	if (getParamValue(verb, verbMode, memoryState) === 0) {
		return getParamValue(jumpTo, jumpToMode, memoryState);
	}
	return instructionPtr + operation.length;
};

const handleLessThan = (
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
	}
) => {
	const [verb, noun, write,] = params;
	const [verbMode, nounMode, writeMode,] = paramsModes;
	throwIfParamIsInImmediateMode(writeMode, 'write');
	const isLessThan =
        getParamValue(verb, verbMode, memoryState) <
        getParamValue(noun, nounMode, memoryState);
	memoryState[write] = isLessThan ? 1 : 0;
	return instructionPtr + operation.length;
};

const handleEquals = (
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
	}
) => {
	const [verb, noun, write,] = params;
	const [verbMode, nounMode, writeMode,] = paramsModes;
	throwIfParamIsInImmediateMode(writeMode, 'write');
	const equals =
        getParamValue(verb, verbMode, memoryState) ===
        getParamValue(noun, nounMode, memoryState);

	memoryState[write] = equals ? 1 : 0;
	return instructionPtr + operation.length;
};

const handleExit = (
	{
		state: {
			instructionPtr,
		},
		instruction: {
			operation,
		},
	}
) => {
	return instructionPtr + operation.length;
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
	OPERATIONS,
};