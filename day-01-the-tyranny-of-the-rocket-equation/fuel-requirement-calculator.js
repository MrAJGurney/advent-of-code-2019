const calculateFuelRequiredForMass = mass => {
	let fuelRequired = mass;

	fuelRequired = fuelRequired / 3;
	fuelRequired = Math.floor(fuelRequired);
	fuelRequired = fuelRequired - 2;

	return fuelRequired;
};

module.exports = { calculateFuelRequiredForMass, };