const { buildScaffoldMapper, } = require('./scaffold-mapper');

const intcodeOutput = [
	'35', '35', '35', '46', '35', '10',
	'35', '46', '35', '46', '35', '10',
	'35', '35', '35', '35', '35', '10',
	'46', '46', '35', '46', '46', '10',
	'35', '35', '35', '60', '35', '10',
	'35', '46', '35', '46', '35', '10',
	'35', '35', '35', '46', '35', '10',
];

const scaffolds = [
	['#', '#', '#', '.', '#',],
	['#', '.', '#', '.', '#',],
	['#', '#', '#', '#', '#',],
	['.', '.', '#', '.', '.',],
	['#', '#', '#', '<', '#',],
	['#', '.', '#', '.', '#',],
	['#', '#', '#', '.', '#',],
];

const intersections = [{ x:2,y:2, }, { x:2, y:4, },];

const alignmentParameters = [4, 8,];

const mockIntcodeComputer = {
	outputHeap: intcodeOutput,
	runUntil: () => {},
};

describe('scaffoldMapper', () => {
	describe('properties', () => {
		const properties = [
			['intcodeComputer',mockIntcodeComputer,],
			['scaffolds',[],],
		];

		describe.each(properties)('%s', (name, initialValue) => {
			it('exists', () => {
				const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
				expect(scaffoldMapper).toHaveProperty(name);
			});
			it('has expected value', () => {
				const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
				expect(scaffoldMapper[name]).toStrictEqual(initialValue);
			});
		  });
	});

	describe('getAlignmentParameters', () => {
		it('exists', () => {
			const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
			expect(scaffoldMapper).toHaveProperty('getAlignmentParameters');
		});
		it('is a function', () => {
			const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
			expect(typeof scaffoldMapper.getAlignmentParameters)
				.toStrictEqual('function');
		});
		it('returns the sum of alignment parameters', () => {
			const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
			expect(scaffoldMapper.getAlignmentParameters())
				.toStrictEqual(alignmentParameters);
		});
	});

	describe('mapScaffolds', () => {
		it('exists', () => {
			const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
			expect(scaffoldMapper).toHaveProperty('mapScaffolds');
		});
		it('is a function', () => {
			const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
			expect(typeof scaffoldMapper.mapScaffolds)
				.toStrictEqual('function');
		});
		it('stores intcode output as scaffolds', () => {

			const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
			scaffoldMapper.mapScaffolds();

			expect(scaffoldMapper.scaffolds).toStrictEqual(scaffolds);
		});
	});

	describe('findAllScaffoldIntersections', () => {
		it('exists', () => {
			const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
			expect(scaffoldMapper)
				.toHaveProperty('findAllScaffoldIntersections');
		});
		it('is a function', () => {
			const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
			expect(typeof scaffoldMapper.findAllScaffoldIntersections)
				.toStrictEqual('function');
		});
		it('returns expected number of intersections', () => {
			const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
			scaffoldMapper.scaffolds = scaffolds;
			const foundIntersections =
				scaffoldMapper.findAllScaffoldIntersections();

			expect(foundIntersections)
				.toHaveLength(intersections.length);

		});
		it.each(intersections)(
			'returns intersection',
			expectedIntersection => {
				const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
				scaffoldMapper.scaffolds = scaffolds;
				const foundIntersections =
					scaffoldMapper.findAllScaffoldIntersections();
				expect(foundIntersections.findIndex(intersection =>
					expectedIntersection.x === intersection.x &&
					expectedIntersection.y === intersection.y))
					.not.toBe(-1);
			}
		);
	});
});