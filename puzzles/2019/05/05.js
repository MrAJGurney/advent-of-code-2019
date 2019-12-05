const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const {
	runDiagnostics,
} = require('./intcode-terminal');

const solveFirstChallenge = async () => {
	const startState = readIntcodeFromFile();
	const diagnosticCode = runDiagnostics(
		startState,
		requestTerminalInput,
		handleTerminalOutput
	);
	return diagnosticCode;
};

const solveSecondChallenge = () => {};

const readIntcodeFromFile = () => {
	const inputFile = 'input.txt';
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const intcodeAsText = fileContents.trim().split(',');
	const intcodeAsNumbers = intcodeAsText.map(mass => parseInt(mass));
	return intcodeAsNumbers;
};

const requestTerminalInput = async inputName => {
	const { terminalInput, } =  await inquirer
	  .prompt([
		  {
			  name: 'terminalInput',
			  type: 'number',
			  message: `Please enter ${inputName}:`,
			},

	  ]);
	return terminalInput;
};

const handleTerminalOutput = outputValue => {
	/* eslint-disable-next-line no-console */
	console.log(outputValue);
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};