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

describe('day 03 (I/O, jump-if, less-than/equals, parameter modes)', () => {
	describe('input and output', () => {
		describe('has the expected output', () => {
			const states =[
				{ software: ['3','0','4','0','99', ], input: '7', expectedOutput: ['7',], },
				{ software: ['3','0','4','0','99', ], input: '42', expectedOutput: ['42',], },
				{ software: ['3','0','4','0','99', ], input: '0', expectedOutput: ['0',], },
			];

			describe.each(states)('when the computer runs', ({ software, input, expectedOutput, }) => {
				it('has the expected output', () => {
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

	describe('less-than', () => {
		describe('has the expected output', () => {
			const states =[
				// position mode - less than 8
				{ software: ['3','9','7','9','10','9','4','9','99','-1','8', ], input: '8', expectedOutput: ['0',], },
				{ software: ['3','9','7','9','10','9','4','9','99','-1','8', ], input: '4', expectedOutput: ['1',], },
				{ software: ['3','9','7','9','10','9','4','9','99','-1','8', ], input: '9', expectedOutput: ['0',], },
				// immediate mode - less than to 8
				{ software: ['3','3','1107','-1','8','3','4','3','99', ], input: '8', expectedOutput: ['0',], },
				{ software: ['3','3','1107','-1','8','3','4','3','99', ], input: '4', expectedOutput: ['1',], },
				{ software: ['3','3','1107','-1','8','3','4','3','99', ], input: '9', expectedOutput: ['0',], },
			];

			describe.each(states)('when the computer runs', ({ software, input, expectedOutput, }) => {
				it('has the expected output', () => {
					const intcodeComputer = buildIntcodeComputer(software);
					intcodeComputer.addToInputQueue(input);
					intcodeComputer.runUntil(operationCodes.halt);

					expect(intcodeComputer.outputHeap).toStrictEqual(expectedOutput);
				});
			});
		});
	});

	describe('equals', () => {
		describe('has the expected output', () => {
			const states =[
				// position mode - equal to 8
				{ software: ['3','9','8','9','10','9','4','9','99','-1','8', ], input: '8', expectedOutput: ['1',], },
				{ software: ['3','9','8','9','10','9','4','9','99','-1','8', ], input: '4', expectedOutput: ['0',], },
				{ software: ['3','9','8','9','10','9','4','9','99','-1','8', ], input: '9', expectedOutput: ['0',], },
				// immediate mode - equal to 8
				{ software: ['3','3','1108','-1','8','3','4','3','99', ], input: '8', expectedOutput: ['1',], },
				{ software: ['3','3','1108','-1','8','3','4','3','99', ], input: '4', expectedOutput: ['0',], },
				{ software: ['3','3','1108','-1','8','3','4','3','99', ], input: '9', expectedOutput: ['0',], },
			];

			describe.each(states)('when the computer runs', ({ software, input, expectedOutput, }) => {
				it('has the expected output', () => {
					const intcodeComputer = buildIntcodeComputer(software);
					intcodeComputer.addToInputQueue(input);
					intcodeComputer.runUntil(operationCodes.halt);

					expect(intcodeComputer.outputHeap).toStrictEqual(expectedOutput);
				});
			});
		});
	});

	describe('jump-if-true & jump-if-false', () => {
		describe('has the expected output', () => {
			const states =[
				{ software: ['3','12','6','12','15','1','13','14','13','4','13','99','-1','0','1','9',], input: '0', expectedOutput: ['0',], },
				{ software: ['3','12','6','12','15','1','13','14','13','4','13','99','-1','0','1','9',], input: '3', expectedOutput: ['1',], },
				{ software: ['3','12','6','12','15','1','13','14','13','4','13','99','-1','0','1','9',], input: '-2', expectedOutput: ['1',], },
				{ software: ['3','3','1105','-1','9','1101','0','0','12','4','12','99','1',], input: '0', expectedOutput: ['0',], },
				{ software: ['3','3','1105','-1','9','1101','0','0','12','4','12','99','1',], input: '3', expectedOutput: ['1',], },
				{ software: ['3','3','1105','-1','9','1101','0','0','12','4','12','99','1',], input: '-2', expectedOutput: ['1',], },
			];

			describe.each(states)('when the computer runs', ({ software, input, expectedOutput, }) => {
				it('has the expected output', () => {
					const intcodeComputer = buildIntcodeComputer(software);
					intcodeComputer.addToInputQueue(input);
					intcodeComputer.runUntil(operationCodes.halt);

					expect(intcodeComputer.outputHeap).toStrictEqual(expectedOutput);
				});
			});
		});
	});
});