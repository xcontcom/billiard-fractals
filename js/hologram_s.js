var size=1;
var sizexy=400;

function draw(){
	
	var hello=document.getElementById('console-log0');
	var a1=document.getElementById('a1').value*1;
	var a2=document.getElementById('a2').value*1;
	var b=document.getElementById('b').value*1;
	var c=document.getElementById('c').value*1;
	var d=document.getElementById('d').value*1;
	var phase=document.getElementById('phase').value*1;
	var c4=document.getElementById('c4').value*1;
	
	a=a1/a2;
	
	hello.innerHTML="a: "+a+", b: "+b+", c: "+c+", d: "+d;
	

	var z, color, canvas, context, xx, yy;
	
	canvas=document.getElementById('myCanvas');
	canvas.width=sizexy*size;
	canvas.height=sizexy*size;
	context=canvas.getContext('2d');
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect (0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgb(0,0,0)';

	for(var x=0;x<canvas.width;x++){
		xx=x-Math.floor(canvas.width/(2*size));
		for(var y=0;y<canvas.height;y++){
			yy=y-Math.floor(canvas.height/(2*size));
			
			z=(a)*(c4**2+(xx**2)+b*xx*yy+c*(yy**2))**(1/d);
			
			if(Math.floor((
				phase+z
			)*Math.sqrt(2))%2) context.fillRect(x*size, y*size, 1*size, 1*size);
			
		}
	}
	
	
	canvas=document.getElementById('myCanvas1');
	canvas.width=sizexy*size;
	canvas.height=sizexy*size;
	context=canvas.getContext('2d');
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect (0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgb(0,0,0)';
	
	for(var x=0;x<canvas.width;x++){
		xx=x-Math.floor(canvas.width/(2*size));
		for(var y=0;y<canvas.height;y++){
			yy=y-Math.floor(canvas.height/(2*size));
			
			z=(a)*(c4**2+(xx**2)+b*xx*yy+c*(yy**2))**(1/d);
			
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