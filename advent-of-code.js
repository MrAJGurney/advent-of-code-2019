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

	const solution = puzzles[year][day][star]();
	/* eslint-disable no-console */
	console.log('' + year + '-' + day + '-' + star + ': ' + solution);
	/* eslint-enable no-console */
};

adventOfCode();