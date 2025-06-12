let sizex = 512;
let sizey = 512;

function init() {
	let size=document.getElementById('size').value*1;
	let k=document.getElementById('k').value*1;
	let canvas;
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	canvas.width = sizex * size;
	canvas.height = sizey * size;
	context.fillStyle = 'rgb(0,0,0)';
	context.fillRect(0, 0, sizex * size, sizey * size);
	context.fillStyle = 'rgb(255,255,255)';
	let a=[0];
	for(let i=1;i<sizex;i++){
		if(Math.floor(i*Math.sqrt(k))%2==1)
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
