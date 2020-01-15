'use strict';

const calculateOrbitalTransfer = (
	orbitalBodyA,
	orbitalBodyB,
	orbitalRelationships
) => {
	const orbitingBodysWithPrimaryBody =
		getOrbitingBodysWithPrimaryBody(orbitalRelationships);
	const orbitChainToOrbitaBodyA =
		getOrbitChain(orbitalBodyA, orbitingBodysWithPrimaryBody);
	const orbitChainToOrbitaBodyB =
		getOrbitChain(orbitalBodyB, orbitingBodysWithPrimaryBody);
	const transfersRequired =
		getTransfersRequired(
			orbitChainToOrbitaBodyA,
			orbitChainToOrbitaBodyB
		);

	return transfersRequired;
};

const getOrbitingBodysWithPrimaryBody = orbitalRelationships => {
	return orbitalRelationships.reduce((accumulator, orbitalRelationship) => {
		const [primaryBody, orbitingBody, ] = orbitalRelationship;

		accumulator[orbitingBody] = primaryBody;

		return accumulator;
	}, {});
};

const getOrbitChain = (orbitalBody, orbitingBodysWithPrimaryBody) => {
	const orbitChain = [orbitalBody, ];

	let currentOrbitalBody = orbitalBody;
	while (orbitingBodysWithPrimaryBody.hasOwnProperty(currentOrbitalBody)) {
		currentOrbitalBody = orbitingBodysWithPrimaryBody[currentOrbitalBody];
		orbitChain.unshift(currentOrbitalBody);
	}

	return orbitChain;
};

const getTransfersRequired = (
	orbitChainA,
	orbitChainB
) => {
	const shortestChainLength =
		Math.min(orbitChainA.length, orbitChainB.length);
	let commonChainLength = 0;

	for (let i = 0; i < shortestChainLength; i++) {
		if (orbitChainA[i] !== orbitChainB[i]) {
			break;
		}
		commonChainLength = commonChainLength + 1;
	}

	// The -1 is because we want to ignore the final orbital bodies in each
	// chain, typically you and Santa.

	const transfersRequired =
		(orbitChainA.length - 1 - commonChainLength) +
		(orbitChainB.length - 1 - commonChainLength);

	return transfersRequired;
};

module.exports = {
	calculateOrbitalTransfer,
};