var size=1;
var sizexy=400;

function droveLines(canvas, ax, ay){
	var hello=document.getElementById('console-log0');
	var b=document.getElementById('b').value*1;
	var c=document.getElementById('c').value*1;
	var d=document.getElementById('d').value*1;
	var sqrt=document.getElementById('sqrt').value*1;
	
	var phase=0;
	ax=Math.floor(ax/2);
	ay=Math.floor(ay/2);
	
	hello.innerHTML="ax: "+ax+", ay: "+ay;
	
	var z, context, xx, yy;

	context=canvas.getContext('2d');
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect (0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgb(0,0,0)';

	
	for(var x=0;x<canvas.width;x++){
		xx=x-Math.floor(canvas.width/(2*size));
		for(var y=0;y<canvas.height;y++){
			yy=y-Math.floor(canvas.height/(2*size));
			
			
			z=(ax/ay)*((xx**2)+b*xx*yy+c*(yy**2))**(1/d);
			
			/*
			if(Math.floor((
				phaze+z
			)*Math.sqrt(sqrt))%2) context.fillRect(x*size, y*size, 1*size, 1*size);
			*/
			
			
			//this one is slower
			color=Math.floor(
				(
					Math.sin(phase*2*Math.PI+z*Math.PI*Math.sqrt(2))
				+1)*128
			);
			context.fillStyle = 'rgb('+color+','+color+','+color+')';
			context.fillRect(x*size, y*size, 1*size, 1*size);
			
			
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