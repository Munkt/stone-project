//parallax effect
document.addEventListener("mousemove", parallax);
function parallax(event) {
  this.querySelectorAll(".parallax-wrap span").forEach((shift) => {
    const position = shift.getAttribute("value");
    const x = (window.innerWidth - event.pageX * position) / 90;
    const y = (window.innerWidth - event.pageY * position) / 90;

    shift.style.transform = `translate(${x}px) translateY(${y}px)`;
  });
}
//start page from bottom
function scrollBottom() {
  window.scrollTo(0, 99999);
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", scrollBottom, false);
else if (window.attachEvent) window.attachEvent("onload", scrollBottom);

//move stone
document.addEventListener("DOMContentLoaded", () => {
  const stones = document.querySelectorAll(".stones img"); // Select stone images

  stones.forEach((stone) => {
    stone.addEventListener("click", () => {
      const index = stone.getAttribute("data-index");
      const container = document.querySelector(`.stoneContainer .container[data-index="${index}"]`);

      if (container && container.childElementCount === 0) {
        // Clone the stone
        const clone = stone.cloneNode(true);

        // Append the clone to the container
        container.appendChild(clone);

        // Resize the clone to fit the container
        clone.style.width = "100%";
        clone.style.height = "100%";
        clone.style.objectFit = "contain";

        // Reset position styles for the clone
        clone.style.position = "static";
        clone.style.top = "0";
        clone.style.left = "0";

        // Optionally hide the original stone
        stone.style.visibility = "hidden";
      }
    });
  });
});

document.addEventListener("scroll", () => {
  const pocket = document.querySelector(".pocket");
  if (window.scrollY < 15900) {
    pocket.style.right = "2rem";
  } else {
    pocket.style.right = "-20rem";
  }
});

//click for more
document.addEventListener("DOMContentLoaded", () => {
  const introElements = document.querySelectorAll(".intro");
  const clickMore = document.getElementById("clickformore");
  let currentIntroIndex = 0;

  // Initially hide all intro elements except the first one
  introElements.forEach((intro, index) => {
    if (index !== 0) {
      intro.style.display = "none";
    }
  });

  clickMore.addEventListener("click", () => {
    if (currentIntroIndex < introElements.length - 1) {
      currentIntroIndex++;
      introElements[currentIntroIndex].style.display = "block"; // Show the next intro element
    }

    // If the last element is shown, hide the clickMore button
    if (currentIntroIndex === introElements.length - 1) {
      clickMore.style.display = "none";
    }
  });
});

function checkWindowSize() {
  const mobileMessage = document.querySelector(".mobile-message");
  if (window.innerWidth < 768) {
    // 가로 768px 이하일 때 메시지 표시
    mobileMessage.style.display = "flex";
    document.body.style.overflow = "hidden"; // 모바일에서 다른 내용 스크롤 방지
  } else {
    mobileMessage.style.display = "none";
    document.body.style.overflow = "auto"; // 데스크탑에서는 스크롤 가능하게
  }
}

// 초기 로딩 시 사이즈 체크
checkWindowSize();

// 창 크기 변경 시마다 사이즈 체크
window.addEventListener("resize", checkWindowSize);
