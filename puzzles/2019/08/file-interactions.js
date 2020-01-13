'use strict';

const fs = require('fs');
const path = require('path');

const readSpaceImageFormatEncodedFile = inputFile => {
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const pixelColourAsText = fileContents.trim().split('');
	const pixelColour =
		pixelColourAsText.map(pixelColour => parseInt(pixelColour));
	return pixelColour;
};

module.exports = {
	readSpaceImageFormatEncodedFile,
};