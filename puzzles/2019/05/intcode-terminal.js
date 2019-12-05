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
			parameters,
			parametersModes,
		} = deconstructInstruction(memoryState, instructionPtr);
		if (operation.code === OPERATIONS.exit.code)
		{
			break;
		}
		await handleOperation(
			memoryState,
			operation,
			parameters,
			parametersModes,
			requestTerminalInput,
			handleTerminalOutput
		);
		instructionPtr = instructionPtr + operation.length;
	}

	return undefined;
};

const deconstructInstruction = (memoryState, instructionPtr) => {
	const {
		parametersModes,
		operation,
	} = deconstructOperation(memoryState[instructionPtr]);

	const parameterSliceStart = instructionPtr + 1;
	const parameterSliceEnd = instructionPtr + operation.length;
	const parameters = memoryState.slice(
		parameterSliceStart,
		parameterSliceEnd
	);

	return { operation, parameters, parametersModes, };
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

	// Adds leading zeroes to parameter Modes
	while(splitInstruction.length < (operation.length - 1)) {
		splitInstruction.unshift(0);
	}

	const parametersModes = splitInstruction.slice().reverse();

	return { parametersModes, operation, };
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
	memoryState,
	operation,
	parameters,
	parametersModes,
	requestTerminalInput,
	handleTerminalOutput) => {

	if (operation.code === OPERATIONS.add.code) {
		const [verb, noun, write,] = parameters;
		const [verbMode, nounMode, writeMode,] = parametersModes;
		if (writeMode === PARAMETER_MODES.immediate) {
			throw new Error('Out parameter can not be in immediate mode');
		}
		memoryState[write] =
			(verbMode === PARAMETER_MODES.immediate ?
				verb :
				memoryState[verb]) +
			(nounMode === PARAMETER_MODES.immediate ?
				noun :
				memoryState[noun]);
		return;
	}

	if (operation.code === OPERATIONS.multiply.code) {
		const [verb, noun, write,] = parameters;
		const [verbMode, nounMode, writeMode,] = parametersModes;
		if (writeMode === PARAMETER_MODES.immediate) {
			throw new Error('Out parameter can not be in immediate mode');
		}
		memoryState[write] =
			(verbMode === PARAMETER_MODES.immediate ?
				verb :
				memoryState[verb]) *
			(nounMode === PARAMETER_MODES.immediate ?
				noun :
				memoryState[noun]);
		return;
	}

	if (operation.code === OPERATIONS.input.code) {
		const [write,] = parameters;
		const [writeMode,] = parametersModes;
		if (writeMode === PARAMETER_MODES.immediate) {
			throw new Error('Out parameter can not be in immediate mode');
		}
		const id = await requestTerminalInput('ID');
		memoryState[write] = id;
		return;
	}

	if (operation.code === OPERATIONS.output.code) {
		const [out,] = parameters;
		const [outMode,] = parametersModes;

		const output =
			outMode === PARAMETER_MODES.immediate ?
				out :
				memoryState[out];
		handleTerminalOutput(output);
		return;
	}

	if (operation.code === OPERATIONS.exit.code) {
		return;
	}

	throw new Error('Unhandled operation code');
};

module.exports = {
	runDiagnostics,
};