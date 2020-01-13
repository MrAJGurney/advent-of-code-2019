'use strict';

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
	return gameBoard.getBlockCount();
};

const solveSecondChallenge = () => {
	const softwareFile = './input.txt';
	const software = readIntcodeSoftware(softwareFile);

	const freePlayCode = '2';
	software[0] = freePlayCode;

	const gameBoard = buildGameBoard(software);
	gameBoard.playGame();
	return gameBoard.score;
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};