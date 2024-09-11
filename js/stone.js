const myStones = document.getElementsByClassName("stone");
const myPocket = document.getElementById("pocket_container");
const myCanvas = document.getElementById("stoneStacker");
const ctx = myCanvas.getContext("2d"); // 2D context

const btnBar = document.getElementById("button_bar");
const btnBar2 = document.getElementById("button_bar2");
const openCanvasBtn = document.getElementById("openCanvas_btn");
const closeCanvasBtn = document.getElementById("closeCanvas_btn");
const originalPositions = {};
const maxStoneCount = 5;

//문서를 맨 아래에서부터 시작
function scrollBottom() {
  window.scrollTo(0, 99999);
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", scrollBottom, false);
else if (window.attachEvent) window.attachEvent("onload", scrollBottom);

function moveStone(event) {
  const stone = event.target.closest(".stone");
  const currentStoneCount = myPocket.children.length;

  if (stone.parentElement === myPocket) {
    // Move stone back to its original position
    const originalPosition = originalPositions[stone];
    originalPosition.appendChild(stone);
    stone.classList.remove("in-pocket");
  } else {
    if (currentStoneCount >= maxStoneCount) {
      alert("Your pocket is too heavy!! (°◇°;)");
      return;
    }
    // Move the stone to the pocket
    originalPositions[stone] = stone.parentElement;
    myPocket.appendChild(stone);
    stone.classList.add("in-pocket");
  }
}

function openCanvas() {
  myCanvas.style.display = "block";
  btnBar2.style.display = "block";
  btnBar.style.display = "none";
}

function showOpenCanvasBtn() {
  if (window.scrollY === 0) {
    openCanvasBtn.style.display = "block";
  } else {
    openCanvasBtn.style.display = "none";
  }
}

function closeCanvas() {
  myCanvas.style.display = "none";
  btnBar2.style.display = "none";
  btnBar.style.display = "inline";
}

// HTMLCollection을 배열로 변환 후 각 요소에 이벤트 리스너 추가
Array.from(myStones).forEach((stone) => {
  stone.addEventListener("click", moveStone);
});

//스크롤 이벤트 추가
window.addEventListener("scroll", showOpenCanvasBtn);

// 버튼 열고 닫기
openCanvasBtn.addEventListener("click", openCanvas);
closeCanvasBtn.addEventListener("click", closeCanvas);
