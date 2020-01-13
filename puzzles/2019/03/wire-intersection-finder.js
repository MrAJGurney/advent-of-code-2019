'use strict';

const findWireIntersectionClosestToOrigin = (wirePathA, wirePathB) => {
	const intersectionPoints = findWireIntersections(wirePathA, wirePathB);
	const closestIntersection = findPointClosestToOrigin(intersectionPoints);
	return manhattenDistance(closestIntersection);
};

const findWireIntersectionWithLeastDistanceTravelled = (
	wirePathA, wirePathB
) => {
	const intersectionPoints = findWireIntersections(wirePathA, wirePathB);
	const closestIntersection =
	findPointWithLeastTravelDistance(intersectionPoints);
	return closestIntersection.totalDistanceTravelled;
};

const findWireIntersections = (wirePathA, wirePathB) => {
	const pointsOfA = findPointsOnPath(wirePathA);
	const pointsOfAWithoutStartingPoint = pointsOfA.slice(1);
	const pointsOfB = findPointsOnPath(wirePathB);
	const pointsOfBWithoutStartingPoint = pointsOfB.slice(1);
	const intersectionPoints = findPointsOfIntersection(
		pointsOfAWithoutStartingPoint,
		pointsOfBWithoutStartingPoint);
	return intersectionPoints;
};

const findPointsOnPath = instructions => {
	const origin = { x:0, y:0, distanceTravelled: 0, };
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
		const newPoint = JSON.parse(JSON.stringify(currentPoint()));
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
		newPoint.distanceTravelled = newPoint.distanceTravelled + 1;
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
	const pointBIntersectionIndex = pointInA => {
		const indexOfIntersection =  pointsB.findIndex(pointInB => {
			const sameX = pointInA.x === pointInB.x;
			const sameY = pointInA.y === pointInB.y;
			return sameX && sameY;
		});
		return indexOfIntersection;
	};

	const intersectionPoints = [];

	pointsA.forEach(pointInA => {
		const indexOfB = pointBIntersectionIndex(pointInA);
		if (indexOfB !== -1) {
			const totalDistanceTravelled =
				pointInA.distanceTravelled +
				pointsB[indexOfB].distanceTravelled;
			intersectionPoints.push(
				{
					x: pointInA.x,
					y: pointInA.y,
					totalDistanceTravelled,
				 }
			);
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

const findPointWithLeastTravelDistance = intersectionPoints => {
	const sortedIntersectionPoints = intersectionPoints.sort(
		(a, b) =>  a.totalDistanceTravelled - b.totalDistanceTravelled
	);
	return sortedIntersectionPoints[0];
};

const manhattenDistance = point => Math.abs(point.x) + Math.abs(point.y);

module.exports = {
	findWireIntersectionClosestToOrigin,
	findWireIntersectionWithLeastDistanceTravelled,
};