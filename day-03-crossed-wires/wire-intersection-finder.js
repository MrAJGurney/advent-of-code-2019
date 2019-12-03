const fs = require('fs');
const path = require('path');

const _CrossedWiresAlarmFirst = () => {
	const [wirePathA, wirePathB,] = readWirePathFromFile();
	const intersectionDistance = findWireIntersection(wirePathA, wirePathB);
	return intersectionDistance;
};

const _CrossedWiresAlarmSecond = () => {};

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

const findWireIntersection = (wirePathA, wirePathB) => {
	const pointsOfA = findPointsOnPath(wirePathA);
	const pointsOfAWithoutStartingPoint = pointsOfA.slice(1);
	const pointsOfB = findPointsOnPath(wirePathB);
	const pointsOfBWithoutStartingPoint = pointsOfB.slice(1);
	const intersectionPoints = findPointsOfIntersection(
		pointsOfAWithoutStartingPoint,
		pointsOfBWithoutStartingPoint);
	const closestIntersection = findPointClosestToOrigin(intersectionPoints);
	return manhattenDistance(closestIntersection);
};

const findPointsOnPath = instructions => {
	const origin = { x:0, y:0, };
	let points = [origin,];
	const currentPoint = () => points[points.length - 1];
	instructions.forEach(instruction => {
		const newPoints = newPointsFromInstruction(currentPoint(), instruction);
		points = points.concat(newPoints);
	});
	return points;
};

const newPointsFromInstruction = (startPoint, instruction) => {
	const points = [startPoint,];
	const currentPoint = () => points[points.length - 1];

	const { code, value, } = parseInstruction(instruction);
	for (let i = 0; i < value; i++) {
		const { x, y, } = currentPoint();
		const newPoint = { x, y, };
		switch (code) {
		case 'U':
			newPoint.y = newPoint.y + 1;
			break;
		case 'R':
			newPoint.x = newPoint.x + 1;
			break;
		case 'D':
			newPoint.y = newPoint.y - 1;
			break;
		case 'L':
			newPoint.x = newPoint.x - 1;
			break;
		default:
			throw new Error('Unhandled code: ' + code);
		}
		points.push(newPoint);
	}

	const newPoints = points.slice(1);
	return newPoints;
};

const parseInstruction = instruction => {
	const code = instruction.slice(0,1);
	const valueAsText = instruction.slice(1);
	const valueAsNumber = parseInt(valueAsText);
	return {
		 code,
		  value: valueAsNumber,
	};
};

const findPointsOfIntersection = (pointsA, pointsB) => {
	const isIntersection = pointInA => {
		const indexOfIntersection =  pointsB.findIndex(pointInB => {
			const sameX = pointInA.x === pointInB.x;
			const sameY = pointInA.y === pointInB.y;
			return sameX && sameY;
		});
		return indexOfIntersection !== -1;
	};

	const intersectionPoints = [];

	pointsA.forEach(pointInA => {
		if (isIntersection(pointInA)) {
			intersectionPoints.push(pointInA);
		}
	});

	return intersectionPoints;
};

const findPointClosestToOrigin = intersectionPoints => {
	const sortedIntersectionPoints = intersectionPoints.sort(
		(a, b) =>  manhattenDistance(a) - manhattenDistance(b)
	);
	return sortedIntersectionPoints[0];
};

const manhattenDistance = point => Math.abs(point.x) + Math.abs(point.y);

module.exports = {
	_CrossedWiresAlarmFirst,
	_CrossedWiresAlarmSecond,
	findWireIntersection,
};