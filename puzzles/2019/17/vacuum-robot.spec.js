'use strict';

const { buildVacuumRobot, } = require('./vacuum-robot');

describe('vacuumRobot', () => {

	const scaffoldMapsWithDeterminedProperties = [
		{
			scaffolds: [
				['#', '.', ],
				['#', '<', ],
			],
			robot: {
				position: { x: 1, y: 1, },
				orientation: { x: -1, y:0, },
				nextTileIsScaffold: true,
			},
		},
		{
			scaffolds: [
				['.', '.', '#', '.', ],
				['#', '#', '#', 'v', ],
				['#', '.', '#', '.', ],
				['#', '#', '#', '.', ],
			],
			robot: {
				position: { x: 3, y: 1, },
				orientation: { x: 0, y:1, },
				nextTileIsScaffold: false,
			},
		},
		{
			scaffolds: [
				['#', '.', '#', '#', '#', ],
				['#', '.', '#', '.', '#', ],
				['#', '#', '#', '#', '#', ],
				['.', '.', '#', '.', '.', ],
				['#', '#', '#', '#', '#', ],
				['#', '.', '#', '.', '#', ],
				['#', '#', '#', '.', '>', ],
			],
			robot: {
				position: { x: 4, y: 6, },
				orientation: { x: 1, y:0, },
				nextTileIsScaffold: false,
			},
		},
	];

	let mockIntcodeComputer;
	let mockScaffoldMapper;

	beforeEach(() => {
		mockIntcodeComputer = {};

		mockScaffoldMapper = {
			mapScaffolds: () => {},
		};
	});

	describe('traverseScaffolds', () => {
		it.todo('traverses scaffold');
	});

	describe.skip('findNaivePathOverScaffold', () => {
		it.todo('finds naive path over scaffold');
	});

	describe('findRobotPositionAndOrientation', () => {
		it.each(
			scaffoldMapsWithDeterminedProperties
		)(
			'finds robot position and orientation',
			({ scaffolds, robot: { position, orientation, }, }) => {
				mockScaffoldMapper.scaffolds = scaffolds;
				const vacuumRobot =
					buildVacuumRobot(mockIntcodeComputer, mockScaffoldMapper);

				vacuumRobot.findRobotPositionAndOrientation();

				expect(vacuumRobot.position).toStrictEqual(position);
				expect(vacuumRobot.orientation).toStrictEqual(orientation);
			}
		);
	});

	describe('isNextTileScaffold', () => {
		it.each(
			scaffoldMapsWithDeterminedProperties
		)(
			'determines if next tile is scaffold',
			({
				scaffolds,
				robot: { position, orientation, nextTileIsScaffold, },
			 }) => {
				mockScaffoldMapper.scaffolds = scaffolds;
				const vacuumRobot =
					buildVacuumRobot(mockIntcodeComputer, mockScaffoldMapper);

				vacuumRobot.orientation = orientation;
				vacuumRobot.position = position;

				expect(vacuumRobot.isNextTileScaffold())
					.toStrictEqual(nextTileIsScaffold);
			}
		);
	});

	describe('rotateRobot', () => {
		const offsetFromOrientation = {
			up: { x:0, y:-1, },
			down: { x:0, y:1, },
			right: { x:1, y:0, },
			left: { x:-1, y:0, },
		};

		it('can rotate robot left', () => {
			const vacuumRobot =
				buildVacuumRobot(mockIntcodeComputer, mockScaffoldMapper);

			vacuumRobot.orientation = offsetFromOrientation.up;
			vacuumRobot.rotateRobot('L');

			expect(vacuumRobot.orientation)
				.toStrictEqual(offsetFromOrientation.left);
		});

		it('can rotate robot right', () => {
			const vacuumRobot =
				buildVacuumRobot(mockIntcodeComputer, mockScaffoldMapper);

			vacuumRobot.orientation = offsetFromOrientation.right;
			vacuumRobot.rotateRobot('R');

			expect(vacuumRobot.orientation)
				.toStrictEqual(offsetFromOrientation.down);
		});
	});

	describe('breakdownPath', () => {
		it.todo('breaks down path');
	});

	describe('followPath', () => {
		it.todo('follows path');
	});

	describe('getDustCollected', () => {
		it.todo('gets dust collected');
	});
});