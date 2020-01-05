const {
	operationCodes,
} = require('../intcode-computer/operation-codes');

const mapSymbolCodes = {
	scaffold: '#',
	space: '.',
	newline: '\n',
	robotFacingUp: '^',
	robotFacingDown: 'v',
	robotFacingLeft: '<',
	robotFacingRight: '>',
	robotFacingImpendingDoom: 'X',
};

const buildScaffoldMapper = intcodeComputer => {
	const self = {
		intcodeComputer,
		scaffolds: [],
	};

	const getAlignmentParameters =
		buildGetAlignmentParameters(self);

	const mapScaffolds =
		buildMapScaffolds(self);

	const findAllScaffoldIntersections =
		buildFindAllScaffoldIntersections(self);

	const isIntersection =
		buildIsIntersection(self);

	return Object.assign(
		self,
		{ getAlignmentParameters, },
		{ mapScaffolds, },
		{ findAllScaffoldIntersections, },
		{ isIntersection, }
	);
};

const buildGetAlignmentParameters = self => () => {
	self.mapScaffolds();
	const intersections = self.findAllScaffoldIntersections();
	const alignmentParamReducer = (alignmentParamSum, intersection) =>
		alignmentParamSum + (intersection.x * intersection.y)

	return intersections.reduce(alignmentParamReducer, 0);
};

const buildMapScaffolds = self => () => {
	self.intcodeComputer.runUntil([
		operationCodes.halt,
	]);

	const output = self.intcodeComputer.outputHeap.slice();

	self.scaffolds = output
		.map(code => String.fromCharCode(parseInt(code)))
		.join('')
		.trim()
		.split('\n')
		.map(line => line.split(''));
};

const buildFindAllScaffoldIntersections = self => () => {
	const intersections = [];

	const yMax = self.scaffolds.length - 1;
	for( let y = 0; y <= yMax; y++) {
		if (y === 0 || y === yMax) {
			continue;
		}
		const xMax = self.scaffolds[y].length - 1;
		for( let x = 0; x <= xMax; x++) {
			if (x === 0 || x === xMax) {
				continue;
			}
			if (self.isIntersection({ x, y, })) {
				intersections.push({ x, y, });
			}
		}
	}

	return intersections;
};

const buildIsIntersection = self => ({ x, y, }) => {
	const scaffoldOrRobot = [
		mapSymbolCodes.scaffold,
		mapSymbolCodes.robotFacingUp,
		mapSymbolCodes.robotFacingDown,
		mapSymbolCodes.robotFacingLeft,
		mapSymbolCodes.robotFacingRight,
	];
	return(
		scaffoldOrRobot.includes(self.scaffolds[y][x]) &&
		scaffoldOrRobot.includes(self.scaffolds[y][x-1]) &&
		scaffoldOrRobot.includes(self.scaffolds[y][x+1]) &&
		scaffoldOrRobot.includes(self.scaffolds[y-1][x]) &&
		scaffoldOrRobot.includes(self.scaffolds[y+1][x])
	);
};

module.exports = {
	buildScaffoldMapper,
};