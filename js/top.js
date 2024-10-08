const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const stickerContainer = document.getElementById("stoneContainer2");
const messageInput = document.getElementById("message");
const stackBtn = document.getElementById("stack");
const resetBtn = document.getElementById("reset");
const collection = document.getElementById("collection");
const stones = document.querySelectorAll(".stone");

let canvasStones = [];
let isDragging = false;
let dragIndex = -1;
let offsetX, offsetY;

function toggleCanvas() {
  // 캔버스를 열고 닫는 함수
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
  // 안내 문구를 그리는 함수
  if (canvasStones.length === 0) {
    ctx.font = "15px Arial";
    ctx.fillStyle = "#B3B3B3";
    ctx.textAlign = "center";
    ctx.fillText("Add stones to start stacking", canvas.width / 2, canvas.height / 2);
  }
}

function drawStones() {
  // Clear the canvas before redrawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (canvasStones.length === 0) {
    // If no stones are placed, show the guide text
    drawTextIfEmpty();
  } else {
    canvasStones.forEach((stone) => {
      ctx.drawImage(stone.img, stone.x, stone.y, stone.width, stone.height);
    });
  }
}

function getRandomPosition(imgWidth, imgHeight) {
  const x = Math.random() * (canvas.width - imgWidth);
  const y = Math.random() * (canvas.height - imgHeight);
  return { x, y };
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
      // Get the original width and height of the image
      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;

      // Define the max size for the image on the canvas (you can adjust this)
      const maxSize = 50;

      // Calculate the aspect ratio
      const aspectRatio = originalWidth / originalHeight;

      // Calculate the new width and height based on the aspect ratio
      let newWidth, newHeight;
      if (originalWidth > originalHeight) {
        newWidth = maxSize;
        newHeight = maxSize / aspectRatio;
      } else {
        newHeight = maxSize;
        newWidth = maxSize * aspectRatio;
      }

      // Get random position for the stone
      const randomPosition = getRandomPosition(newWidth, newHeight);

      // Push the stone image to the canvasStones array
      canvasStones.push({
        img: img,
        x: randomPosition.x,
        y: randomPosition.y,
        width: newWidth,
        height: newHeight,
      });

      // Redraw the canvas with the new stone
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

  // Check if mouse is on any stone
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

let placedArtworks = []; // Track positions and dimensions of placed artworks

stackBtn.addEventListener("click", () => {
  const message = messageInput.value.trim(); // Get message input value
  if (!message && canvasStones.length === 0) {
    alert("Add a something before stacking.");
    return;
  }

  const artworkImage = new Image();
  artworkImage.src = canvas.toDataURL("image/png");

  const artworkElement = document.createElement("div"); // Create a div to hold the image
  artworkElement.style.position = "absolute"; // Allow random positioning
  artworkElement.style.width = "200px"; // Set fixed width for the artwork
  artworkElement.style.marginBottom = "1rem"; // Add some space between stacked items

  let randomX, randomY;
  let isOverlapping = true;

  // Check for overlap and regenerate position if needed
  do {
    // Generate random X and Y within the new collection dimensions
    randomX = Math.random() * (document.documentElement.clientWidth * 2 - 220); // 200vw width
    randomY = Math.random() * (window.innerHeight - 240); // 100vh height

    // Check if new artwork overlaps with any placed artwork
    isOverlapping = placedArtworks.some((artwork) => {
      const buffer = 20; // Add a small buffer to prevent near overlaps
      return randomX < artwork.x + artwork.width + buffer && randomX + 200 > artwork.x - buffer && randomY < artwork.y + artwork.height + buffer && randomY + 200 > artwork.y - buffer;
    });
  } while (isOverlapping);

  // Store the new artwork's position and dimensions in placedArtworks
  placedArtworks.push({
    x: randomX,
    y: randomY,
    width: 200,
    height: 200,
  });

  artworkElement.style.left = `${randomX}px`; // Set final random X position
  artworkElement.style.top = `${randomY}px`; // Set final random Y position

  artworkElement.appendChild(artworkImage); // Add the canvas image

  if (message) {
    const tooltip = document.createElement("div"); // Create a tooltip element
    tooltip.textContent = message;
    tooltip.style.position = "fixed"; // Use fixed positioning for tooltip
    tooltip.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    tooltip.style.width = "10rem";
    tooltip.style.padding = "5px 10px";
    tooltip.style.border = "1px solid #ddd";
    tooltip.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.2)";
    tooltip.style.display = "none"; // Hide tooltip initially
    tooltip.style.zIndex = "100"; // Ensure it stays on top
    document.body.appendChild(tooltip); // Add tooltip to the document body

    // Show tooltip on hover
    artworkImage.addEventListener("mouseover", () => {
      tooltip.style.display = "block";
    });

    // Move the tooltip with the mouse
    artworkImage.addEventListener("mousemove", (e) => {
      tooltip.style.top = `${e.clientY + 15}px`; // 15px offset from the mouse
      tooltip.style.left = `${e.clientX + 15}px`; // 15px offset from the mouse
    });

    // Hide the tooltip when the mouse leaves the image
    artworkImage.addEventListener("mouseout", () => {
      tooltip.style.display = "none";
    });
  }

  collection.appendChild(artworkElement); // Add the artwork to the collection

  canvasStones = [];
  drawStones();
  messageInput.value = ""; // Clear message input
});

resetBtn.addEventListener("click", () => {
  canvasStones = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTextIfEmpty();
});
