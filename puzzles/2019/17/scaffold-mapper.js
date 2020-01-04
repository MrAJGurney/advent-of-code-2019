const buildScaffoldMapper = intcodeComputer => {
	const self = {
		intcodeComputer,
	};

	const getAlignmentParameters = buildGetAlignmentParameters();

	const mapScaffolds = buildMapScaffolds();

	return Object.assign(
		self,
		{ getAlignmentParameters, },
		{ mapScaffolds, }
	);
};

const buildGetAlignmentParameters = () => () => {};

const buildMapScaffolds = () => () => {};

module.exports = {
	buildScaffoldMapper,
};