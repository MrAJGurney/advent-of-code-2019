const {
	getMaxThrustSignal,
	getMaxThrustSignalWithFeedback,
} = require('./amplifier-circuit');
const {
	readIntcodeSoftwareFromFile,
} = require('./file-interactions');

const solveFirstChallenge = () => {
	const software = readIntcodeSoftwareFromFile();
	return getMaxThrustSignal(
		software
	);
};

const solveSecondChallenge = () => {
	const software = readIntcodeSoftwareFromFile();
	return getMaxThrustSignalWithFeedback(
		software
	);
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};