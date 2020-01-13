'use strict';

const {
	operationCodes,
} = require('../intcode-computer/operation-codes');
const {
	buildIntcodeComputer,
} = require('../intcode-computer/intcode-computer');

const tileIdCodes = {
	empty: '0',
	wall: '1',
	block: '2',
	horizontalPaddle: '3',
	ball: '4',
};

const scoreboardPositionCode = {
	x: '-1',
	y: '0',
};

const joystickPositionCodes = {
	neutral: '0',
	left: '-1',
	right: '1',
};

const buildGameBoard = software => {
	const self = {
		intcodeComputer: buildIntcodeComputer(software),

		score: 0,

		paddlePosition: null,
		ballPosition: null,

		board: {},
	};

	const layoutTiles = buildLayoutTiles(self);

	const playGame = buildPlayGame(self);

	const getBlockCount = buildGetBlockCount(self);

	return Object.assign(
		self,
		{ layoutTiles, },
		{ playGame, },
		{ getBlockCount, }
	);
};

const buildLayoutTiles = self => () => {
	while (true) {
		// every three output instructions
		const position = {};

		// x position (distance from the left)
		self.intcodeComputer.runUntil([
			operationCodes.output,
		]);
		position.x = self.intcodeComputer.readFromOutputHeap();

		// y position (distance from the top)
		self.intcodeComputer.runUntil([
			operationCodes.output,
		]);
		position.y = self.intcodeComputer.readFromOutputHeap();

		// tile id
		self.intcodeComputer.runUntil([
			operationCodes.output,
		]);

		if (
			position.x === scoreboardPositionCode.x &&
			position.y === scoreboardPositionCode.y
		) {
			const score = self.intcodeComputer.readFromOutputHeap();
			self.score = score;
		} else {
			const tileId = self.intcodeComputer.readFromOutputHeap();
			const positionKey = buildPositionKey(position);

			self.board[positionKey] = tileId;

			if (tileId === tileIdCodes.horizontalPaddle) {
				self.paddlePosition = position;
			} else if (tileId === tileIdCodes.ball) {
				self.ballPosition = position;
			}
		}

		if (
			self.intcodeComputer.peakNextInstruction() ===
				operationCodes.output
		) {
			continue;
		}

		if ([
			operationCodes.halt,
			operationCodes.input,
		].includes(self.intcodeComputer.peakNextInstruction())) {
			return;
		}

		self.intcodeComputer.runUntilNextIs([
			operationCodes.halt,
			operationCodes.input,
			operationCodes.output,
		]);

		if ([
			operationCodes.halt,
			operationCodes.input,
		].includes(self.intcodeComputer.peakNextInstruction())) {
			return;
		}
	}
};

const buildPlayGame = self => () => {
	while (true) {
		self.layoutTiles();

		if (self.getBlockCount() === 0) {
			return;
		}

		let joystickPosition = joystickPositionCodes.neutral;
		if (parseInt(self.ballPosition.x) < parseInt(self.paddlePosition.x)) {
			joystickPosition = joystickPositionCodes.left;
		}
		if (parseInt(self.ballPosition.x) > parseInt(self.paddlePosition.x)) {
			joystickPosition = joystickPositionCodes.right;
		}

		self.intcodeComputer.addToInputQueue(joystickPosition);
	}
};

const buildPositionKey = position => {
	return 'x' + position.x + 'y' + position.y;
};

const buildGetBlockCount = self => () => {
	return Object.values(self.board).filter(
		tileId => tileId === tileIdCodes.block
	).length;
};

module.exports = {
	buildGameBoard,
};