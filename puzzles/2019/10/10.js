'use strict';

const {
	findMostAsteroidsVisible,
	rowsAndColumnsToXAndY,
} = require('./line-of-site-checker');
const {
	readAsteroidMapFromFile,
} = require('./file-interactions');

const solveFirstChallenge = () => {
	const inputFile = 'input.txt';
	const asteroidMap = readAsteroidMapFromFile(inputFile);
	const formattedMap = rowsAndColumnsToXAndY(asteroidMap);
	const mostAsteroidsVisible =
		findMostAsteroidsVisible({ map: formattedMap, });

	return mostAsteroidsVisible;
};

const solveSecondChallenge = () => {};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};