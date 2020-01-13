'use strict';

const fs = require('fs');
const path = require('path');
const {
	computeFinalState,
} = require('./intcode-runner');

const solveFirstChallenge = () => {
	const startState = readIntcodeFromFile();
	startState[1] = 12;
	startState[2] = 2;
	const endState = computeFinalState(startState);
	return endState[0];
};

const solveSecondChallenge = () => {
	const targetOutput = 19690720;

	while (true) {
		const startState = readIntcodeFromFile();
		for (let noun = 0; noun < 99; noun++) {
			for (let verb = 0; verb < 99; verb++) {
				startState[1] = noun;
				startState[2] = verb;
				const endState = computeFinalState(startState);
				if (endState[0] === targetOutput)
					return (100 * noun) + verb;
			}
		}
		throw new Error('Combination not found');
	}

};

const readIntcodeFromFile = () => {
	const inputFile = 'input.txt';
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const intcodeAsText = fileContents.trim().split(',');
	const intcodeAsNumbers = intcodeAsText.map(mass => parseInt(mass));
	return intcodeAsNumbers;
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};