const {
	calculateOrbitalChecksum,
} = require('./orbit-checksum-counter');
const {
	readOrbitalRelationshipsFromFile,
} = require('./file-interactions');

const solveFirstChallenge = async () => {
	const orbitalRelationships = readOrbitalRelationshipsFromFile();;
	return calculateOrbitalChecksum(orbitalRelationships);
};

const solveSecondChallenge = async () => {};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};