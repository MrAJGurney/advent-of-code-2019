const {
	findWireIntersectionClosestToOrigin,
	findWireIntersectionWithLeastDistanceTravelled,
} = require('./wire-intersection-finder');

describe('findWireIntersectionClosestToOrigin', () => {
	/* eslint-disable max-len */
	const wiresWithIntersectionDistance =[
		[
			['R75','D30','R83','U83','L12','D49','R71','U7','L72',],
			['U62','R66','U55','R34','D71','R55','D58','R83',],
			159,
		],
		[
			['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51',],
			['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7',] ,
			 135,
		],
	];
	/* eslint-enable max-len */

	describe.each(wiresWithIntersectionDistance)(
		'for two wries',
		(wireA, wireB, intersectionDistance) => {
			it('returns the closest intersection distance', () => {
				const calculatedDistance =
					findWireIntersectionClosestToOrigin(wireA, wireB);
				expect(calculatedDistance).toStrictEqual(intersectionDistance);
			});
		});
});

describe('findWireIntersectionWithLeastDistanceTravelled', () => {
	/* eslint-disable max-len */
	const wiresWithIntersectionDistance =[
		[
			['R75','D30','R83','U83','L12','D49','R71','U7','L72',],
			['U62','R66','U55','R34','D71','R55','D58','R83',],
			610,
		],
		[
			['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51',],
			['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7',] ,
			 410,
		],
	];
	/* eslint-enable max-len */

	describe.each(wiresWithIntersectionDistance)(
		'for two wries',
		(wireA, wireB, intersectionDistance) => {
			it('returns the closest intersection distance', () => {
				const calculatedDistance =
					findWireIntersectionWithLeastDistanceTravelled(
						wireA,
						wireB
					);
				expect(calculatedDistance).toStrictEqual(intersectionDistance);
			});
		});
});