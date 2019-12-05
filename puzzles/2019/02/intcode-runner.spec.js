const {
	computeFinalState,
} = require('./intcode-runner');

describe('computeFinalState', () => {
	const states =[
		[[1,0,0,0,99,], [2,0,0,0,99,],],
		[[2,3,0,3,99,], [2,3,0,6,99,],],
		[[2,4,4,5,99,0,], [2,4,4,5,99,9801,],],
		[[1,1,1,4,99,5,6,0,99,], [30,1,1,4,2,5,6,0,99,],],
	];

	describe.each(states)('for a start sate', (startState, endState) => {
		it('returns the expected end state', () => {
			const computedState = computeFinalState(startState);
			expect(computedState).toStrictEqual(endState);
		});
	});
});