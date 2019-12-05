const puzzles = require('./puzzles/puzzles.js');
const {
	validateYear,
	validateDay,
	validateStar,
} = require('./cliTool/arg-validator.js');

const adventOfCode = async () => {
	const args = process.argv.slice(2);
	const [year, day, star,] = args;

	validateYear(year);
	validateDay(day);
	validateStar(star);

	const solver = puzzles[year][day].stars[star];
	const title = puzzles[year][day].title;
	const { solution, executionTime, } = await solveWithExecutionTime(solver);

	/* eslint-disable no-console */
	console.log(
		JSON.stringify({
			title,
			date: {
				year,
				day,
				star,
			},
			executionTime,
			solution,
		}, null, 2)
	);
	/* eslint-enable no-console */
};

const solveWithExecutionTime = async solver => {
	const highResolutionTimeStart = process.hrtime();
	const solution = await solver();
	const [seconds, nanoseconds,] = process.hrtime(highResolutionTimeStart);
	const milliseconds = Math.ceil(nanoseconds / 1000);
	return { solution, executionTime: { seconds, milliseconds, }, };
};

adventOfCode();