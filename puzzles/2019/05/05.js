const {
	runDiagnostics,
} = require('./intcode-terminal');
const {
	requestTerminalInput,
	buildTerminalOutputHandler,
} = require('./terminal-interactions');
const {
	readIntcodeFromFile,
} = require('./file-interactions');

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

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};