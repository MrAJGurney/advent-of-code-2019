const buildScaffoldMapper = intcodeComputer => {
	const self = {
		intcodeComputer,
	};

	const getAlignmentParameters = buildGetAlignmentParameters();

	return Object.assign(
		self,
		{ getAlignmentParameters, }
	);
};

const buildGetAlignmentParameters = () => () => {};

module.exports = {
	buildScaffoldMapper,
};