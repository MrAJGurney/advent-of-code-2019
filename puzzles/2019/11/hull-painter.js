const {
	operationCodes,
} = require('../intcode-computer/operation-codes');
const {
	buildIntcodeComputer,
} = require('../intcode-computer/intcode-computer');

const orientations = {
	up: { x:1, y:0, },
	right: { x:0, y:1, },
	down: { x:-1, y:0, },
	left: { x:0, y:-1, },
};

const panelColourCodes = {
	black: '0',
	white: '1',
};

const rotationCodes = {
	left: '0',
	right: '1',
};

const buildHullPainter = software => {
	const self = {
		intcodeComputer: buildIntcodeComputer(software),

		paintedHullPanels: {},

		position: { x: 0, y: 0, },
		orientation: orientations.up,
	};

	const paintHull = buildPaintHull(self);

	return Object.assign(
		self,
		{ paintHull, }
	);
};

const buildPaintHull = self => () => {
	while (true) {
		// The program uses input instructions to access the robot's camera
		const hullPanelPosition = buildPaintedHullPanelKey(self.position);
		const hullPanelColour =
			self.paintedHullPanels.hasOwnProperty(hullPanelPosition) &&
			self.paintedHullPanels[
				hullPanelPosition
			] === panelColourCodes.white ?
				panelColourCodes.white :
				panelColourCodes.black;

		// The program uses input instructions to access the robot's camera
		self.intcodeComputer.addToInputQueue(hullPanelColour);

		// First, it will output a value indicating the color to paint the
		// panel the robot is over
		self.intcodeComputer.runUntil([
			operationCodes.output,
			operationCodes.halt,
		]);
		if (self.intcodeComputer.currentOperationCode === operationCodes.halt) {
			return;
		}
		self.paintedHullPanels[buildPaintedHullPanelKey(self.position)] =
			self.intcodeComputer.readFromOutputHeap();

		// Second, it will output a value indicating the direction the robot
		// should turn
		self.intcodeComputer.runUntil([
			operationCodes.output,
			operationCodes.halt,
		]);
		if (self.intcodeComputer.currentOperationCode === operationCodes.halt) {
			return;
		}
		self.orientation = rotate(
			self.orientation,
			self.intcodeComputer.readFromOutputHeap()
		);

		// After the robot turns, it should always move forward exactly one
		// panel
		self.position = {
			x: self.position.x + self.orientation.x,
			y: self.position.y + self.orientation.y,
		};
	}
};

const buildPaintedHullPanelKey = position => {
	return 'x' + position.x +'y' + position.y;
};

const rotate = (orientation, rotationCode) => {
	if (rotationCode === rotationCodes.left) {
		const { x, y, } = orientation;
		return {
			x: -y,
			y: x,
		};
	}

	if (rotationCode === rotationCodes.right) {
		const { x, y, } = orientation;
		return {
			x: y,
			y: -x,
		};
	}

	throw new Error('Unhandled rotation code');
};

module.exports = {
	buildHullPainter,
};