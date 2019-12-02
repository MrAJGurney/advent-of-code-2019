const fs = require('fs');
const path = require('path');

const calculateFirstPuzzleSolution = () => {
	const inputFile = 'input.txt';
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const massesAsText = fileContents.trim().split('\n');
	const massesAsNumbers = massesAsText.map(mass => parseInt(mass));
	const totalFuel =calculateTotalFuelForMasses(massesAsNumbers);
	return totalFuel;
};

const calculateTotalFuelForMasses = masses => {
	const fuels = masses.map(mass => calculateFuelRequiredForMass(mass));
	const totalFuel = fuels.reduce((accumulator, currentFuel) => {
		return accumulator + currentFuel;
	}, 0);
	return totalFuel;
};

const calculateFuelRequiredForMass = mass => {
	let fuelRequired = mass;

	fuelRequired = fuelRequired / 3;
	fuelRequired = Math.floor(fuelRequired);
	fuelRequired = fuelRequired - 2;

	return fuelRequired;
};

module.exports = {
	calculateFirstPuzzleSolution,
	calculateTotalFuelForMasses,
	calculateFuelRequiredForMass,
};