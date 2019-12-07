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
	output: {
		code: 4,
		length: 2,
		handle: args => handleOutput(args),
	},
	jumpIfTrue: {
		code: 5,
		length: 3,
		handle: args => handleJumpIfTrue(args),
	},
	jumpIfFalse: {
		code: 6,
		length: 3,
		handle: args => handleJumpIfFalse(args),
	},
	lessThan: {
		code: 7,
		length: 4,
		handle: args => handleLessThan(args),
	},
	equals: {
		code: 8,
		length: 4,
		handle: args => handleEquals(args),
	},
	halt: {
		code: 99,
		length: 1,
		handle: args => handleHalt(args),
	 },
};

const PARAMETER_MODES = {
	position: 0,
	immediate: 1,
};

const handleAdd = (
	{
		instruction: {
			operation,
			params,
			paramsModes,
		},
		softwareIO: {
			writeMemoryAt,
			readMemoryAt,
		},
		instructionPtrIO: {
			getInstructionPtr,
			moveInstructionPtr,
		},
	}
) => {
	const [verb, noun, write,] = params;
	const [verbMode, nounMode, writeMode,] = paramsModes;
	throwIfParamIsInImmediateMode(writeMode, 'write');
	const value =
		getParamValue(verb, verbMode, readMemoryAt) +
		getParamValue(noun, nounMode, readMemoryAt);
	writeMemoryAt({ ptr: write, value, });
	moveInstructionPtr(getInstructionPtr() + operation.length);
	return;
};

const handleMultiply = (
	{
		instruction: {
			operation,
			params,
			paramsModes,
		},
		softwareIO: {
			writeMemoryAt,
			readMemoryAt,
		},
		instructionPtrIO: {
			getInstructionPtr,
			moveInstructionPtr,
		},
	}
) => {
	const [verb, noun, write,] = params;
	const [verbMode, nounMode, writeMode,] = paramsModes;
	throwIfParamIsInImmediateMode(writeMode, 'write');
	const value =
		getParamValue(verb, verbMode, readMemoryAt) *
		getParamValue(noun, nounMode, readMemoryAt);
	writeMemoryAt({ ptr: write, value, });
	moveInstructionPtr(getInstructionPtr() + operation.length);
	return;
};

const handleInput = (
	{
		instruction: {
			operation,
			params,
			paramsModes,
		},
		softwareIO: {
			writeMemoryAt,
		},
		instructionPtrIO: {
			getInstructionPtr,
			moveInstructionPtr,
		},
		storageIO: {
			consumeInput,
		},
	}
) => {
	const [write,] = params;
	const [writeMode,] = paramsModes;
	throwIfParamIsInImmediateMode(writeMode, 'write');
	const input = consumeInput();
	writeMemoryAt({ ptr: write, value: input, });
	moveInstructionPtr(getInstructionPtr() + operation.length);
	return;
};

const handleOutput = (
	{
		instruction: {
			operation,
			params,
			paramsModes,
		},
		softwareIO: {
			readMemoryAt,
		},
		instructionPtrIO: {
			getInstructionPtr,
			moveInstructionPtr,
		},
		storageIO: {
			addOutput,
		},
	}
) => {
	const [out,] = params;
	const [outMode,] = paramsModes;
	const output =
		getParamValue(out, outMode, readMemoryAt);
	addOutput(output);
	moveInstructionPtr(getInstructionPtr() + operation.length);
	return;
};

const handleJumpIfTrue = (
	{
		instruction: {
			operation,
			params,
			paramsModes,
		},
		softwareIO: {
			readMemoryAt,
		},
		instructionPtrIO: {
			getInstructionPtr,
			moveInstructionPtr,
		},
	}
) => {
	const [verb, jumpTo,] = params;
	const [verbMode, jumpToMode,] = paramsModes;
	const shouldJump = getParamValue(verb, verbMode, readMemoryAt) !== 0;
	moveInstructionPtr(
		shouldJump ?
			getParamValue(jumpTo, jumpToMode, readMemoryAt) :
			getInstructionPtr() + operation.length
	);
	return;
};

const handleJumpIfFalse = (
	{
		instruction: {
			operation,
			params,
			paramsModes,
		},
		softwareIO: {
			readMemoryAt,
		},
		instructionPtrIO: {
			getInstructionPtr,
			moveInstructionPtr,
		},
	}
) => {
	const [verb, jumpTo,] = params;
	const [verbMode, jumpToMode,] = paramsModes;
	const shouldJump = getParamValue(verb, verbMode, readMemoryAt) === 0;
	moveInstructionPtr(
		shouldJump ?
			getParamValue(jumpTo, jumpToMode, readMemoryAt) :
			getInstructionPtr() + operation.length
	);
	return;
};

const handleLessThan = (
	{
		instruction: {
			operation,
			params,
			paramsModes,
		},
		softwareIO: {
			writeMemoryAt,
			readMemoryAt,
		},
		instructionPtrIO: {
			getInstructionPtr,
			moveInstructionPtr,
		},
	}
) => {
	const [verb, noun, write,] = params;
	const [verbMode, nounMode, writeMode,] = paramsModes;
	throwIfParamIsInImmediateMode(writeMode, 'write');
	const isLessThan =
		getParamValue(verb, verbMode, readMemoryAt) <
		getParamValue(noun, nounMode, readMemoryAt);
	writeMemoryAt({
		ptr: write,
		value: isLessThan ? 1 : 0, });
	moveInstructionPtr(getInstructionPtr() + operation.length);
	return;
};

const handleEquals = (
	{
		instruction: {
			operation,
			params,
			paramsModes,
		},
		softwareIO: {
			writeMemoryAt,
			readMemoryAt,
		},
		instructionPtrIO: {
			getInstructionPtr,
			moveInstructionPtr,
		},
	}
) => {
	const [verb, noun, write,] = params;
	const [verbMode, nounMode, writeMode,] = paramsModes;
	throwIfParamIsInImmediateMode(writeMode, 'write');
	const equals =
		getParamValue(verb, verbMode, readMemoryAt) ===
		getParamValue(noun, nounMode, readMemoryAt);
	writeMemoryAt({
		ptr: write,
		value: equals ? 1 : 0, });
	moveInstructionPtr(getInstructionPtr() + operation.length);
	return;
};

const handleHalt = (
	{
		instruction: {
			operation,
		},
		instructionPtrIO: {
			getInstructionPtr,
			moveInstructionPtr,
		},
	}
) => {
	moveInstructionPtr(getInstructionPtr() + operation.length);
	return;
};

const getParamValue = (param, paramMode, readMemoryAt) => {
	return paramMode === PARAMETER_MODES.immediate ?
		param :
		readMemoryAt({ ptr: param, });
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