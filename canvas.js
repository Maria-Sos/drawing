const canvas = document.getElementById('board');
const toolbar = document.getElementById('toolbar');

const ctx = canvas.getContext('2d');


const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false,
    lineWidth = 3,
    startX,
    startY;

const draw = (e) => {
  if(!isPainting) {
      return;
  }
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY)
  ctx.stroke();
}

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
})

toolbar.addEventListener('change', e => {
    if(e.target.id === 'pick-color') {
        ctx.strokeStyle = e.target.value;
    }
    if(e.target.id === 'width-line') {
        lineWidth = e.target.value;
    }
})

canvas.addEventListener('mousedown', e => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
})

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
})

canvas.addEventListener('mousemove', draw);

// Saving my drawing logic:

document.querySelector('.submit-button').addEventListener("click", function(e) {
    // Create a temporary canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Get the context of the temporary canvas
    const ctx = tempCanvas.getContext('2d');

    // Fill the temporary canvas with a white background
    ctx.fillStyle = '#FFFFFF'; // Set to any color you want the background to be
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the original canvas onto the temporary canvas
    ctx.drawImage(canvas, 0, 0);

    // Use the temporary canvas to generate the image data URL
    const dataURL = tempCanvas.toDataURL("image/jpeg", 1.0);

    // Proceed to download the image
    downloadImage(dataURL, 'my-canvas.jpeg');
});

// Save | Download image function remains the same
function downloadImage(data, filename = 'untitled.jpeg') {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}