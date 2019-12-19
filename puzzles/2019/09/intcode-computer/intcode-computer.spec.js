/* eslint-disable max-len */

const { buildIntcodeComputer, } = require('./intcode-computer');
const { operationCodes, } = require('./operation-codes');

describe('day 02 (initial implementation)', () => {
	describe('reaches the correct final state given an initial state', () => {
		const scenarios =[
			{ software: ['1','0','0','0','99',], endState: ['2','0','0','0','99',], },
			{ software: ['2','3','0','3','99',], endState: ['2','3','0','6','99',], },
			{ software: ['2','4','4','5','99','0',], endState: ['2','4','4','5','99','9801',], },
			{ software: ['1','1','1','4','99','5','6','0','99',], endState: ['30','1','1','4','2','5','6','0','99',], },
		];

		describe.each(scenarios)('when the computer runs', ({ software, endState, }) => {
			it('ends at the expected end state', () => {
				const intcodeComputer = buildIntcodeComputer(software);
				intcodeComputer.runUntil(operationCodes.halt);

				expect(intcodeComputer.software).toStrictEqual(endState);
			});
		});
	});
});

describe('day 03 (I/O, jump-if, less-than/Equals, parameter modes)', () => {
	describe('input and output', () => {
		describe('has the expected output', () => {
			const states =[
				{ software: ['3','0','4','0','99', ], input: '7', expectedOutput: ['7',], },
				{ software: ['3','0','4','0','99', ], input: '42', expectedOutput: ['42',], },
				{ software: ['3','0','4','0','99', ], input: '0', expectedOutput: ['0',], },
			];

			describe.each(states)('when the computer runs', ({ software, input, expectedOutput, }) => {
				it('ends at the expected end state', () => {
					const intcodeComputer = buildIntcodeComputer(software);
					intcodeComputer.addToInputQueue(input);
					intcodeComputer.runUntil(operationCodes.halt);

					expect(intcodeComputer.outputHeap).toStrictEqual(expectedOutput);
				});
			});
		});
	});

	describe('parameter modes', () => {
		const software = ['1002','4','3','4','33', ];
		const expected = { value: '99', address:'4', };

		it('stores the expected value in the expected location', () => {
			const intcodeComputer = buildIntcodeComputer(software);
			intcodeComputer.runUntil(operationCodes.halt);
			expect(intcodeComputer.software[expected.address]).toStrictEqual(expected.value);
		});
	});
});