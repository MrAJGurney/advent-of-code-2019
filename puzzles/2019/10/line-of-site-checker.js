const MAP_KEY = {
	ASTEROID: '#',
	EMPTY: '.',
};

const findMostAsteroidsVisible = ({ map, }) => {
	let mostAsteroidsVisible = 0;
	for (let x = 0; x < map.length; x++) {
		for (let y = 0; y < map[x].length; y++) {
			if (map[x][y] === MAP_KEY.ASTEROID) {
				mostAsteroidsVisible = Math.max(
					mostAsteroidsVisible,
					asteroidsVisible({ map, position: { x, y, }, })
				);
			};
		}
	}
	return mostAsteroidsVisible;
};

const asteroidsVisible = ({ map, position, }) => {
	let visibleAsteroids = 0;
	const ratiosFound = {};

	for (let x = 0; x < map.length; x++) {
		for (let y = 0; y < map[x].length; y++) {
			if (x === position.x && y === position.y) {
				continue;
			}

			if (map[x][y] !== MAP_KEY.ASTEROID) {
				continue;
			}

			const offsetPosition = getXAndYOffsets({
				sourcePosition: position,
				offsetPosition: { x, y, },
			});
			const ratio = getXAndYRatio(offsetPosition);
			const ratiosFoundKey = buildRatiosFoundKey(ratio);

			if (ratiosFound[ratiosFoundKey]) {
				continue;
			}

			visibleAsteroids++;
			ratiosFound[ratiosFoundKey] = true;
		}
	}

	return visibleAsteroids;
};

const rowsAndColumnsToXAndY = mapWithRowsAndColumns => {
	const mapWithCoordinates = [];

	for (
		let rowIndex = 0;
		rowIndex < mapWithRowsAndColumns.length;
		rowIndex++
	) {
		for (
			let columnIndex = 0;
			columnIndex < mapWithRowsAndColumns[rowIndex].length;
			columnIndex++
		) {
			const x = columnIndex;

			if (x >= mapWithCoordinates.length) {
				mapWithCoordinates.push([]);
			}

			mapWithCoordinates[x].push(
				mapWithRowsAndColumns[rowIndex][columnIndex]
			);
		}
	}

	return mapWithCoordinates;
};

const buildRatiosFoundKey = ({ x, y, }) => `(${x}, ${y})`;

const getXAndYOffsets = ({ sourcePosition, offsetPosition, }) => {
	return {
		x: offsetPosition.x - sourcePosition.x,
		y: offsetPosition.y - sourcePosition.y,
	};
};

const getXAndYRatio = ({ x, y, }) => {
	let minX = x;
	let minY = y;

	if (minX === 0 && minY === 0) {
		return { x:0, y:0, };
	}

	if (minX === 0) {
		return { x:0, y:(y > 0 ? 1 : -1), };
	}

	if (minY === 0) {
		return { x:(x > 0 ? 1 : -1), y:0, };
	}

	for (
		let divisor = 2;
		divisor <= Math.min(Math.abs(minX), Math.abs(minY));
		divisor++) {
		while (
			Math.abs(divisor) !== 1 &&
			Math.abs(minX % divisor) === 0 &&
			Math.abs(minY % divisor) === 0
		) {
			minX /= Math.abs(divisor);
			minY /= Math.abs(divisor);
		}
	}

	return {
		x: minX,
		y: minY,
	};
};

module.exports = {
	findMostAsteroidsVisible,
	asteroidsVisible,
	rowsAndColumnsToXAndY,
};