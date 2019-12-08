class SpaceImageFormatPicture {
	constructor(width, height, pixels) {
		this.pixels = JSON.parse(JSON.stringify(pixels));
		this.width = width;
		this.height = height;
		this.layers = this._buildLayersFromPixels();
	}

	_buildLayersFromPixels() {
		const pixelsInLayer = this.width * this.height;

		const layers = [];
		for (
			let layerStart = 0;
			layerStart < this.pixels.length;
			layerStart += pixelsInLayer) {
			const layerPixels =
                this.pixels.slice(layerStart, layerStart + pixelsInLayer);
			const layer = new Layer(layerPixels);
			layers.push(layer);
		}
		return layers;
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
}

class Layer {
	constructor(layerPixels) {
		this.layer = JSON.parse(JSON.stringify(layerPixels));
		this.pixelTypeCount = this._buildPixelTypeCount();
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