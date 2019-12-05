const inquirer = require('inquirer');

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

const buildTerminalInputProvider = terminalInput => {
	return () => terminalInput;
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
	requestTerminalInput,
	buildTerminalInputProvider,
	buildTerminalOutputHandler,
};