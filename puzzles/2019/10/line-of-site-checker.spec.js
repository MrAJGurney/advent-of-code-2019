'use strict';

const {
	findMostAsteroidsVisible,
	asteroidsVisible,
	rowsAndColumnsToXAndY,
} = require('./line-of-site-checker');

describe('asteroidsVisible', () => {
	const mapMock = [
		'.#..#'.split(''),
		'.....'.split(''),
		'#####'.split(''),
		'....#'.split(''),
		'...##'.split(''),
	];

	const mapOfExpectedVisibleAsteroids = [
		'.7..7'.split('').map(arg => parseInt(arg)),
		'.....'.split('').map(arg => parseInt(arg)),
		'67775'.split('').map(arg => parseInt(arg)),
		'....7'.split('').map(arg => parseInt(arg)),
		'...87'.split('').map(arg => parseInt(arg)),
	];

	const iterationPlaceholder = [0,1,2,3,4,];

	describe.each(iterationPlaceholder)(
		'for each row',
		 row => {
			describe.each(iterationPlaceholder)(
				'for each column',
				column => {
					const expectedVisibleAsteroids =
						mapOfExpectedVisibleAsteroids[row][column];

					(isNaN(expectedVisibleAsteroids) ? it.skip : it)(
						`the asteroid at (row ${row}, column: ${column}) has ` +
							`${expectedVisibleAsteroids} visible asteroids `,
						() => {
							const visibleAsteroids =
								asteroidsVisible({
									map: rowsAndColumnsToXAndY(mapMock),
									position: { x: column, y: row, },
								});
							expect(visibleAsteroids)
								.toEqual(expectedVisibleAsteroids);
						});
				});
		});
});

describe('findMostAsteroidsVisible', () => {
	const mapsWithMax = [
		{
			map: [
				'......#.#.'.split(''),
				'#..#.#....'.split(''),
				'..#######.'.split(''),
				'.#.#.###..'.split(''),
				'.#..#.....'.split(''),
				'..#....#.#'.split(''),
				'#..#....#.'.split(''),
				'.##.#..###'.split(''),
				'##...#..#.'.split(''),
				'.#....####'.split(''),
			],
			expectedMax: 33,
			positionOfMax: { x:5, y:8, },
			////////////////////////////////////////////////////
		//// },
			////////////////////////////////////////////////////
		}, {
			map:[
				'#.#...#.#.'.split(''),
				'.###....#.'.split(''),
				'.#....#...'.split(''),
				'##.#.#.#.#'.split(''),
				'....#.#.#.'.split(''),
				'.##..###.#'.split(''),
				'..#...##..'.split(''),
				'..##....##'.split(''),
				'......#...'.split(''),
				'.####.###.'.split(''),
			],
			expectedMax: 35,
			positionOfMax: { x:1, y:2, },
		}, {
			map: [
				'.#..#..###'.split(''),
				'####.###.#'.split(''),
				'....###.#.'.split(''),
				'..###.##.#'.split(''),
				'##.##.#.#.'.split(''),
				'....###..#'.split(''),
				'..#.#..#.#'.split(''),
				'#..#.#.###'.split(''),
				'.##...##.#'.split(''),
				'.....#.#..'.split(''),
			],
			expectedMax: 41,
			positionOfMax: { x:6, y:3, },
		}, {
			map: [
				'.#..##.###...#######'.split(''),
				'##.############..##.'.split(''),
				'.#.######.########.#'.split(''),
				'.###.#######.####.#.'.split(''),
				'#####.##.#.##.###.##'.split(''),
				'..#####..#.#########'.split(''),
				'####################'.split(''),
				'#.####....###.#.#.##'.split(''),
				'##.#################'.split(''),
				'#####.##.###..####..'.split(''),
				'..######..##.#######'.split(''),
				'####.##.####...##..#'.split(''),
				'.#####..#.######.###'.split(''),
				'##...#.##########...'.split(''),
				'#.##########.#######'.split(''),
				'.####.#.###.###.#.##'.split(''),
				'....##.##.###..#####'.split(''),
				'.#.#.###########.###'.split(''),
				'#.#.#.#####.####.###'.split(''),
				'###.##.####.##.#..##'.split(''),
			],
			expectedMax: 210,
			positionOfMax: { x:11, y:13, },
		},
	];

	describe.each(mapsWithMax)(
		'for each map',
		({ map, expectedMax, positionOfMax, }) => {
			it('the value at max position is calculated correctly', () => {
				const visibleAsteroidsAtMaximumPosition = asteroidsVisible({
					map: rowsAndColumnsToXAndY(map),
					position: positionOfMax,
				});
				expect(visibleAsteroidsAtMaximumPosition)
					.toEqual(expectedMax);
			});

			it('the expected max is found', () => {
				const mostAsteroidsVisible = findMostAsteroidsVisible(
					{ map: rowsAndColumnsToXAndY(map), }
				);
				expect(mostAsteroidsVisible).toEqual(expectedMax);
			});
		});
});