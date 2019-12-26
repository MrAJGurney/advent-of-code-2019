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

const solveSecondChallenge = () => {
	const softwareFile = './input.txt';
	const software = readIntcodeSoftware(softwareFile);
	const hullPainter = buildHullPainter(software);
	hullPainter.paintedHullPanels['x0y0'] = '1';
	hullPainter.paintHull();

	return hullPainter.displayPaintedHull();
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};