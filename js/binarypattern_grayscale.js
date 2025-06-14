function evklid(a, b) {
    while (a != 0 && b != 0) {
        if (a > b) {
            a = a % b;
        } else {
            b = b % a;
        }
    }
    return a + b;
}

let a = [];
let timerId = null;
let timerK = 0;
let xend = 0;
let yend = 0;
let size = 10; // Default size
let kmax = 100; // Default kmax
let isAnimating = false; // Flag to track animation state
let speed = 100; // Default speed

function start() {
    if (!timerId) {
        speed = Math.floor(document.getElementById('speed').value) || 100;
        timerId = setInterval(countpoints, speed); // Use speed from input
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
    
    // Draw all points with wave-like grayscale
    for (let x = 0; x < xend; x++) {
        for (let y = 0; y < yend; y++) {
            if (a[x] && a[x][y] !== undefined) {
                // Compute grayscale with sine wave, shifted by timerK
                const grey = Math.floor(255 * (1 - Math.abs(Math.sin(Math.PI * (a[x][y] - timerK) / kmax))));
                context.fillStyle = `rgb(${grey},${grey},${grey})`;
                context.fillRect(x * size, y * size, size, size); // Draw scaled grid cell
            }
        }
    }
    timerK++;
    if (timerK > kmax) timerK = 0; // Reset timerK
}

function droveLines(canvas, x, y) {
    const context = canvas.getContext('2d');
    
    // Get size and kmax from inputs
    size = Math.floor(document.getElementById('size').value) || 10;
    kmax = Math.floor(document.getElementById('kmax').value) || 100;
    if (size <= 0) size = 10;
    
    // Calculate grid dimensions based on canvas-relative mouse position
    xend = Math.floor(Math.max(x, 0) / size) || 1; // Ensure non-negative, minimum 1
    yend = Math.floor(Math.max(y, 0) / size) || 1; // Ensure non-negative, minimum 1
    
    // Ensure coprime dimensions
    let tempXend = xend;
    while (evklid(tempXend, yend) !== 1) {
        tempXend++;
    }
    xend = tempXend;
    
    // Set canvas size to match scaled grid
    canvas.width = xend * size;
    canvas.height = yend * size;
    
    // Output xend, yend to console-log0
    document.getElementById('console-log0').innerHTML = "xend: " + xend + ", yend: " + yend;
    
    // Initialize array
    a = [];
    for (let xa = 0; xa < xend; xa++) {
        a[xa] = new Array(yend).fill(0);
    }
    
    // Original path generation logic
    let xstart = 0, ystart = 0;
    let x1 = 0, y1 = 0, xvector = 1, yvector = 1, k = 0, q = 0;
    let xx, yy;
    if (xstart < xend && ystart < yend) {
        do {
            let x2 = x1 + xvector;
            let y2 = y1 + yvector;
            xx = true;
            yy = true;
            
            if (k > kmax) k = 0;
            a[x1][y1] = k;
            k++;
            
            q++;
            
            if (x2 == xend) {
                xvector *= -1;
                x2 = xend - 1;
                xx = false;
            }
            if (x2 == -1) {
                xvector *= -1;
                x2 = 0;
                xx = false;
            }
            
            if (y2 == yend) {
                yvector *= -1;
                y2 = yend - 1;
                yy = false;
            }
            if (y2 == -1) {
                yvector *= -1;
                y2 = 0;
                yy = false;
            }
            
            x1 = x2;
            y1 = y2;
        } while (xx || yy);
    }
    
    // Static drawing with wave-like grayscale
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let xa = 0; xa < xend; xa++) {
        for (let ya = 0; ya < yend; ya++) {
            // Compute grayscale with sine wave
            const grey = Math.floor(255 * (1 - Math.abs(Math.sin(Math.PI * a[xa][ya] / kmax))));
            context.fillStyle = `rgb(${grey},${grey},${grey})`;
            context.fillRect(xa * size, ya * size, size, size);
        }
    }
}

function getMousePos(canvas, evt) {
    // Get canvas's top-left corner relative to the document
    let obj = canvas;
    let top = 0, left = 0;
    while (obj && obj.tagName !== 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    
    // Get mouse position relative to the canvas
    const mouseX = evt.clientX - left + window.pageXOffset;
    const mouseY = evt.clientY - top + window.pageYOffset;
    
    return { x: mouseX, y: mouseY };
}

window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');
    canvas.width = 100; // Initial size
    canvas.height = 100;
    
    // Attach mousemove to document
    document.addEventListener('mousemove', function(evt) {
        const mousePos = getMousePos(canvas, evt);
        droveLines(canvas, mousePos.x, mousePos.y);
    }, false);
    
    // Attach click event to document for toggling animation
    document.addEventListener('click', function() {
        if (isAnimating) {
            stop();
        } else {
            start();
        }
    }, false);
};