'use strict';

const passwordLength = 6;

const getValidPasswordCount = (min, max) => {
	if (splitDigits(min) < passwordLength ||
		splitDigits(max) > passwordLength) {
		throw new Error('Unexpected minimum password length');
	}

	const passwords = getPasswordsWithAscendingDigitsInRange(min, max);
	const validPasswords = getPasswordsWithAdjacentSameDigits(passwords);
	return validPasswords.length;
};

const getValidPasswordCountWithAdditionalRule = (min, max) => {
	if (splitDigits(min) < passwordLength ||
		splitDigits(max) > passwordLength) {
		throw new Error('Unexpected minimum password length');
	}

	const passwords = getPasswordsWithAscendingDigitsInRange(min, max);
	const validPasswords = getPasswordsWithLimitedAdjacentSameDigits(passwords);
	return validPasswords.length;
};

const getPasswordsWithAscendingDigitsInRange = (min, max) => {
	const minDigits = splitDigits(min);
	const maxDigits = splitDigits(max);

	const passwords = [];

	for (let i0 = minDigits[0]; i0 <= maxDigits[0]; i0++) {
		for (let i1 = i0; i1 <= 9; i1++) {
			for (let i2 = i1; i2 <= 9; i2++) {
				for (let i3 = i2; i3 <= 9; i3++) {
					for (let i4 = i3; i4 <= 9; i4++) {
						for (let i5 = i4; i5 <= 9; i5++) {
							const password =
								i0 * getMagnitudeFromIndex(0) +
								i1 * getMagnitudeFromIndex(1) +
								i2 * getMagnitudeFromIndex(2) +
								i3 * getMagnitudeFromIndex(3) +
								i4 * getMagnitudeFromIndex(4) +
								i5 * getMagnitudeFromIndex(5);
							if (password >= min && password <= max)
							{
								passwords.push(password);
							}
						}
					}
				}
			}
		}
	}
	return passwords;
};

const getPasswordsWithAdjacentSameDigits = passwords => {
	return passwords.filter(password => {
		const passwordDigits = splitDigits(password);
		for (i = 0; i < passwordDigits.length - 1; i++) {
			if (passwordDigits[i] === passwordDigits[i + 1]){
				return true;
			}
		}
		return false;
	});
};

const getPasswordsWithLimitedAdjacentSameDigits = passwords => {
	return passwords.filter(password => {
		const passwordDigits = splitDigits(password);
		for (i = 0; i < passwordDigits.length - 1; i++) {
			if (passwordDigits[i] === passwordDigits[i + 1]){
				if (passwordDigits[i] !== passwordDigits[i -1] &&
					passwordDigits[i + 1] !== passwordDigits[i + 2]){
					return true;
				}
			}
		}
		return false;
	});
};

const splitDigits = number => {
	const radix = 10;
	return [...number.toString(radix),].map(x => parseInt(x));
};

const getMagnitudeFromIndex = index =>
	Math.pow(10, (passwordLength - (index + 1)));

module.exports = {
	getValidPasswordCount,
	getValidPasswordCountWithAdditionalRule,
};