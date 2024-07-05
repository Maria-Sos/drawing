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

