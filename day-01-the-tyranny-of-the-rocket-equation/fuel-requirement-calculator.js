const fs = require('fs');
const path = require('path');

const calculateSecondPuzzleSolution =() => {
	const masses = readMassesFromFile();
	const totalFuel = calculateTotalFuelForMassesAndFuel(masses);
	return totalFuel;
};

const calculateFirstPuzzleSolution = () => {
	const masses = readMassesFromFile();
	const totalFuel = calculateTotalFuelForMasses(masses);
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

const calculateTotalFuelForMassesAndFuel = masses => {
	const fuels = masses.map(
		mass => {
			const fuelForModule = calculateFuelRequiredForMass(mass);
			const fuelForFuel = calculateTotalFuelForMassAndFuel(fuelForModule);
			return fuelForModule + fuelForFuel;
		});
	const totalFuel = fuels.reduce((accumulator, currentFuel) => {
		return accumulator + currentFuel;
	}, 0);
	return totalFuel;
};

const calculateTotalFuelForMassAndFuel = initialFuel => {
	const newFuelRequired = calculateFuelRequiredForMass(initialFuel);
	const moreFuelNeeded = newFuelRequired > 0;
	const moreFuel = moreFuelNeeded ?
		calculateTotalFuelForMassAndFuel(newFuelRequired) :
		 0;
	const totalFuel = newFuelRequired + moreFuel;
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

	return Math.max(fuelRequired, 0);
};

module.exports = {
	calculateSecondPuzzleSolution,
	calculateFirstPuzzleSolution,
	calculateTotalFuelForMasses,
	calculateTotalFuelForMassAndFuel,
	calculateFuelRequiredForMass,
};