const {
	calculateTotalFuelForMasses,
	calculateFuelRequiredForMass,
} = require('./fuel-requirement-calculator.js');

describe('calculateTotalFuelForMasses', () => {
	const masses = [12,14,  1969,];
	const totalFuel = 658;
	describe('when given a collection of masses', () => {
		it('returns the expected total fuel', () => {
			const calculatedTotalFuel = calculateTotalFuelForMasses(masses);
			expect(calculatedTotalFuel).toBe(totalFuel);
		});
	});
});

describe('calculateFuelRequiredForMass', () => {
	const massToFuel = [
		[12, 2,],
		[14, 2,],
		[1969, 654,],
		[100756, 33583,],
	];
	describe.each(massToFuel)('when the mass is %i', (mass, expectedFuel) => {
		it(`returns a fuel of ${expectedFuel}`, () => {
			const fuel = calculateFuelRequiredForMass(mass);
			expect(fuel).toBe(expectedFuel);
		});
	});
});