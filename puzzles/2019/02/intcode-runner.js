const optCodes = {
	add: 1,
	multiply: 2,
	exit: 99,
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
	computeFinalState,
};