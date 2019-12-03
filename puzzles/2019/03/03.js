const fs = require('fs');
const path = require('path');
const {
	findWireIntersectionClosestToOrigin,
	findWireIntersectionWithLeastDistanceTravelled,
} = require('./wire-intersection-finder.js');

const solveFirstChallenge = () => {
	const [wirePathA, wirePathB,] = readWirePathFromFile();
	const intersectionDistance =
	findWireIntersectionClosestToOrigin(wirePathA, wirePathB);
	return intersectionDistance;
};

const solveSecondChallenge = () => {
	const [wirePathA, wirePathB,] = readWirePathFromFile();
	const combinedDistanceTravelled =
	findWireIntersectionWithLeastDistanceTravelled(wirePathA, wirePathB);
	return combinedDistanceTravelled;
};

const readWirePathFromFile = () => {
	const inputFile = 'input.txt';
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const wirePathsAsText = fileContents.trim().split('\n');
	const wirePathsAsInstructions = wirePathsAsText.map(
		path => path.split(',')
	);
	return wirePathsAsInstructions;
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};