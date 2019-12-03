const validateYear = year => {
	const min = 2019;
	const max = 2019;
	validateArg(year, 'year', min, max);
};

const validateDay = day => {
	const min = 1;
	const max = 30;
	validateArg(day, 'day', min, max);
};

const validateStar = star => {
	const min = 1;
	const max = 2;
	validateArg(star, 'star', min, max);
};

const validateArg = (argValue, argName, min, max) => {
	const parsedValue = parseInt(argValue);
	const isValidInteger = validateInteger(parsedValue);
	const isValidRange = validateRange(parsedValue, min, max);
	if (!isValidInteger || !isValidRange) {
		throw new Error(
			argName + ' must be an integer between ' +
			min + ' and ' + max + ' inclusive. Incorrect value: ' + argValue);
	}
};

const validateInteger = value => {
	if (value === NaN) { return false; }
	if (value % 1 !== 0) {return false;}
	return true;
};

const validateRange = (value, min, max) => {
	if (value < min) { return false; }
	if (value > max) { return false; }
	return true;
};

module.exports = {
	validateYear,
	validateDay,
	validateStar,
};