'use strict';

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
		hullPanelDimenions: {
			x: { min: 0, max: 0, },
			y: { min: 0, max: 0, },
		},

		position: { x: 0, y: 0, },
		orientation: orientations.up,
	};

	const paintHull = buildPaintHull(self);

	const displayPaintedHull = buildDisplayPaintedHull(self);

	return Object.assign(
		self,
		{ paintHull, },
		{ displayPaintedHull, }
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

		self.hullPanelDimenions = {
			x: {
				min: Math.min(self.hullPanelDimenions.x.min, self.position.x),
				max: Math.max(self.hullPanelDimenions.x.max, self.position.x),
			},
			y: {
				min: Math.min(self.hullPanelDimenions.y.min, self.position.y),
				max: Math.max(self.hullPanelDimenions.y.max, self.position.y),
			},
		};
	};
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

const buildDisplayPaintedHull = self => () => {
	const xRange =
		self.hullPanelDimenions.x.max - self.hullPanelDimenions.x.min;
	const xOffset =
		self.hullPanelDimenions.x.min;

	const yRange =
		self.hullPanelDimenions.y.max - self.hullPanelDimenions.y.min;
	const yOffset =
		self.hullPanelDimenions.y.min;

	const widthMultiplier = 1;

	const paintedHullDisplay = [];

	// My coordinates are... odd... so I've had to muck around with the output
	for (let x = xRange; x >= 0; x--) {
		const row = [];
		for (let y = yRange; y >= 0; y--) {
			const hullPanelPosition = buildPaintedHullPanelKey({
				x: x + xOffset,
				y: y + yOffset,
			});
			const hullPanelColour =
				self.paintedHullPanels.hasOwnProperty(hullPanelPosition) &&
				self.paintedHullPanels[
					hullPanelPosition
				] === panelColourCodes.white ?
					'█'.repeat(widthMultiplier) :
					'░'.repeat(widthMultiplier);
			row.push(hullPanelColour);
		}
		paintedHullDisplay.push(row.join(''));
	}

	return paintedHullDisplay;
};

module.exports = {
	buildHullPainter,
};