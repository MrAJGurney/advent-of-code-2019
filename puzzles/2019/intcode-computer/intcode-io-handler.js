const buildAddToInputQueue = self => input => {
	self.inputQueue.push(input);
	return;
};

const buildReadFromOutputHeap = self => () => {
	return self.outputHeap[self.outputHeap.length - 1];
};

module.exports = {
	buildAddToInputQueue,
	buildReadFromOutputHeap,
};