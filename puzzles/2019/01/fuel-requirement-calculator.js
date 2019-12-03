const calculateTotalFuelForMasses = masses => {
	const fuels = masses.map(mass => calculateFuelRequiredForMass(mass));
	const totalFuel = fuels.reduce((accumulator, currentFuel) => {
		return accumulator + currentFuel;
	}, 0);
	return totalFuel;
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

const calculateFuelRequiredForMass = mass => {
	let fuelRequired = mass;

	fuelRequired = fuelRequired / 3;
	fuelRequired = Math.floor(fuelRequired);
	fuelRequired = fuelRequired - 2;

	return Math.max(fuelRequired, 0);
};

module.exports = {
	calculateTotalFuelForMasses,
	calculateTotalFuelForMassesAndFuel,
	calculateTotalFuelForMassAndFuel,
	calculateFuelRequiredForMass,
};