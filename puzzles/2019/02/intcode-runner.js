const fs = require('fs');
const path = require('path');

const optCodes = {
	add: 1,
	multiply: 2,
	exit: 99,
};

const _1202ProgramAlarmFirst = () => {
	const startState = readIntcodeFromFile();
	startState[1] = 12;
	startState[2] = 2;
	const endState = computeFinalState(startState);
	return endState[0];
};

const _1202ProgramAlarmSecond = () => {
	const targetOutput = 19690720;

	while (true) {
		const startState = readIntcodeFromFile();
		for (let noun = 0; noun < 99; noun++) {
			for (let verb = 0; verb < 99; verb++) {
				startState[1] = noun;
				startState[2] = verb;
				const endState = computeFinalState(startState);
				if (endState[0] === targetOutput)
					return (100 * noun) + verb;
			}
		}
		throw new Error('Combination not found');
	}

};

const readIntcodeFromFile = () => {
	const inputFile = 'input.txt';
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const intcodeAsText = fileContents.trim().split(',');
	const intcodeAsNumbers = intcodeAsText.map(mass => parseInt(mass));
	return intcodeAsNumbers;
};

const computeFinalState = startState => {
	const endState = JSON.parse(JSON.stringify(startState));

	let index = 0;
	while(endState[index] !== optCodes.exit) {
		const params = extractParams(endState, index);
		handleOperation(endState, params);
		index = index + 4;
	}

	return endState;
};

const extractParams = (state, index) => {
	return {
		optCode: state[index],
		aInIndex: state[index + 1],
		bInIndex: state[index + 2],
		storeIndex: state[index + 3],
	};
};

const handleOperation = (state, params) => {
	const { optCode, aInIndex, bInIndex, storeIndex, } = params;

	if (optCode === optCodes.add) {
		state[storeIndex] = state[aInIndex] + state[bInIndex];
		return;
	}

	if (optCode === optCodes.multiply) {
		state[storeIndex] = state[aInIndex] * state[bInIndex];
		return;
	}

	throw new Error('Unhandle opCode');
};

module.exports = {
	_1202ProgramAlarmFirst,
	_1202ProgramAlarmSecond,
	computeFinalState,
};