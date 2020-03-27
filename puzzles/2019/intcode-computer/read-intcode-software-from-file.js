'use strict';

const fs = require('fs');
const path = require('path');

const readIntcodeSoftwareFromFile = (directory, inputFile) => {
	const filePath = path.join(directory, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const software = fileContents.trim().split(',');
	return software;
};

module.exports = {
	readIntcodeSoftwareFromFile,
};