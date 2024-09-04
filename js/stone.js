// const myStones = document.getElementsByClassName("stone");
// const myPocket = document.getElementById("pocket_container");
// const originalPositions = {};

// function moveStone(event) {
//   const stone = event.target.closest(".stone");
//   if (stone.parentElement === myPocket) {
//     //돌이 pocket에 있는 경우 원래 위치로 돌려놓기
//     const originalPosition = originalPositions[stone];
//     originalPosition.appendChild(stone);
//     stone.classList.remove("in-pocket"); //css에
//   } else {
//     //돌을 pocket으로 이동
//     originalPositions[stone] = stone.parentElement; // 원래 위치 저장
//     myPocket.appendChild(stone);
//     stone.classList.add("in-pocket");
//   }
// }

// // // HTMLCollection을 배열로 변환 후 각 요소에 이벤트 리스너 추가
// Array.from(myStones).forEach((stone) => {
//   stone.addEventListener("click", moveStone);
// });
