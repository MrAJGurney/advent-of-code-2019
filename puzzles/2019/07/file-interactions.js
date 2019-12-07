const fs = require('fs');
const path = require('path');

const readIntcodeSoftwareFromFile = () => {
	const inputFile = 'input.txt';
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const softwareAsText = fileContents.trim().split(',');
	const softwareAsNumbers = softwareAsText.map(mass => parseInt(mass));
	return softwareAsNumbers;
};

module.exports = {
	readIntcodeSoftwareFromFile,
};