const { buildScaffoldMapper, } = require('./scaffold-mapper');

const mockOutput = [
	'46', '46', '35', '46', '46', '10',
	'35', '35', '35', '35', '35', '10',
	'35', '46', '35', '46', '35', '10',
	'35', '35', '35', '46', '94', '10',
];

const mockIntcodeComputer = {
	outputHeap: mockOutput,
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
		it('maps intcode output to scaffold', () => {
			const expectedScaffolds = [
				['.', '.', '#', '.', '.',],
				['#', '#', '#', '#', '#',],
				['#', '.', '#', '.', '#',],
				['#', '#', '#', '.', '^',],
			];

			const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
			scaffoldMapper.mapScaffolds();

			expect(scaffoldMapper.scaffolds).toStrictEqual(expectedScaffolds);
		});
	});
});