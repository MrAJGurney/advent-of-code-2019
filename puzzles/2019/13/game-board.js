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

const buildGameBoard = software => {
	const self = {
		intcodeComputer: buildIntcodeComputer(software),

		blockTileCount: 0,
	};

	const layoutTiles = buildLayoutTiles(self);

	return Object.assign(
		self,
		{ layoutTiles, }
	);
};

const buildLayoutTiles = self => () => {
	while (true) {
		self.intcodeComputer.runUntil([
			operationCodes.output,
			operationCodes.halt,
		]);
		if (self.intcodeComputer.currentOperationCode === operationCodes.halt) {
			return;
		}
		// last output = x position

		self.intcodeComputer.runUntil([
			operationCodes.output,
		]);
		// last output = y position

		self.intcodeComputer.runUntil([
			operationCodes.output,
		]);
		const tileId = self.intcodeComputer.readFromOutputHeap();
		if (tileId === tileIdCodes.block) {
			self.blockTileCount++;
		}
	}
};

module.exports = {
	buildGameBoard,
};