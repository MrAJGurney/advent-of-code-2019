const {
	readIntcodeSoftware,
} = require('./file-interactions');
const {
	buildGameBoard,
} = require('./game-board');

const solveFirstChallenge = () => {
	const softwareFile = './input.txt';
	const software = readIntcodeSoftware(softwareFile);
	const gameBoard = buildGameBoard(software);
	gameBoard.layoutTiles();
	return gameBoard.blockTileCount;
};

const solveSecondChallenge = () => {};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};