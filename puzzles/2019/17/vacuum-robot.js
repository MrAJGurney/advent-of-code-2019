'use strict';

const mapSymbols = {
	scaffold: '#',
	space: '.',
	newline: '\n',
	robotFacingUp: '^',
	robotFacingDown: 'v',
	robotFacingLeft: '<',
	robotFacingRight: '>',
	robotFacingImpendingDoom: 'X',
};

const offsetFromOrientation = {
	up: { x:0, y:-1, },
	down: { x:0, y:1, },
	right: { x:1, y:0, },
	left: { x:-1, y:0, },
};

const buildVacuumRobot = (intcodeComputer, scaffoldMapper) => {
	const self = {
		intcodeComputer,
		scaffoldMapper,
		position: null,
		orientation: null,
	};

	const traverseScaffolds = buildTraverseScaffolds(self);

	const findNaivePathOverScaffold =
		buildFindNaivePathOverScaffold(self);

	const findRobotPositionAndOrientation =
		buildFindRobotPositionAndOrientation(self);

	const isNextTileScaffold
		= buildIsNextTileScaffold(self);

	const rotateRobot = buildRotateRobot(self);

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
		{ findRobotPositionAndOrientation, },
		{ isNextTileScaffold, },
		{ rotateRobot, },
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

const buildFindNaivePathOverScaffold = () => () => {
	// find robot position and orientation
	// while true
	//   while next tile is scaffold
	//     move forward 1 space
	//     record movement
	//   if there is a scaffold within 1 turn
	//     rotate once
	//     record rotation
	//   else
	//     stop
};

const buildFindRobotPositionAndOrientation = self => () => {
	const robotSymbolCodes = [
		mapSymbols.robotFacingImpendingDoom,
		mapSymbols.robotFacingUp,
		mapSymbols.robotFacingDown,
		mapSymbols.robotFacingLeft,
		mapSymbols.robotFacingRight,
	];

	const yMax = self.scaffoldMapper.scaffolds.length - 1;
	for (let y = 0; y <= yMax; y++) {
		const xMax = self.scaffoldMapper.scaffolds[y].length - 1;
		for (let x = 0; x <= xMax; x++) {
			const symbol = self.scaffoldMapper.scaffolds[y][x];
			if (robotSymbolCodes.includes(symbol)) {
				self.position = { x, y, };
				switch (symbol) {
				case mapSymbols.robotFacingUp:
					self.orientation = offsetFromOrientation.up;
					return;
				case mapSymbols.robotFacingDown:
					self.orientation = offsetFromOrientation.down;
					return;
				case mapSymbols.robotFacingRight:
					self.orientation = offsetFromOrientation.right;
					return;
				case mapSymbols.robotFacingLeft:
					self.orientation = offsetFromOrientation.left;
					return;
				case mapSymbols.robotFacingImpendingDoom:
					throw new Error('Robot is tumbling through space');
				default:
					throw new Error('Unknown robot symbol code');
				}
			}
		}
	}

	throw new Error('Robot not found');
};

const buildIsNextTileScaffold = self => () => {
	const nextTilePosition = {
		x: self.position.x + self.orientation.x,
		y: self.position.y + self.orientation.y,
	};

	const yMax = self.scaffoldMapper.scaffolds.length - 1;
	const xMax = self.scaffoldMapper.scaffolds[0].length - 1;

	if (nextTilePosition.x < 0 || nextTilePosition > xMax) {
		return false;
	}

	if (nextTilePosition.y < 0 || nextTilePosition > yMax) {
		return false;
	}

	const nextTileSymbol = self
		.scaffoldMapper
		.scaffolds[nextTilePosition.y][nextTilePosition.x];

	return nextTileSymbol === mapSymbols.scaffold;
};

const buildRotateRobot = () => () => {};

const buildBreakdownPath = () => () => {};

const buildFollowPath = () => () => {};

const buildGetDustCollected = () => () => {};

module.exports = {
	buildVacuumRobot,
};