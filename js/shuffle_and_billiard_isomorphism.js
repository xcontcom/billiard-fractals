var size=2;
var sizexy=256;

function shuffle(array, shiftAmount) {
	let len = array.length;
	let shuffled = new Array(len * 2);
	for (let i = 0; i < len; i++) {
		shuffled[2 * i] = array[(i + shiftAmount) % len];	// shifted part
		shuffled[2 * i + 1] = array[i];				// original part
	}
	return shuffled;
}

function init() {
	let pow=7;
	let shuffleIterations = 2*pow+1;
	let powerOfTwo = 2**pow;
	
	let map=[];
	for(let y=0;y<sizexy;y++){
		map[y]=[];
		let shiftAmount = y * powerOfTwo;
		let array = [0, 1];
		for (let i = 0; i < shuffleIterations; i++) {
			array = shuffle(array, shiftAmount);
		}
		map[y]=array;
	}
	drawMap(document.getElementById('myCanvas'), map);
	
	
	map2=[];
	for(let y=0;y<sizexy;y++){
		let irrational = y / powerOfTwo;
		let array2=[];
		for (let i=0;i<sizexy;i++){
			array2[i]=Math.floor(i * irrational)%2;
		}
		map2[y]=array2;
	}
	drawMap(document.getElementById('myCanvas1'), map2);
	
	mathces=0;
	total=sizexy*sizexy;
	for (let y = 0; y < sizexy; y++) {
		for (let x = 0; x < sizexy; x++) {
			if (map[y][x]===map2[y][sizexy-x-1]) //flipped horizontaly
				mathces++;
		}
	}
	
	document.getElementById('console-log0').innerHTML=`${mathces} matches of ${total} total.`; // --> "65536 matches of 65536 total."

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
