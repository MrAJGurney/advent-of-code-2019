const {
	calculateSecondPuzzleSolution,
	calculateFirstPuzzleSolution,
} = require(
	'./day-01-the-tyranny-of-the-rocket-equation/fuel-requirement-calculator.js'
);

/* eslint-disable no-console */

console.log('day 01', 'part 01', '=>', calculateFirstPuzzleSolution());
console.log('day 01', 'part 02', '=>', calculateSecondPuzzleSolution());