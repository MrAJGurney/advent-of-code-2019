const {
	getMaxThrustSignal,
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

const solveSecondChallenge = () => {};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};