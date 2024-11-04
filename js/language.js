// Translations for English
const translations = {
  en: {
    p1: `This site starts from the bottom, not the top. </br>
    So, instead of scrolling down, “scroll up.” Ascend as if hiking, </br>
    collecting stones along the way, and at the peak, build your own tower.</br>
     Rediscover the digital space with this simple reversal.`,

    p2: `We've all mindlessly scrolled on our phones, only to find the day </br>
    slipping away. The small screen offers endless information and fun, </br>
    yet its downward path slowly takes over our lives. Going down is easy,</br>
    but rarely do we rise within that small screen.`,

    p3: `Think of hiking. It’s about defying gravity, an effortful journey.</br>
    Yet only those who reach the summit can see the view and the stone</br>
    towers left behind by others. There’s a vitality felt only at the end </br>
    of this hard-earned climb.`,

    p4: `Make the climb on this site; pick up stones along the way.</br>
     In a world of scrolling down, experience a unique "scroll-up" journey </br>
     and express your energy by leaving your stone tower. Let’s meet up there!`,
  },
  ko: {
    p1: `이 사이트는 위가 아닌 아래에서부터 시작합니다. 그러니 ‘스크롤 다운’ 대신, ‘스크롤 업’.</br>
    등산하듯 올라가 보세요. 올라가는 길에 돌을 수집하고, 정상에 도달하면 자신만의 탑을</br>
    쌓을 수 있습니다. 평소와 다른 하나의 행동을 통해, 디지털 공간을 다시 인식해 보세요.`,

    p2: `무심코 핸드폰을 켜고 끝없이 스크롤을 내리다 해가 뉘엿뉘엿 지는 하루 끝을 </br>
    맞이한 경험, 모두 있을 겁니다. 작은 화면 속 세상은 우리에게 수많은 여러 가지 정보와 </br>
    재미를 제공하지만, 그것이 만들어놓은 끝없는 내리막길은 우리의 일상을 잠식해 가고 있죠. </br>
    내려가는 것은 참 쉬운데, 그 작은 화면 속에서 좀처럼 올라가진 않습니다. `,

    p3: `그러나 등산을 떠올려보세요. 등산은 중력을 거슬러 위로 올라가는 일입니다.</br>
    그야말로 사서 고생하는 일이죠. 하지만 정상에 오른 자만 볼 수 있는 절경과,</br>
    그들이 방명록처럼 남긴 빼곡한 돌탑을 바라보면 일종의 활력이 느껴지곤 합니다.</br>
    애써 오른 행위 끝에야만 느낄 수 있는 무언가 가요.`,

    p4: `이 사이트를 애써 ‘올라가'보세요. 올라가는 길에 돌도 주워보시고요.</br>
    ‘스크롤 다운'하는 일상 속에서 ‘스크롤 업'을 해낸 당신만의 경험과 </br>
    생기(生氣)를 돌탑으로 표현해 남겨주세요. 우리 저기 위에서 만납시다. `,
  },
};

// Function to switch language
function switchLanguage(lang) {
  // Update the content based on the selected language
  document.getElementById("p1").innerHTML = translations[lang].p1;
  document.getElementById("p2").innerHTML = translations[lang].p2;
  document.getElementById("p3").innerHTML = translations[lang].p3;
  document.getElementById("p4").innerHTML = translations[lang].p4;

  localStorage.setItem("language", lang); // Save the selected language in localStorage
}

// Load language from localStorage on page load
window.onload = function () {
  const savedLanguage = localStorage.getItem("language") || "ko"; // Default to Korean if not set
  switchLanguage(savedLanguage);
};

// Add event listeners for language switcher buttons
document.getElementById("lang-en").addEventListener("click", () => switchLanguage("en"));
document.getElementById("lang-ko").addEventListener("click", () => switchLanguage("ko"));
