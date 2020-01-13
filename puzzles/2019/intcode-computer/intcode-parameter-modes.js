'use strict';

const buildGetReadValue = (
	self,
	parameterModeCodes
) => (
	parameter,
	parameterMode
) => {
	const {
		software,
		relativeBase,
	} = self;

	if (parameterMode === parameterModeCodes.position) {
		const readValue = software[BigInt(parameter)];
		return typeof readValue === 'string' ? readValue : '0';
	}

	if (parameterMode === parameterModeCodes.immediate) {
		const readValue = parameter;
		return typeof readValue === 'string' ? readValue : '0';
	}

	if (parameterMode === parameterModeCodes.relative) {
		const readValue = software[BigInt(relativeBase) + BigInt(parameter)];
		return typeof readValue === 'string' ? readValue : '0';
	}

	throw new Error('Unhandled read parameter mode code');
};

const buildGetWritePosition = (
	self,
	parameterModeCodes
) => (
	parameter,
	parameterMode
) => {
	const {
		relativeBase,
	} = self;

	if (parameterMode === parameterModeCodes.position) {
		const writePosition = parameter;
		return typeof writePosition === 'string' ? writePosition : '0';
	}

	if (parameterMode === parameterModeCodes.immediate) {
		throw new Error('Write parameters may not be in immediate mode');
	}

	if (parameterMode === parameterModeCodes.relative) {
		const writePosition =
			(BigInt(relativeBase) + BigInt(parameter)).toString();
		return typeof writePosition === 'string' ? writePosition : '0';
	}

	throw new Error('Unhandled write parameter mode code');
};

module.exports = {
	buildGetReadValue,
	buildGetWritePosition,
};