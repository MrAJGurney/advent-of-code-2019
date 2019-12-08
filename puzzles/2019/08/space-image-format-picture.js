const pixelColours = {
	'black': 0,
	'white': 1,
	'transparent': 2,
};

class SpaceImageFormatPicture {
	constructor(width, height, pixels) {
		this.pixels = JSON.parse(JSON.stringify(pixels));
		this.width = width;
		this.height = height;
		this.layers = this._buildLayersFromPixels();
	}

	findLayerWithFewestZeroes() {
		let layerWithFewestZeroes = this.layers[0];
		this.layers.forEach(layer => {
			if (
				layer.pixelTypeCount[0] <
				layerWithFewestZeroes.pixelTypeCount[0]
			) {
				layerWithFewestZeroes = layer;
			}
		});

		return layerWithFewestZeroes;
	}

	buildDisplayableImage(widthMultiplier) {
		const visiblePixels = [];
		for (let row = 0; row < this.height; row++) {
			visiblePixels.push([]);
			for (let column = 0; column < this.width; column++) {
				visiblePixels[row].push([]);
				visiblePixels[row][column] =
					this._getFirstVisiblePixel(row, column);
			}
		}

		const replaceNumbersWithColours = (number => {
			if (number === pixelColours.white) {
				return '█'.repeat(widthMultiplier);
			}
			if (number === pixelColours.black) {
				return '░'.repeat(widthMultiplier);
			}
			throw new Error('No mapping for number');
		});

		const imageRows = visiblePixels
			.map(columns => columns
				.map(replaceNumbersWithColours)
				.join(''));

		return imageRows;
	}

	_buildLayersFromPixels() {
		const pixelsInLayer = this.width * this.height;

		const layers = [];
		for (
			let layerStart = 0;
			layerStart < this.pixels.length;
			layerStart += this._getPixelsInLayer()) {
			const layerPixels =
				this.pixels.slice(layerStart, layerStart + pixelsInLayer);
			const layer = new Layer(this.width, this.height, layerPixels);
			layers.push(layer);
		}
		return layers;
	}

	_getPixelsInLayer() {
		return this.height * this.width;
	}

	_getFirstVisiblePixel(row, column) {
		for (
			let layerIndex = 0;
			layerIndex < this.layers.length;
			layerIndex++
		) {
			const layer = this.layers[layerIndex];
			const pixelColour = layer.getPixel(row,column);
			if (pixelColour !== pixelColours.transparent) {
				return this.layers[layerIndex].getPixel(row,column);
			}
		}
	}
}

class Layer {
	constructor(width, height, layerPixels) {
		this.layer = JSON.parse(JSON.stringify(layerPixels));
		this.width = width;
		this.height = height;
		this.pixelTypeCount = this._buildPixelTypeCount();
	}

	getPixel(row, column) {
		const position = (row * this.width) + column;
		return this.layer[position];
	}

	_buildPixelTypeCount() {
		const pixelTypeCount = {};
		for (let pixelType = 0; pixelType <= 9; pixelType++) {
			pixelTypeCount[pixelType] = 0;
		}

		this.layer.forEach(pixel => {
			pixelTypeCount[pixel]++;
		});

		return pixelTypeCount;
	}
}

module.exports = {
	SpaceImageFormatPicture,
};