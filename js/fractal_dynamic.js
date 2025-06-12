let sizex = 256;
let sizey = 256;
let size=2;

function droveLines(canvas, ax, ay) {
	ax = Math.floor(ax / 2);
	ay = Math.floor(ay / 2);
	document.getElementById('console-log0').innerHTML = "ax: " + ax + ", ay: " + ay;
	
	context = canvas.getContext('2d');
	canvas.width = sizex * size;
	canvas.height = sizey * size;
	context.fillStyle = 'rgb(0,0,0)';
	context.fillRect(0, 0, sizex * size, sizey * size);
	context.fillStyle = 'rgb(255,255,255)';
	let a=[0];
	for(let i=1;i<sizex;i++){
		if(Math.floor(i*ax/ay)%2==1)
			a[i]=a[i-1]+1;
		else
			a[i]=a[i-1]-1;
	}
	for(let x=0;x<sizex;x++){
		for(let y=0;y<sizey;y++){
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
canvas.width=sizex*size;
canvas.height=sizey*size;
canvas.addEventListener('mousemove', function(evt){
		var mousePos=getMousePos(canvas, evt);
		droveLines(canvas, mousePos.x, mousePos.y);
	}, false);
};