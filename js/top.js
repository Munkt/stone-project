const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const stickerContainer = document.getElementById("stoneContainer2");
const messageInput = document.getElementById("message");
const stackBtn = document.getElementById("stack");
const resetBtn = document.getElementById("reset");
const collection = document.getElementById("collection");
const stones = document.querySelectorAll(".stone");
const openCanvasBtn = document.getElementById("openCanvasBtn");
const closeCanvasBtn = document.getElementById("closeCanvasBtn");

let canvasStones = [];
let placedArtworks = [];
let isDragging = false;
let dragIndex = -1;
let offsetX, offsetY;

function setCanvasResolution() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  // Set the canvas resolution based on the device pixel ratio for better quality
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  // Keep the CSS width and height the same as the original dimensions
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  // Scale the context for better resolution rendering
  ctx.scale(dpr, dpr);

  // Enable image smoothing for smoother graphics
  ctx.imageSmoothingEnabled = true;
}

function getMousePos(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  return {
    x: (event.clientX - rect.left) * dpr, // Adjust for pixel ratio
    y: (event.clientY - rect.top) * dpr, // Adjust for pixel ratio
  };
}

window.onload = () => {
  setCanvasResolution();
  loadFromLocalStorage();
};

// Load artworks from localStorage when the page loads
window.onload = loadFromLocalStorage;

const preloadedImages = document.querySelectorAll(".preloaded-image");

preloadedImages.forEach((imageContainer) => {
  const img = imageContainer.querySelector("img");
  const tooltip = imageContainer.querySelector(".tooltip");

  img.addEventListener("mouseover", () => {
    tooltip.style.display = "block"; // Show the message (tooltip)
  });

  img.addEventListener("mousemove", (e) => {
    tooltip.style.top = `${e.clientY + 15}px`; // Position tooltip near the mouse
    tooltip.style.left = `${e.clientX + 15}px`;
  });

  img.addEventListener("mouseout", () => {
    tooltip.style.display = "none"; // Hide the message (tooltip)
  });
});

document.getElementById("goDown").addEventListener("click", function () {
  window.location.href = "./index.html"; // Redirect to the link
});

function toggleCanvas() {
  canvasPocket.classList.toggle("active");

  openCanvasBtn.style.display = canvasPocket.classList.contains("active") ? "none" : "block";
  closeCanvasBtn.style.display = canvasPocket.classList.contains("active") ? "block" : "none";

  if (canvasPocket.classList.contains("active")) {
    drawTextIfEmpty();
  }
}

openCanvasBtn.addEventListener("click", toggleCanvas);
closeCanvasBtn.addEventListener("click", toggleCanvas);

function drawTextIfEmpty() {
  if (canvasStones.length === 0) {
    ctx.font = "15px Arial";
    ctx.fillStyle = "#B3B3B3";
    ctx.textAlign = "center";
    ctx.fillText("Click and add stones", canvas.width / 2, canvas.height / 2);
  }
}

function drawStones() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (canvasStones.length === 0) {
    drawTextIfEmpty();
  } else {
    canvasStones.forEach((stone) => {
      ctx.drawImage(stone.img, stone.x, stone.y, stone.width, stone.height);
    });
  }
}

function getRandomPosition(imgWidth, imgHeight) {
  let isOverlapping;
  let randomX, randomY;

  do {
    // Generate random X and Y positions
    randomX = Math.random() * (canvas.width - imgWidth);
    randomY = Math.random() * (canvas.height - imgHeight);

    // Check if the position overlaps with preloaded images
    isOverlapping = [...document.querySelectorAll(".preloaded-image")].some((preloaded) => {
      const rect = preloaded.getBoundingClientRect();
      const buffer = 20; // Optional buffer to prevent images from being too close

      return randomX < rect.left + rect.width + buffer && randomX + imgWidth > rect.left - buffer && randomY < rect.top + rect.height + buffer && randomY + imgHeight > rect.top - buffer;
    });

    // Also check for overlap with already placed artworks
    if (!isOverlapping) {
      isOverlapping = placedArtworks.some((artwork) => {
        const buffer = 20;
        return randomX < artwork.x + artwork.width + buffer && randomX + imgWidth > artwork.x - buffer && randomY < artwork.y + artwork.height + buffer && randomY + imgHeight > artwork.y - buffer;
      });
    }
  } while (isOverlapping); // Keep generating positions until no overlap is found

  return { x: randomX, y: randomY };
}

stones.forEach((stone) => {
  stone.addEventListener("click", (e) => {
    const img = new Image();
    img.src = e.target.src;

    img.onload = () => {
      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;
      const maxSize = 65;
      const aspectRatio = originalWidth / originalHeight;
      let newWidth, newHeight;

      if (originalWidth > originalHeight) {
        newWidth = maxSize;
        newHeight = maxSize / aspectRatio;
      } else {
        newHeight = maxSize;
        newWidth = maxSize * aspectRatio;
      }

      const randomPosition = getRandomPosition(newWidth, newHeight);

      canvasStones.push({
        img: img,
        x: randomPosition.x,
        y: randomPosition.y,
        width: newWidth,
        height: newHeight,
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
  return mousePos.x >= stone.x && mousePos.x <= stone.x + 50 && mousePos.y >= stone.y && mousePos.y <= stone.y + 50;
}

canvas.addEventListener("mousedown", (e) => {
  const mousePos = getMousePos(canvas, e);
  for (let i = 0; i < canvasStones.length; i++) {
    if (isMouseOnStone(mousePos, canvasStones[i])) {
      isDragging = true;
      dragIndex = i;
      offsetX = mousePos.x - canvasStones[i].x;
      offsetY = mousePos.y - canvasStones[i].y;
      break;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const mousePos = getMousePos(canvas, e);
    canvasStones[dragIndex].x = mousePos.x - offsetX;
    canvasStones[dragIndex].y = mousePos.y - offsetY;
    drawStones();
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
  dragIndex = -1;
});

let positionIndex = 0; // 현재 좌표 인덱스를 저장하는 변수
const positions = [
  { x: 490, y: 300 }, // 첫 번째 좌표
  { x: 980, y: 550 }, // 두 번째 좌표
];

stackBtn.addEventListener("click", () => {
  // 캔버스 안내 메시지
  const message = messageInput.value.trim();
  if (!message && canvasStones.length === 0) {
    alert("Add something before stacking.");
    return;
  }

  const canvasPocket = document.getElementById("canvasPocket");

  if (canvasPocket.classList.contains("active")) {
    toggleCanvas();
  }

  const artworkImage = new Image();
  artworkImage.src = canvas.toDataURL("image/png");

  // 현재 좌표 인덱스를 사용하여 위치 지정
  const position = positions[positionIndex];
  const artworkElement = document.createElement("div");
  artworkElement.style.position = "absolute";
  artworkElement.style.width = "200px";
  artworkElement.style.marginBottom = "1rem";
  artworkElement.style.left = `${position.x}px`;
  artworkElement.style.top = `${position.y}px`;
  artworkElement.appendChild(artworkImage);

  if (message) {
    const tooltip = document.createElement("div");
    tooltip.textContent = message;
    tooltip.style.position = "fixed";
    tooltip.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
    tooltip.style.padding = "0.6rem 1rem";
    tooltip.style.borderRadius = "0.5rem";
    tooltip.style.display = "none";
    tooltip.style.zIndex = "100";
    tooltip.style.whiteSpace = "normal"; // 텍스트 줄바꿈
    tooltip.style.maxWidth = "20rem";
    tooltip.style.wordBreak = "break-word";

    document.body.appendChild(tooltip);

    artworkElement.addEventListener("mouseover", () => {
      tooltip.style.display = "block";
    });

    artworkElement.addEventListener("mousemove", (e) => {
      tooltip.style.top = `${e.clientY + 15}px`;
      tooltip.style.left = `${e.clientX + 15}px`;
    });

    artworkElement.addEventListener("mouseout", () => {
      tooltip.style.display = "none";
    });
  }

  collection.appendChild(artworkElement);

  // 다음 클릭 시 사용할 좌표로 인덱스를 변경
  positionIndex = (positionIndex + 1) % positions.length;

  canvasStones = [];
  drawStones();
  messageInput.value = "";
});

resetBtn.addEventListener("click", () => {
  canvasStones = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTextIfEmpty();
});

// Save artworks to localStorage
function saveToLocalStorage() {
  localStorage.setItem("placedArtworks", JSON.stringify(placedArtworks));
}

// Load artworks from localStorage and render them
function loadFromLocalStorage() {
  const savedArtworks = localStorage.getItem("placedArtworks");
  if (savedArtworks) {
    placedArtworks = JSON.parse(savedArtworks);

    placedArtworks.forEach((artwork) => {
      const artworkImage = new Image();
      artworkImage.src = artwork.src;

      const artworkElement = document.createElement("div");
      artworkElement.style.position = "absolute";
      artworkElement.style.width = "200px";
      artworkElement.style.left = `${artwork.x}px`;
      artworkElement.style.top = `${artwork.y}px`;
      artworkElement.appendChild(artworkImage);

      if (artwork.message) {
        const tooltip = document.createElement("div");
        tooltip.textContent = artwork.message;
        tooltip.style.position = "fixed";
        tooltip.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
        tooltip.style.padding = "0.6rem 1rem";
        tooltip.style.borderRadius = "0.5rem";
        tooltip.style.display = "none";
        tooltip.style.zIndex = "100";
        tooltip.style.whiteSpace = "normal"; // Allow text to wrap
        tooltip.style.maxWidth = "20rem"; // Max width is 20rem
        tooltip.style.wordBreak = "break-word"; // Break long words
        document.body.appendChild(tooltip);

        artworkImage.addEventListener("mouseover", () => {
          tooltip.style.display = "block";
        });

        artworkImage.addEventListener("mousemove", (e) => {
          tooltip.style.top = `${e.clientY + 15}px`;
          tooltip.style.left = `${e.clientX + 15}px`;
        });

        artworkImage.addEventListener("mouseout", () => {
          tooltip.style.display = "none";
        });
      }

      collection.appendChild(artworkElement);
    });
  }
}
