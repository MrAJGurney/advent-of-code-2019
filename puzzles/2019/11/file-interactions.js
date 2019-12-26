const fs = require('fs');
const path = require('path');

const readIntcodeSoftware = inputFile => {
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const software = fileContents.trim().split(',');
	return software;
};

module.exports = {
	readIntcodeSoftware,
};