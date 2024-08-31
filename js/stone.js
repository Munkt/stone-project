const myStones = document.getElementsByClassName("stone");
const movePocket = document.getElementById("pocket_container");
const originalParent = document.body;

function moveStone(event) {
  const stone = event.target.closest(".stone");
  if (stone.parentElement === movePocket) {
    originalParent.appendChild(stone);
  } else {
    movePocket.appendChild(stone);
  }
}

function removeStone(event) {}
// HTMLCollection을 배열로 변환 후 각 요소에 이벤트 리스너 추가
Array.from(myStones).forEach((stone) => {
  stone.addEventListener("click", moveStone);
});
