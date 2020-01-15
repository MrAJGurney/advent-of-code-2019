'use strict';

const buildVacuumRobot = (intcodeComputer, scaffoldMapper) => {
	const self = {
		intcodeComputer,
		scaffoldMapper,
	};

	const traverseScaffolds = buildTraverseScaffolds(self);

	const findNaivePathOverScaffold =
		buildFindNaivePathOverScaffold();

	const breakdownPath =
		buildBreakdownPath();

	const followPath =
		buildFollowPath();

	const getDustCollected =
		buildGetDustCollected();

	return Object.assign(
		self,
		{ traverseScaffolds, },
		{ findNaivePathOverScaffold, },
		{ breakdownPath, },
		{ followPath, },
		{ getDustCollected, }
	);
};

const buildTraverseScaffolds = self => () => {
	self.scaffoldMapper.mapScaffolds();
	self.findNaivePathOverScaffold();
	self.breakdownPath();
	self.followPath();
};

const buildFindNaivePathOverScaffold = () => () => {};

const buildBreakdownPath = () => () => {};

const buildFollowPath = () => () => {};

const buildGetDustCollected = () => () => {};

module.exports = {
	buildVacuumRobot,
};