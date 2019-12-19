/* eslint-disable max-len */

const {
	opcodes,
} = require('./opcodes');

const {
	buildIntcodeComputer,
} = require('./intcode-computer');

describe('day 02 (initial implementation)', () => {
	describe('reaches the correct final state given an initial state', () => {
		const states =[
			{ startState: [1,0,0,0,99,], endState: [2,0,0,0,99,], },
			{ startState: [2,3,0,3,99,], endState: [2,3,0,6,99,], },
			{ startState: [2,4,4,5,99,0,], endState: [2,4,4,5,99,9801,], },
			{ startState: [1,1,1,4,99,5,6,0,99,], endState: [30,1,1,4,2,5,6,0,99,], },
		];

		describe.each(states)('when run with an initial state', ({ startState, endState, }) => {
			it('ends at the expected end state', () => {
				const stringedStartState = startState.map(x => x.toString());
				const stringedEndState = endState.map(x => x.toString());

				const intcodeComputer = buildIntcodeComputer(stringedStartState);
				intcodeComputer.runUntil(opcodes.halt);

				expect(intcodeComputer.software).toStrictEqual(stringedEndState);
			});
		});
	});
});