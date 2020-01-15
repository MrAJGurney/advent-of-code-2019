'use strict';

const { buildVacuumRobot, } = require('./vacuum-robot');

const mockIntcodeComputer = {};

const mockScaffoldMapper = {};

describe('vacuumRobot', () => {
	describe('properties', () => {
		const properties = [
			['intcodeComputer', mockIntcodeComputer,],
			['scaffoldMapper', mockScaffoldMapper,],
		];

		describe.each(properties)('%s', (name, initialValue) => {
			it('exists', () => {
				const vacuumRobot =
					buildVacuumRobot(mockIntcodeComputer, mockScaffoldMapper);
				expect(vacuumRobot).toHaveProperty(name);
			});
			it('has expected value', () => {
				const vacuumRobot =
					buildVacuumRobot(mockIntcodeComputer, mockScaffoldMapper);
				expect(vacuumRobot[name]).toStrictEqual(initialValue);
			});
		  });
	});

	describe('traverseScaffolds', () => {
		it.todo('traverses scaffold');
	});

	describe('findNaivePathOverScaffold', () => {
		it.todo('finds naive path over scaffold');
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