const calculateOrbitalChecksum = orbitalRelationships => {
	const primaryBodysWithOrbitingBodys =
		getPrimaryBodysWithOrbitingBodys(orbitalRelationships);
	const primaryBodysWithOrbitCounts =
		getPrimaryBodysWithOrbitCounts(primaryBodysWithOrbitingBodys);
	const orbitCount = countOrbits(primaryBodysWithOrbitCounts);

	return orbitCount;
};

const getPrimaryBodysWithOrbitingBodys = orbitalRelationships => {
	return orbitalRelationships.reduce((accumulator, orbitalRelationship) => {
		const [primaryBody, orbitingBody,] = orbitalRelationship;

		if (!accumulator.hasOwnProperty(primaryBody)) {
			accumulator[primaryBody] = [];
		}

		accumulator[primaryBody].push(orbitingBody);

		return accumulator;
	}, {});
};

const getPrimaryBodysWithOrbitCounts = primaryBodysWithOrbitingBodys => {
	const primaryBodysWithOrbitCounts = {
		COM: 0,
	};

	propagateOrbitCounts(
		primaryBodysWithOrbitingBodys,
		'COM',
		primaryBodysWithOrbitCounts);

	return primaryBodysWithOrbitCounts;
};

const propagateOrbitCounts = (
	primaryBodysWithOrbitingBodys,
	primaryBody,
	primaryBodysWithOrbitCounts
) => {
	if (!primaryBodysWithOrbitingBodys.hasOwnProperty(primaryBody)) {
		return;
	}

	primaryBodysWithOrbitingBodys[primaryBody].forEach(orbitingBody => {
		primaryBodysWithOrbitCounts[orbitingBody] =
			primaryBodysWithOrbitCounts[primaryBody] + 1;
		propagateOrbitCounts(
			primaryBodysWithOrbitingBodys,
			orbitingBody,
			primaryBodysWithOrbitCounts
		);
	});
};

const countOrbits = primaryBodysWithOrbitCounts => {
	return Object
		.values(primaryBodysWithOrbitCounts)
		.reduce((accumulator, orbitCountForPrimaryBody) => {
			return accumulator + orbitCountForPrimaryBody;
		}, 0);
};

module.exports = {
	calculateOrbitalChecksum,
};