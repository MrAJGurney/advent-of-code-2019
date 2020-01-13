'use strict';

const fs = require('fs');
const path = require('path');
const {
	calculateTotalFuelForMasses,
	calculateTotalFuelForMassesAndFuel,
} = require('./fuel-requirement-calculator');

const solveFirstChallenge = () => {
	const masses = readMassesFromFile();
	const totalFuel = calculateTotalFuelForMasses(masses);
	return totalFuel;
};

const solveSecondChallenge = () => {
	const masses = readMassesFromFile();
	const totalFuel = calculateTotalFuelForMassesAndFuel(masses);
	return totalFuel;
};

const readMassesFromFile = () => {
	const inputFile = 'input.txt';
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const massesAsText = fileContents.trim().split('\n');
	const massesAsNumbers = massesAsText.map(mass => parseInt(mass));
	return massesAsNumbers;
};

module.exports = {
	'1': solveFirstChallenge,
	'2': solveSecondChallenge,
};