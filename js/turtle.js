function init(){
	drawcanv();
}
function drawcanv(){
	var size=document.getElementById('size').value;
	var q=document.getElementById('q').value;
	var n=document.getElementById('n').value;
	var m=360;
	var n1=document.getElementById('n1').value;
	var m1=360;
	var a1=2*Math.PI*n/m;
	var a2=2*Math.PI*n1/m1;
	var s=document.getElementById('s').value;
	var len=s.length;
	
	var canvas=document.getElementById('myCanvas');
	var context=canvas.getContext('2d');
	canvas.width=size, canvas.height=size;
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect (0, 0, canvas.width, canvas.height);
	//context.fillStyle = 'rgb(0,0,0)';
	context.strokeStyle='rgb(0,0,0)';
	
	
	var x0=document.getElementById('xx').value*1;
	var y0=document.getElementById('yy').value*1;
	var x1=x0, y1=y0+q*1;
	var xx, yy;
	

	context.beginPath();
	context.moveTo(x0, y0);
	context.lineTo(x1, y1);
	for(var i=0;i<len;i++){
		if(s[i]==1){
			alpha=a1;
		}else{
			alpha=a2;
		}
		xx=((x0-x1)*Math.cos(alpha)-(y0-y1)*Math.sin(alpha))+x1;
		yy=((x0-x1)*Math.sin(alpha)+(y0-y1)*Math.cos(alpha))+y1;
		context.moveTo(x1, y1);
		context.lineTo(xx, yy);
		x0=x1, y0=y1;
		x1=xx, y1=yy;
	}
	context.stroke();
	
}