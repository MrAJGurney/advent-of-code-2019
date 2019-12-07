const { OPERATIONS, } = require('./operations');

class IntcodeComputer {
	constructor(software) {
		this._memory = JSON.parse(JSON.stringify(software));
		this._instructionPtr = 0;
		this._inputBuffer = [];
		this._outputBuffer = [];
		this._halted = false;
	}

	writeMemoryAt({ value, ptr, }) {
		this._memory[ptr] = value;
		return;
	}

	readMemoryAt({ ptr, }) {
		return this._memory[ptr];
	}

	getInstructionPtr() {
		return this._instructionPtr;
	}

	moveInstructionPtr(newPosition) {
		this._instructionPtr = newPosition;
	}

	addInput(input) {
		this._inputBuffer.push(input);
		return;
	}

	consumeInput() {
		if (this._inputBuffer.length === 0) {
			throw new Error('Expected input, but nothing found');
		}
		return this._inputBuffer.pop();
	}

	addOutput(output) {
		this._outputBuffer.push(output);
		return;
	}

	consumeOutput() {
		if (this._outputBuffer.length === 0) {
			throw new Error('Expected output, but nothing found');
		}
		return this._outputBuffer.pop();
	}

	runUntilHalt() {
		while(true) {
			const instruction = this.readMemoryAt(
				{ ptr: this.getInstructionPtr(), });
			const {
				operation,
				params,
				paramsModes,
			} = this._deconstructInstruction(instruction);

			if (operation.code === OPERATIONS.halt.code)
			{
				this.halted = true;
				break;
			}

			this._handleOperation(
				{
					instruction: {
						operation,
						params,
						paramsModes,
					},
				}
			);
		}

		return;
	}

	_deconstructInstruction(instruction) {
		const {
			paramsModes,
			operation,
		} = this._deconstructOperation(instruction);

		const paramsStart = this.getInstructionPtr() + 1;
		const paramsEnd = this.getInstructionPtr() + operation.length;

		const params = [];
		for (let ptr = paramsStart; ptr <= paramsEnd; ptr++) {
			params.push(this.readMemoryAt({ ptr, }));
		}

		return { operation, params, paramsModes, };
	};

	_deconstructOperation(instruction) {
		const splitInstruction = this._splitDigits(instruction);

		// Adds leading zeros for operation code
		while(splitInstruction.length < 2) {
			splitInstruction.unshift(0);
		}

		const operationCodeDigits = splitInstruction.slice(-2);
		const operationCode =
			operationCodeDigits[0]*10 +
			operationCodeDigits[1];
		const operation = this._getOperationByCode(operationCode);

		// Removes operation code from instruction
		splitInstruction.pop();
		splitInstruction.pop();

		// Adds leading zeroes to parameter modes
		while(splitInstruction.length < (operation.length - 1)) {
			splitInstruction.unshift(0);
		}

		const paramsModes = splitInstruction.slice().reverse();

		return { paramsModes, operation, };
	};

	_getOperationByCode(operationCode) {
		const operationName = Object.keys(OPERATIONS).find(name => {
			return OPERATIONS[name].code === operationCode;
		});
		return OPERATIONS[operationName];
	};

	_splitDigits(number) {
		const radix = 10;
		return [...number.toString(radix),].map(x => parseInt(x));
	};

	_handleOperation(
		{
			instruction: {
				operation,
				params,
				paramsModes,
			},
		}
	) {
		const operationHandler = operation.handle;

		if (typeof operationHandler !== 'function') {
			throw new Error('Unhandled operation code');
		}

		return operationHandler(
			{
				instruction: {
					operation,
					params,
					paramsModes,
				},
				softwareIO: {
					writeMemoryAt: this.writeMemoryAt.bind(this),
					readMemoryAt: this.readMemoryAt.bind(this),
				},
				instructionPtrIO: {
					getInstructionPtr: this.getInstructionPtr.bind(this),
					moveInstructionPtr: this.moveInstructionPtr.bind(this),
				},
				storageIO: {
					consumeInput: this.consumeInput.bind(this),
					addOutput: this.addOutput.bind(this),
				},
			});
	};
}

module.exports = {
	IntcodeComputer,
};