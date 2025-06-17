var size=1;
var sizexy=512;

function shuffle(array, shiftAmount) {
	let len = array.length;
	let shuffled = new Array(len * 2);
	for (let i = 0; i < len; i++) {
		shuffled[2 * i] = array[(i + shiftAmount) % len];	// shifted part
		shuffled[2 * i + 1] = array[i];						// original part
	}
	return shuffled;
}

function init() {
	let pow=8;
	let shuffleIterations = 2*pow+1;
	let powerOfTwo = 2**pow;
	
	let map=[];
	for(let y=0;y<sizexy;y++){
		map[y]=[];
		let shiftAmount = y * powerOfTwo;
		let array = [1, 0];
		for (let i = 0; i < shuffleIterations; i++) {
			array = shuffle(array, shiftAmount);
		}
		map[y]=array;
	}
	drawMap(document.getElementById('myCanvas'), map);
	
	
	map=[];
	for(let y=0;y<sizexy;y++){
		let irrational = y / powerOfTwo;
		let array2=[];
		for (let i=0;i<sizexy;i++){
			array2[i]=Math.floor(i * irrational)%2;
		}
		map[y]=array2;
	}
	drawMap(document.getElementById('myCanvas1'), map);

}

function drawMap(canvas, map){
	const context = canvas.getContext('2d');
	canvas.width = sizexy * size;
	canvas.height = sizexy * size;
	context.fillStyle = 'rgb(0,0,0)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgb(255,255,255)';
	for (let y = 0; y < sizexy; y++) {
		for (let x = 0; x < sizexy; x++) {
			if (map[y][x])
				context.fillRect(x * size, y * size, size, size);
		}
	}
}