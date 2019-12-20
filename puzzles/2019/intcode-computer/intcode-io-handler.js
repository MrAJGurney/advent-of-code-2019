const buildAddToInputQueue = self => input => {
	self.inputQueue.push(input);
	return;
};

module.exports = { buildAddToInputQueue, };