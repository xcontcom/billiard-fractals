const { createCanvas } = require('canvas');
const GIFEncoder = require('gifencoder');
const fs = require('fs');

const sizex = 512;
const sizey = 512;
const size = 1;
const k = 2;
const plus = 0;

const canvas = createCanvas(sizex * size, sizey * size);
const ctx = canvas.getContext('2d');

const encoder = new GIFEncoder(sizex * size, sizey * size);
encoder.createReadStream().pipe(fs.createWriteStream('output.gif'));

encoder.start();
encoder.setRepeat(0); // 0 = loop forever
encoder.setDelay(100); // frame delay in ms
encoder.setQuality(10);

let a = [0];
for (let i = 1; i < sizex; i++) {
	if (Math.floor(i * (Math.sqrt(k) + plus)) % 2 === 1)
		a[i] = a[i - 1] + 1;
	else
		a[i] = a[i - 1] - 1;
}

let min = Infinity, max = -Infinity;
for (let x = 0; x < sizex; x++) {
	for (let y = 0; y < sizey; y++) {
		const val = a[x] + a[y];
		if (val < min) min = val;
		if (val > max) max = val;
	}
}

for (let slice = min; slice <= max; slice++) {
	// Draw background
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, sizex * size, sizey * size);

	// Draw pattern
	ctx.fillStyle = 'white';
	for (let x = 0; x < sizex; x++) {
		for (let y = 0; y < sizey; y++) {
			const q = a[x] + a[y];
			if (q === slice) {
				ctx.fillRect(x * size, y * size, size, size);
			}
		}
	}

	// Add frame to GIF
	encoder.addFrame(ctx);
}

encoder.finish();
console.log('GIF saved as output.gif');