function evklid(a,b){
	while(a!=0 && b!=0){
		if(a>b){
			a=a%b;
		}else{
			b=b%a;
		}
	}
	return a+b;
}


function droveLines(canvas, x, y){
	
	var xysize=1;
	var xp=Math.floor(document.getElementById('xp').value);
	var yp=Math.floor(document.getElementById('yp').value);
	
	var xstart=0, ystart=0;
	var xend=Math.floor((x+xp)/xysize);
	var yend=Math.floor((y+yp)/xysize);
	if(xend<=2) xend=2;
	if(yend<=2) yend=2;
	
	while(evklid(xend,yend)!=1){
		xend++;
	}
	
	var hello=document.getElementById('console-log0');
	hello.innerHTML="("+xend+", "+yend+")";
	
	var mm=xend;
	var nn=yend;
	var k=0;//0
	var ni;
	var array=[];
	
	var md=mm/2;
	for(var i=0;i<md;i++){
		array[i]=1;
	}
	
	var array2=[];
	for(var i=0;i<=mm;i++){
		if(i%2==0){
			ni=Math.floor(nn*i/mm)%2;
			array2[k]=ni;
			k++;
			
			if(ni==0){
				array[((nn*i)%mm)/2]=0;
			}
		}
	}
	
	var hello2=document.getElementById('console-log1');
	hello2.innerHTML=array.slice(0, 100).join("")+" (first 100)";
	var hello3=document.getElementById('console-log2');
	hello3.innerHTML=array2.slice(0, 100).join("");

	var q=document.getElementById('q').value;
	var n=document.getElementById('n').value;
	var m=360;
	var n1=document.getElementById('n1').value;
	var m1=360;
	var a1=2*Math.PI*n/m;
	var a2=2*Math.PI*n1/m1;
	var s=array;
	var len=s.length;
	
	var context=canvas.getContext('2d');
	context.fillStyle = 'rgb(223,223,223)';
	context.fillRect (0, 0, canvas.width, canvas.height);
	context.strokeStyle='rgb(0,0,0)';
	
	
	var x0=600, y0=400;
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
	
	
	
	///////////////////////////////
	s=array2;
	len=s.length;
	x0=600, y0=400+1;
	x1=x0, y1=y0+q*1;
	
	context.strokeStyle='rgb(128,0,255)';
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
	///////////////////////////////
	
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
canvas.width=1200;
canvas.height=800;
canvas.addEventListener('mousemove', function(evt){
		var mousePos=getMousePos(canvas, evt);
		droveLines(canvas, mousePos.x, mousePos.y);
	}, false);
};