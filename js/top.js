const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const stickerContainer = document.getElementById("stoneContainer2");
const openCanvasBtn = document.getElementById("openCanvasBtn");
const stackBtn = document.getElementById("stack");
const collection = document.getElementById("collection");
const stones = document.querySelectorAll(".stone");

let canvasStones = [];

let isDragging = false;
let dragIndex = -1;
let offsetX, offsetY;

function openCanvas() {
  canvas.style.display = "block";
  stickerContainer.style.display = "flex";
}
openCanvasBtn.addEventListener("click", openCanvas);

function drawStones() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvasStones.forEach((stone) => {
    ctx.drawImage(stone.img, stone.x, stone.y, 50, 50);
  });
}

function getRandomPosition() {
  const x = Math.floor(Math.random() * (canvas.width - 50));
  const y = Math.floor(Math.random() * (canvas.height - 50));
  return { x, y };
}

stones.forEach((stone) => {
  stone.addEventListener("click", (e) => {
    const img = new Image();
    img.src = e.target.src;

    img.onload = () => {
      const randomPosition = getRandomPosition();
      canvasStones.push({
        img: img,
        x: randomPosition.x,
        y: randomPosition.y,
      });
      drawStones();
    };
  });
});

function getMousePos(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function isMouseOnStone(mousePos, stone) {
  return (
    mousePos.x >= stone.x &&
    mousePos.x <= stone.x + 50 && // 50 is the stone width
    mousePos.y >= stone.y &&
    mousePos.y <= stone.y + 50 // 50 is the stone height
  );
}

canvas.addEventListener("mousedown", (e) => {
  const mousePos = getMousePos(canvas, e);

  // Check if mouse is on any stone
  for (let i = 0; i < canvasStones.length; i++) {
    if (isMouseOnStone(mousePos, canvasStones[i])) {
      isDragging = true;
      dragIndex = i;
      // Calculate offset between mouse position and stone's top-left corner
      offsetX = mousePos.x - canvasStones[i].x;
      offsetY = mousePos.y - canvasStones[i].y;
      break;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const mousePos = getMousePos(canvas, e);
    // Update the position of the stone being dragged
    canvasStones[dragIndex].x = mousePos.x - offsetX;
    canvasStones[dragIndex].y = mousePos.y - offsetY;
    drawStones(); // Redraw the canvas
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
  dragIndex = -1;
});

stackBtn.addEventListener("click", () => {
  const artworkImage = new Image();
  artworkImage.src = canvas.toDataURL("image/png");

  const artworkElement = document.createElement("div");
  artworkElement.appendChild(artworkImage);
  collection.appendChild(artworkElement);

  canvas.style.display = "none";
  stickerContainer.style.display = "none";

  canvasStones = [];
  drawStones();
});
