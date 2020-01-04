const { buildScaffoldMapper, } = require('./scaffold-mapper');

const mockIntcodeComputer = {};

describe('scaffoldMapper', () => {
	describe('intcode computer', () => {
		it('exists', () => {
			const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
			expect(scaffoldMapper).toHaveProperty('intcodeComputer');
		});
		it('is the computer that is used to initialise', () => {
			const scaffoldMapper = buildScaffoldMapper(mockIntcodeComputer);
			expect(scaffoldMapper.intcodeComputer).toBe(mockIntcodeComputer);
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
});