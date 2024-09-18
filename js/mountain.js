document.addEventListener("mousemove", parallax);
function parallax(event) {
  this.querySelectorAll(".parallax-wrap span").forEach((shift) => {
    const position = shift.getAttribute("value");
    const x = (window.innerWidth - event.pageX * position) / 90;
    const y = (window.innerWidth - event.pageY * position) / 90;

    shift.style.transform = `translate(${x}px) translateY(${y}px)`;
  });
}

function scrollBottom() {
  window.scrollTo(0, 99999);
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", scrollBottom, false);
else if (window.attachEvent) window.attachEvent("onload", scrollBottom);
