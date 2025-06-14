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
	
	var context=canvas.getContext('2d');
	context.font="10pt sans-serif";
	context.beginPath();
	context.fillStyle = "rgb(255,255,255)"; 
	context.fillRect (0, 0, canvas.width, canvas.height);
	context.fillStyle = "rgb(0,0,0)"; 
	
	var size=Math.floor(document.getElementById('size').value);
	if(size<=0) size++;
	
	var xstart=0, ystart=0;
	var xend=Math.floor(x/size);
	var yend=Math.floor(y/size);
	if(xend==0) xend++;
	if(yend==0) yend++;
	
	while(evklid(xend,yend)!=1){
		xend++;
	}
	
	var kx=0, ky=0;
	var xvector=1;
	var yvector=1;
	var x1=0, y1=0;
	var x2, y2;
	var xx, yy;
	var k=1;
	var q=0;
	if(xstart<xend && ystart<yend){
		do{
			x2=x1+xvector;
			y2=y1+yvector;
			xx=true;
			yy=true;
			k=k*-1;
						
			if(k==-1) 
				context.fillRect(x1*size,y1*size,size,size);
			
			q++;
			
			if(x2==xend){
				xvector*=-1;
				x2=xend-1;
				xx=false;
			}
			if(x2==-1){
				xvector*=-1;
				x2=0;
				xx=false;
			}
			
			if(y2==yend){
				yvector*=-1;
				y2=yend-1;
				yy=false;
			}
			if(y2==-1){
				yvector*=-1;
				y2=0;
				yy=false;
			}
			
			x1=x2; y1=y2;
		}while(xx || yy);
	}
	
	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle = "rgb(0,0,0)";
	context.strokeText("("+xend+", "+yend+")", x+15, y+15);
	context.stroke();
	
/*	
	console.clear();
	context.beginPath();
	context.strokeStyle = "rgb(255,0,0)";
	context.lineWidth=Math.ceil(size/2);
	console.log('---');
	let a=xend, b=yend;
	xend=a, yend=b;
	xx=0, yy=1;
	while((a>0)&&(b>0)){
		if(a>=b){
			b=a-b;
			a=a-b;
			console.log('a='+a+', b='+b+' a>=b');
			xx=!xx;
			yy=!yy;
		}else{
			a=a;
			b=b-a;
			console.log('a='+a+', b='+b+' a<b');
		}
		context.rect(xx*b*size,yy*b*size,a*size,a*size);
		console.log(a,b);
	}
	context.stroke();
*/


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
