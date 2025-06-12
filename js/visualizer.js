function start(){
	var size=Math.floor(document.getElementById('size').value);
	var seq=document.getElementById('seq').value;
	if(!seq) seq="0";
	var len=seq.length;
	var even=document.getElementById("even").checked;
	var m=(len-1)*2; //square size
	if(!even) m++;
	var sizexy=m*size; //canvas size
	var inf=document.getElementById("inf").checked;
	
	var canvas=document.getElementById('myCanvas');
	var context=canvas.getContext('2d');
	canvas.width=sizexy, canvas.height=sizexy;
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect (0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgb(0,0,0)';
	context.strokeStyle='rgb(0,0,0)';	
	context.beginPath();
	var k, x, y, xv, yv;
	
	for(var i=0;i<len;i++){
		x=i*2;
		y=0;
		if(seq[i]==0){
			k=1;
		}else{
			k=-1;
		}
		xv=1;
		yv=1;
		context.moveTo(x*size,y*size);
		do{
			if(y==m) yv=-1;
			if(x==m) xv=-1;
			if(x==0) xv=1;
			x=x+xv;
			y=y+yv;
			if(inf){
				if(!(xv==-1 && yv==1))
				if(k==1) context.lineTo(x*size,y*size);
			}else{
				if(k==1) context.lineTo(x*size,y*size);
			}
			k*=-1;
			if((x==m && y==m) || (x==0 && y==m)) k=0;
			//if(x==y) k=0;
			context.moveTo(x*size,y*size);
		}while(y!=0);
	}
	
	context.stroke();
}