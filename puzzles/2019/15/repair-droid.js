const {
	operationCodes,
} = require('../intcode-computer/operation-codes');
const {
	buildIntcodeComputer,
} = require('../intcode-computer/intcode-computer');

const movementCommandCodes = {
	north: '1',
	south: '2',
	west: '3',
	east: '4',
};

const statusResponseCodes = {
	wall: '0',
	space: '1',
	oxygenSystem: '2',
};

const startLocation = { x: 0, y:0, };

const buildRepairDroid = software => {
	const self = {
		intcodeComputer: buildIntcodeComputer(software),

		locationsTree: {
			position: startLocation,
			directions: [],
		},

		oxygenSystemDirections: [],
	};

	const getShortestRouteToOxygenSystem =
		buildGetShortestRouteToOxygenSystem(self);

	const findOxygenSystem =
		buildFindOxygenSystem(self);

	const moveToNodeFromStart = buildMoveToNodeFromStart(self);

	const moveInDirection = buildMoveInDirection(self);

	const moveToStartFromNode = buildMoveToStartFromNode(self);

	const moveInReverseDirection = buildMoveInReverseDirection(self);

	return Object.assign(
		self,
		{ getShortestRouteToOxygenSystem, },
		{ findOxygenSystem, },
		{ moveToNodeFromStart, },
		{ moveInDirection, },
		{ moveToStartFromNode, },
		{ moveInReverseDirection, }
	);
};

const buildGetShortestRouteToOxygenSystem = self => () => {
	self.findOxygenSystem();
	return self.oxygenSystemDirections.length;
};

const buildFindOxygenSystem = self => () => {
	find_oxygen_system: {
		const visitedNodes = {};

		let extremisNodes = [self.locationsTree,];
		while(true) {
			const newExtremisNodes = [];
			for (const extremisNode of extremisNodes) {
				self.moveToNodeFromStart(extremisNode);

				for(const directionKey of Object.keys(movementCommandCodes)) {
					const direction = movementCommandCodes[directionKey];
					const responseCode =
						self.moveInDirection(direction);
					extremisNode[directionKey] = responseCode;
					if (responseCode === statusResponseCodes.space) {
						extremisNode[directionKey] = {
							directions: [
								...extremisNode.directions,
								direction,
							],
							position: newPosition(
								extremisNode.position,
								direction
							),
						};

						const positionKey = buildPositionKey(
							extremisNode[directionKey].position
						);
						if (!visitedNodes.hasOwnProperty(positionKey)) {
							newExtremisNodes.push(extremisNode[directionKey]);
							visitedNodes[positionKey] = true;
						}
						self.moveInReverseDirection(direction);
					}
					if (responseCode === statusResponseCodes.oxygenSystem) {
						self.oxygenSystemDirections =
							[...extremisNode.directions, direction,];
						break find_oxygen_system;
					}
				};

				self.moveToStartFromNode(extremisNode);
			};
			extremisNodes = newExtremisNodes;
		};
	}
};

const buildMoveToNodeFromStart = self => node => {
	for (const direction of node.directions) {
		const response = self.moveInDirection(direction);
		if (response !== statusResponseCodes.space) {
			throw new Error('Unexpected obstacle on return path');
		}
	}
};

const buildMoveInDirection = self => direction => {
	self.intcodeComputer.addToInputQueue(direction);

	self.intcodeComputer.runUntil([
		operationCodes.output,
	]);

	return self.intcodeComputer.readFromOutputHeap();
};

const buildMoveToStartFromNode = self => node => {
	for (const direction of node.directions.slice().reverse()) {
		const response = self.moveInReverseDirection(direction);
		if (response !== statusResponseCodes.space) {
			throw new Error('Unexpected obstacle on return path');
		}
	}
};

const buildMoveInReverseDirection = self => direction => {
	const response = self.moveInDirection(getReverse(direction));
	if (response !== statusResponseCodes.space) {
		throw new Error('Unexpected obstacle on return path');
	}
	return response;
};

const getReverse = direction => {
	if (direction === movementCommandCodes.north) {
		return movementCommandCodes.south;
	}
	if (direction === movementCommandCodes.east) {
		return movementCommandCodes.west;
	}
	if (direction === movementCommandCodes.south) {
		return movementCommandCodes.north;
	}
	if (direction === movementCommandCodes.west) {
		return movementCommandCodes.east;
	}
	throw new Error('Unexpected direction');
};

const buildPositionKey = position => {
	return 'x' + position.x + 'y' + position.y;
};

const newPosition = (position, direction) => {
	const offset = {
		x: direction === movementCommandCodes.north ? 1 :
			direction === movementCommandCodes.south ? -1 :
				0,
		y: direction === movementCommandCodes.east ? 1 :
			direction === movementCommandCodes.west ? -1 :
				0,
	};

	return {
		x: position.x + offset.x,
		y: position.y + offset.y,
	};
};

module.exports = {
	buildRepairDroid,
};