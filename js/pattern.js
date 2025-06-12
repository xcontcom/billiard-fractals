function drawLines(canvas, x, y) {
    const ctx = canvas.getContext('2d');
    ctx.font = '10pt sans-serif';
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const xStart = 10;
    const yStart = 10;
    const stepX = 5;
    const stepY = 5;
    const xEnd = stepX * Math.round(x / stepX);
    const yEnd = stepY * Math.round(y / stepY);

    let xx = xStart + stepX;
    let yy = yStart + stepY;
    let directionX = stepX;
    let directionY = stepY;
    let alternate = 1;

    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xx, yy);

    if (xStart < xEnd && yStart < yEnd) {
        do {
            if (xx === xEnd || xx === xStart) {
                directionX = -directionX;
            }
            if (yy === yEnd || yy === yStart) {
                directionY = -directionY;
            }
            xx += directionX;
            yy += directionY;

            alternate = -alternate;
            if (alternate === 1) {
                ctx.lineTo(xx, yy);
            } else {
                ctx.moveTo(xx, yy);
            }
        } while (!(xx === xStart && yy === yStart || xx === xEnd && yy === yStart ||
                   xx === xStart && yy === yEnd || xx === xEnd && yy === yEnd));
    }
    ctx.stroke();

    // Draw bounding rectangle
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xStart, yEnd);
    ctx.lineTo(xEnd, yEnd);
    ctx.lineTo(xEnd, yStart);
    ctx.lineTo(xStart, yStart);
    ctx.stroke();
	
    // Draw text with grid dimensions and ratio
    const width = (xEnd - xStart) / Math.abs(stepX);
    const height = (yEnd - yStart) / Math.abs(stepY);
    const ratio = yEnd !== yStart ? (xEnd - xStart) / (yEnd - yStart) : 'undefined';
    ctx.strokeText(`(${width}, ${height}), ${ratio}`, xEnd + 20, yEnd + 20);
}

function getMousePos(canvas, evt) {
    let obj = canvas;
    let top = 0;
    let left = 0;
    while (obj && obj.tagName !== 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }

    const mouseX = evt.clientX - left + window.pageXOffset;
    const mouseY = evt.clientY - top + window.pageYOffset;
    return { x: mouseX, y: mouseY };
}

window.onload = function () {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 1000;

    canvas.addEventListener('mousemove', function (evt) {
        const mousePos = getMousePos(canvas, evt);
        drawLines(canvas, mousePos.x, mousePos.y);
    }, false);
};