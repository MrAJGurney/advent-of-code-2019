'use strict';

const fs = require('fs');
const path = require('path');

const readOrbitalRelationshipsFromFile = () => {
	const inputFile = 'input.txt';
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	const orbitalRelationshipsAsText = fileContents.trim().split('\n');
	const orbitalRelationships =
		orbitalRelationshipsAsText.map(relationship => {
			return relationship.split(')');
		});
	return orbitalRelationships;
};

module.exports = {
	readOrbitalRelationshipsFromFile,
};