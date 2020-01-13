'use strict';

const fs = require('fs');
const path = require('path');

const readAsteroidMapFromFile = inputFile => {
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const asteroidMapRows = fileContents.trim().split('\n');
	const asteroidMap = asteroidMapRows.map(row => row.trim().split(''));
	return asteroidMap;
};

module.exports = {
	readAsteroidMapFromFile,
};