const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const {
	runDiagnostics,
} = require('./intcode-terminal');

const solveFirstChallenge = async () => {
	const startState = readIntcodeFromFile();
	const {
		handleTerminalOutput,
		getDiagnosticCode,
	} = buildTerminalOutputHandler();
	await runDiagnostics(
		startState,
		requestTerminalInput,
		handleTerminalOutput
	);
	return getDiagnosticCode();
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

const buildTerminalOutputHandler = () => {
	const outputStore = [];

	const handleTerminalOutput = outputValue => {
		outputStore.push(outputValue);
	};

	const getDiagnosticCode = () => {
		return outputStore[outputStore.length - 1];
	};

	return {
		handleTerminalOutput,
		getDiagnosticCode,
	};
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};