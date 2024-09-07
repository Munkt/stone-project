//작동 안함 https://github.com/geosigno/simpleParallax.js
// import SimpleParallax from "simple-parallax-js/vanilla";
// const image = document.getElementsByClassName("parallax_up");
// new SimpleParallax(image);

const myStones = document.getElementsByClassName("stone");
const myPocket = document.getElementById("pocket_container");
const stoneStackerCanvas = document.getElementById("stoneStacker");
const pocketHideBtn = document.getElementById("hidePocket_btn");
const openCanvasBtn = document.getElementById("openCanvas_btn");
const originalPositions = {};
const maxStoneCount = 3;

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
    //돌이 pocket에 있는 경우 원래 위치로 돌려놓기
    const originalPosition = originalPositions[stone];
    originalPosition.appendChild(stone);
    stone.classList.remove("in-pocket"); //css에
  } else {
    if (currentStoneCount >= maxStoneCount) {
      alert("주머니가 너무 무거워요! (°◇°;)");
      return;
    }
    //돌을 pocket으로 이동
    originalPositions[stone] = stone.parentElement; // 원래 위치 저장
    myPocket.appendChild(stone);
    stone.classList.add("in-pocket");
    document;
  }
}

function pocketHide() {
  const myBigPocket = document.getElementById("pocket");
  if (myBigPocket.style.display === "none") {
    myBigPocket.style.display = "block";
    document.getElementById("hidePocket_btn").innerText = "close";
  } else {
    myBigPocket.style.display = "none";
    document.getElementById("hidePocket_btn").innerText = "open";
  }
}

function openCanvas() {
  stoneStackerCanvas.style.display = "block";
}

// HTMLCollection을 배열로 변환 후 각 요소에 이벤트 리스너 추가
Array.from(myStones).forEach((stone) => {
  stone.addEventListener("click", moveStone);
});
// 버튼 열고 닫기
pocketHideBtn.addEventListener("click", pocketHide);
openCanvasBtn.addEventListener("click", openCanvas);
