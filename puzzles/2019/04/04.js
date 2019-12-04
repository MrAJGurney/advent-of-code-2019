const {
	getValidPasswordCount,
} = require('./password-generator.js');

const solveFirstChallenge = () => {
	const puzzleInput = '183564-657474';
	const { min, max, } = rangeFromPuzzleInput(puzzleInput);
	const passwordCount = getValidPasswordCount(min, max);
	return passwordCount;
};

const solveSecondChallenge = () => {
};

const rangeFromPuzzleInput = puzzleInput => {
	const [minAsText, maxAsText,] = puzzleInput.split('-');
	const min = parseInt(minAsText);
	const max = parseInt(maxAsText);
	return { min, max, };
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};