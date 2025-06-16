let sizexy=512;
let timerId = null;
let timerK = 0;
let size = 1; // Default size multiplier
let kmax = sizexy; // Default kmax (max phase)
let step=32; // Phase steps
let isAnimating = false; // Flag to track animation state
let speed=10; // Speed of animation
let discretization=1; // MouseX/MouseY
let b=1;
let c=1;
let d=1;
let sqrt=2;
let phase=0;

function start() {
    if (!timerId) {
        timerId = setInterval(countpoints, speed); // 100ms interval for smooth animation
        isAnimating = true; // Update flag
    }
}

function stop() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        isAnimating = false; // Update flag
    }
    timerK = 0;
}

function countpoints() {
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');
    
    // Clear the entire canvas
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgb(255,255,255)';
    
    if (timerK >= kmax) timerK = 0; // Reset timerK
	const period = 2 / Math.sqrt(sqrt);
    phase=(timerK/kmax)*period;
	
	let z, xx, yy;
	
    // Draw for the current timerK
	for(let x=0;x<canvas.width;x++){
		xx=x-Math.floor(canvas.width/(2*size));
		for(let y=0;y<canvas.height;y++){
			yy=y-Math.floor(canvas.height/(2*size));
			
			
			z=discretization*((xx**2)+b*xx*yy+c*(yy**2))**(1/d);
			
			if(Math.floor((
				phase+z
			)*Math.sqrt(sqrt))%2)
				context.fillRect(x*size, y*size, 1*size, 1*size);
			
			/*
			//this one is slower
			color=Math.floor(
				(
					Math.sin(phase*Math.PI+z*Math.PI*Math.sqrt(sqrt))
				+1)*128
			);
			context.fillStyle = 'rgb('+color+','+color+','+color+')';
			context.fillRect(x*size, y*size, 1*size, 1*size);
			*/
		}
	}
	
    timerK+=step;
}

function droveLines(ax, ay){
	let hello=document.getElementById('console-log0');
	b=document.getElementById('b').value*1;
	c=document.getElementById('c').value*1;
	d=document.getElementById('d').value*1;
	sqrt=document.getElementById('sqrt').value*1;
	
	ax=Math.floor(ax);
	ay=Math.floor(ay);
	discretization=ax/ay;
	
	hello.innerHTML="ax: "+ax+", ay: "+ay;
	
	countpoints();
}

function getMousePos(canvas, evt){
	let obj=canvas;
	let top=0;
	let left=0;
	while (obj && obj.tagName != 'BODY') {
		top+=obj.offsetTop;
		left+=obj.offsetLeft;
		obj=obj.offsetParent;
	}
 
	let mouseX=evt.clientX-left+window.pageXOffset;
	let mouseY=evt.clientY-top+window.pageYOffset;
	return {
		x: mouseX,
		y: mouseY
	};
}

window.onload=function(){
let canvas=document.getElementById('myCanvas');
let context=canvas.getContext('2d');
canvas.width=sizexy*size;
canvas.height=sizexy*size;
canvas.addEventListener('mousemove', function(evt){
		let mousePos=getMousePos(canvas, evt);
		droveLines(mousePos.x, mousePos.y);
	}, false);
canvas.addEventListener('click', function() {
	if (isAnimating) {
		stop();
	} else {
		start();
	}
}, false);
};

