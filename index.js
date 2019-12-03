const {
	_theTyrannyOfTbeRocketEquationFirst,
	_theTyrannyOfTbeRocketEquationSecond,
} = require(
	'./day-01-the-tyranny-of-the-rocket-equation/fuel-requirement-calculator.js'
);

const {
	_1202ProgramAlarmFirst,
	_1202ProgramAlarmSecond,
} = require(
	'./day-02-1202-program-alarm/intcode-runner.js'
);

const {
	_CrossedWiresAlarmFirst,
	_CrossedWiresAlarmSecond,
} = require(
	'./day-03-crossed-wires/wire-intersection-finder.js'
);

/* eslint-disable no-console */

console.log('day 01', 'part 01', '=>', _theTyrannyOfTbeRocketEquationFirst());
console.log('day 01', 'part 02', '=>', _theTyrannyOfTbeRocketEquationSecond());
console.log('day 02', 'part 01', '=>', _1202ProgramAlarmFirst());
console.log('day 02', 'part 02', '=>', _1202ProgramAlarmSecond());
console.log('day 03', 'part 01', '=>', _CrossedWiresAlarmFirst());
console.log('day 03', 'part 02', '=>', _CrossedWiresAlarmSecond());