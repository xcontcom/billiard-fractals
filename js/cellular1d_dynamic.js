var size=2;
var sizexy=256;

function cellular(array, rule, iterations){
	for(let i=0;i<iterations;i++){
		let temp = new Array(sizexy);
		for (let x = 0; x < sizexy; x++) {
			const xm = (x - 1 + sizexy) % sizexy; // Toroidal boundary (periodic boundary conditions)
			const xp = (x + 1) % sizexy;

			const q = (
				(array[xm] << 2) |
				(array[x] << 1) |
				array[xp]
			);

			temp[x] = rule[q];

		}
		array=temp;
	}
	return array;
}

function droveLines(canvas, ax, ay) {
	ax = Math.floor(ax / 2);
	ay = Math.floor(ay / 2);
	document.getElementById('console-log0').innerHTML = "ax: " + ax + ", ay: " + ay;
	
	let rules = [];
	let rule = ax.toString(2).padStart(8, '0').split('').map(Number);
	
	let array = new Array(sizexy);
	for (let x = 0; x < sizexy; x++) {
		array[x]=0;
	}
	array[Math.floor(sizexy/2)]=1;
	array=cellular(array, rule, ay);
	
	
	context = canvas.getContext('2d');
	canvas.width = sizexy * size;
	canvas.height = sizexy * size;
	context.fillStyle = 'rgb(0,0,0)';
	context.fillRect(0, 0, sizexy * size, sizexy * size);
	context.fillStyle = 'rgb(255,255,255)';
	let a=[0];
	for(let i=1;i<sizexy;i++){
		if(array[i])
			a[i]=a[i-1]+1;
		else
			a[i]=a[i-1]-1;
	}
	for(let x=0;x<sizexy;x++){
		for(let y=0;y<sizexy;y++){
			q=(a[x]+a[y]+512)%4;
			if(q==0 || q==1)
				context.fillRect(x * size, y * size, size, size);
	
		}
	}
}


function getMousePos(canvas, evt){
	var obj=canvas;
	var top=0;
	var left=0;
	while (obj && obj.tagName != 'BODY') {
		top+=obj.offsetTop;
		left+=obj.offsetLeft;
		obj=obj.offsetParent;
	}
 
	var mouseX=evt.clientX-left+window.pageXOffset;
	var mouseY=evt.clientY-top+window.pageYOffset;
	return {
		x: mouseX,
		y: mouseY
	};
}

window.onload=function(){
var canvas=document.getElementById('myCanvas');
var context=canvas.getContext('2d');
canvas.width=sizexy*size;
canvas.height=sizexy*size;
canvas.addEventListener('mousemove', function(evt){
		var mousePos=getMousePos(canvas, evt);
		droveLines(canvas, mousePos.x, mousePos.y);
	}, false);
};