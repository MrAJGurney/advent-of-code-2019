const puzzles = require('./puzzles/puzzles.js');
const {
	validateYear,
	validateDay,
	validateStar,
} = require('./cliTool/arg-validator.js');

const adventOfCode = () => {
	const args = process.argv.slice(2);
	const [year, day, star,] = args;

	validateYear(year);
	validateDay(day);
	validateStar(star);

	const solver = puzzles[year][day][star];
	const { solution, executionTime, } = solveWithExecutionTime(solver);

	/* eslint-disable no-console */
	console.log('year:',year,'day:','star:',star,'solution:',solution);
	console.log('Execution time: %ds %dms',
		executionTime[0],
		executionTime[1] / 1000000);
	/* eslint-enable no-console */
};

const solveWithExecutionTime = solver => {
	const highResolutionTimeStart = process.hrtime();
	const solution = solver();
	const highResolutionTimeEnd = process.hrtime(highResolutionTimeStart);
	return { solution, executionTime: highResolutionTimeEnd, };
};

adventOfCode();