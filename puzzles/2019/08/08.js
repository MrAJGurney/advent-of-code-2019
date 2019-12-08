const {
	SpaceImageFormatPicture,
} = require('./space-image-format-picture');
const {
	readSpaceImageFormatEncodedFile,
} = require('./file-interactions');

const solveFirstChallenge = () => {
	const inputFile = 'input.txt';
	const pixels = readSpaceImageFormatEncodedFile(inputFile);
	const width = 25;
	const height = 6;
	const picture = new SpaceImageFormatPicture(width, height, pixels);

	const layer = picture.findLayerWithFewestZeroes();
	return layer.pixelTypeCount[1] * layer.pixelTypeCount[2];
};

const solveSecondChallenge = () => {};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};