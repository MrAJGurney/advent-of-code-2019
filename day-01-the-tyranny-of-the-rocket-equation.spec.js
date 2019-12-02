const {
	calculateFuelRequired,
} = require('./day-01-the-tyranny-of-the-rocket-equation.js',);

const massToFuel = [
	[12, 2,],
	[14, 2,],
	[1969, 654,],
	[100756, 33583,],
];
describe('calculateFuelRequired', () => {
	describe.each(massToFuel,)('when the mass is %i', (mass, expectedFuel,) => {
		it(`returns a fuel of ${expectedFuel}`, () => {
			const fuel = calculateFuelRequired(mass,);

			expect(fuel,).toBe(expectedFuel,);
		},);
	},);
},);