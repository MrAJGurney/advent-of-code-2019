const {
	readIntcodeSoftware,
} = require('./file-interactions');
const {
	buildHullPainter,
} = require('./hull-painter');

const solveFirstChallenge = () => {
	const softwareFile = './input.txt';
	const software = readIntcodeSoftware(softwareFile);
	const hullPainter = buildHullPainter(software);
	hullPainter.paintHull();

	return Object.keys(hullPainter.paintedHullPanels).length;
};

const solveSecondChallenge = () => {};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};