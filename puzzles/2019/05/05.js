'use strict';

const {
	runDiagnostics,
} = require('./intcode-terminal');
const {
	buildTerminalInputProvider,
	buildTerminalOutputHandler,
} = require('./terminal-interactions');
const {
	readIntcodeFromFile,
} = require('./file-interactions');

const solveFirstChallenge = async () => {
	const startState = readIntcodeFromFile();
	const inputId = 2;

	const {
		handleTerminalOutput,
		getDiagnosticCode,
	} = buildTerminalOutputHandler();
	const terminalInputProvider = buildTerminalInputProvider(inputId);

	await runDiagnostics(
		startState,
		terminalInputProvider,
		handleTerminalOutput
	);
	return getDiagnosticCode();
};

const solveSecondChallenge = async () => {
	const startState = readIntcodeFromFile();
	const inputId = 5;

	const {
		handleTerminalOutput,
		getDiagnosticCode,
	} = buildTerminalOutputHandler();
	const terminalInputProvider = buildTerminalInputProvider(inputId);

	await runDiagnostics(
		startState,
		terminalInputProvider,
		handleTerminalOutput
	);
	return getDiagnosticCode();
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};