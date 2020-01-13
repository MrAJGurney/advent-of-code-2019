'use strict';

const fs = require('fs');
const path = require('path');

const readIntcodeFromFile = () => {
	const inputFile = 'input.txt';
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const intcodeAsText = fileContents.trim().split(',');
	const intcodeAsNumbers = intcodeAsText.map(mass => parseInt(mass));
	return intcodeAsNumbers;
};

module.exports = {
	readIntcodeFromFile,
};