const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const stickerContainer = document.getElementById("stoneContainer2");
//버튼 토글
const openCanvasBtn = document.getElementById("openCanvasBtn");
const closeCanvasBtn = document.getElementById("closeCanvasBtn");
const canvasPocket = document.getElementById("canvasPocket");

const stackBtn = document.getElementById("stack");
const collection = document.getElementById("collection");
const stones = document.querySelectorAll(".stone");

let canvasStones = [];
let isDragging = false;
let dragIndex = -1;
let offsetX, offsetY;

//캔버스를 열고 닫는 함수
function toggleCanvas() {
  canvasPocket.classList.toggle("active");
  openCanvasBtn.style.display = canvasPocket.classList.contains("active") ? "none" : "block";
  closeCanvasBtn.style.display = canvasPocket.classList.contains("active") ? "block" : "none";
}
openCanvasBtn.addEventListener("click", toggleCanvas);
closeCanvasBtn.addEventListener("click", toggleCanvas);

//안내 문구를 그리는 함수
function drawTextIfEmpty() {
  if (canvasStones.length === 0) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "grey";
    ctx.textAlign = "center";
    ctx.fillText("Add stones to start stacking", canvas.width / 2, canvas.height / 2);
  }
}

function drawStones() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화

  // 돌이 없으면 안내 문구를 표시
  if (canvasStones.length === 0) {
    drawTextIfEmpty(); // 수정된 부분: 안내 문구 표시
  } else {
    // 돌이 있으면 돌을 그리기
    canvasStones.forEach((stone) => {
      ctx.drawImage(stone.img, stone.x, stone.y, 50, 50);
    });
  }
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
      drawStones(); // 수정된 부분: 돌을 그리고 안내 문구 제거
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
  drawStones(); // 수정된 부분: 캔버스를 초기화하고 안내 문구 다시 그리기
});
