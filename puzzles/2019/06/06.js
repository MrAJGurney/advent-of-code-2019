'use strict';

const {
	calculateOrbitalChecksum,
} = require('./orbit-checksum-counter');
const {
	calculateOrbitalTransfer,
} = require('./orbit-transfer-calculator');
const {
	readOrbitalRelationshipsFromFile,
} = require('./file-interactions');

const solveFirstChallenge = () => {
	const orbitalRelationships = readOrbitalRelationshipsFromFile();
	return calculateOrbitalChecksum(orbitalRelationships);
};

const solveSecondChallenge = () => {
	const orbitalRelationships = readOrbitalRelationshipsFromFile();
	const orbitalBodyA = 'YOU';
	const orbitalBodyB = 'SAN';
	return calculateOrbitalTransfer(
		orbitalBodyA,
		orbitalBodyB,
		orbitalRelationships
	);
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};