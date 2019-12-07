const buildInputProvider = inputValues => {
	const inputBuffer = JSON.parse(JSON.stringify(inputValues));
	return () => inputBuffer.shift();
};

const buildOutputHandler = () => {
	const outputStore = [];

	const handleOutput = outputValue => {
		outputStore.push(outputValue);
	};

	const getOutput = () => {
		return JSON.parse(JSON.stringify(outputStore));
	};

	return {
		handleOutput,
		getOutput,
	};
};

module.exports = {
	buildInputProvider,
	buildOutputHandler,
};