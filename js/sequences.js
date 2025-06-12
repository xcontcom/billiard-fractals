function sequence(m,n){
	var md=m/2;
	var array=[];
	for(var k=0;k<md;k++) array[k]=1;
	for(var k=0;k<md;k++) if(Math.floor(2*k*n/m)%2==0) array[((2*k*n)%m)/2]=0;
	return array;
}

function droveLines(canvas, xx, yy){
	
	var hello=document.getElementById('console-log0');
	hello.innerHTML="("+xx+")";
	
	var size=750;
	var context=canvas.getContext('2d');
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect (0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgb(0,0,0)';
	
	var array;
	for(var y=1;y<xx;y++){
		array=sequence(xx,y);
		for(var x=0;x<array.length;x++){
			if(array[x]==0) context.fillRect (x, y, 1, 1);
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
canvas.width=750;
canvas.height=750;
canvas.addEventListener('mousemove', function(evt){
		var mousePos=getMousePos(canvas, evt);
		droveLines(canvas, mousePos.x, mousePos.y);
	}, false);
};