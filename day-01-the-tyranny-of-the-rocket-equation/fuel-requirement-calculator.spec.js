const {
	calculateFuelRequiredForMass,
} = require('./fuel-requirement-calculator.js');

const massToFuel = [
	[12, 2,],
	[14, 2,],
	[1969, 654,],
	[100756, 33583,],
];
describe('calculateFuelRequiredForMass', () => {
	describe.each(massToFuel)('when the mass is %i', (mass, expectedFuel) => {
		it(`returns a fuel of ${expectedFuel}`, () => {
			const fuel = calculateFuelRequiredForMass(mass);

			expect(fuel).toBe(expectedFuel);
		});
	});
});