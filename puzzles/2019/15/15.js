const {
	readIntcodeSoftware,
} = require('./file-interactions');
const {
	buildRepairDroid,
} = require('./repair-droid');

const solveFirstChallenge = () => {
	const softwareFile = './input.txt';
	const software = readIntcodeSoftware(softwareFile);
	const repairDroid = buildRepairDroid(software);
	return repairDroid.getShortestRouteToOxygenSystem();
};

const solveSecondChallenge = () => {
	const softwareFile = './input.txt';
	const software = readIntcodeSoftware(softwareFile);
	const repairDroid = buildRepairDroid(software);
	return repairDroid.getFurthestRouteFromOxygenSystemToEdge();
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};