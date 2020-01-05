const {
	readIntcodeSoftware,
} = require('./file-interactions');
const {
	buildIntcodeComputer,
} = require('../intcode-computer/intcode-computer');
const {
	buildScaffoldMapper,
} = require('./scaffold-mapper');

const solveFirstChallenge = () => {
	const softwareFile = './input.txt';
	const software = readIntcodeSoftware(softwareFile);
	const intcodeComputer = buildIntcodeComputer(software);
	const scaffoldMapper = buildScaffoldMapper(intcodeComputer);

	return scaffoldMapper
		.getAlignmentParameters()
		.reduce((accum, param) => accum + param, 0);
};

const solveSecondChallenge = () => {};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};