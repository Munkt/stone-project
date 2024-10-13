// Translations for English
const translations = {
  en: {
    p1: `Do you enjoy hiking? Ascend a Website offers a digital refuge from the endless scroll-down content we encounter daily. You’ve probably had the experience of casually opening an app, endlessly scrolling through content, and realizing that the sun has already begun to set. While the apps we use every day provide us with information and entertainment, their never-ending downhill flow gradually encroaches upon our daily lives. But what would a space look like that moves in the opposite direction from the familiar concept of scrolling down?`,
    p2: `Hiking is a strenuous activity that defies gravity as we make our way to the summit, but the reward at the top is a moment of peace, away from the chaos of everyday life, and a sense of accomplishment. At the peak, you’ll often find stone towers meticulously stacked by previous hikers, much like an entry in a guestbook. While we don’t always know the meaning behind these towers, the time and effort put into them reflect the sincerity of each person’s intent.`,
    p3: `What if we applied the concept of hiking to digital spaces, which are often designed to prioritize user convenience? In this space, instead of scrolling down, you embark on an upward journey. As users ascend, they collect stones, which they can use to build their own tower at the summit. What stones you choose and how you construct your tower is entirely up to you. Through this process, visitors can leave their mark on the site and connect loosely with others who have made the same ascent.`,
  },
  ko: {
    p1: `등산 좋아하시나요? Ascend a Website는 끊임없이 스크롤 다운하는 콘텐츠에서의 디지털 </br>
    도피처입니다. 앱을 무심코 켜고 들어가서, 콘텐츠를 끊임없이 스크롤 다운했더니 어느새 해가 </br>
    뉘엿뉘엿 저물어 있는 경험을 해본 적이 있을 겁니다. 우리가 매일 접속하는 앱은 여러 가지 정보와 </br>
    재미를 제공하지만, 그들이 만들어 놓은 끝없는 내리막길은 우리의 일상을 조금씩 잠식해 가고 </br>
    있습니다. 우리에게 익숙한 스크롤 다운 개념과 반대되는 공간은 어떤 모습일까요?`,

    p2: `등산은 중력을 거슬러 정상을 향해 올라가는 고생스러운 일이지만, 그 끝에서 일상의 번잡함에서 </br>
    벗어나 잠시 숨을 고르고 뿌듯함을 느낄 수 있습니다. 정상에는 이 길을 다녀간 사람들이 방명록처럼 </br>
    쌓아놓은 돌탑들이 빼곡히 서 있습니다. 어떤 의미가 깃들어 있는지 알 수 없지만, 오랜 시간 </br>
    공들인 만큼 저마다의 간절함이 담겨있다는 것을 알 수 있습니다.`,

    p3: `사용자 중심의 편리함을 강조하는 디지털 공간 속에서 등산이라는 행동을 대입해 보면 어떨까요.</br>
    우리에게 익숙한 스크롤 다운 방식이 아닌, 그 반대의 여정입니다. 사용자는 오르며 돌을 모으고, </br>
    정상에서 그 돌로 자신만의 탑을 쌓습니다. 어떤 돌을 선택하고 어떤 방식으로 탑을 쌓을지는 </br>
    전적으로 방문자의 몫입니다. 이러한 방식으로 사이트를 다녀간 사람들은 방문의 흔적을 남기고 </br>
    느슨하게 연결될 수 있습니다.`,
  },
};

// Function to switch language
function switchLanguage(lang) {
  // Update the content based on the selected language
  document.getElementById("p1").innerHTML = translations[lang].p1;
  document.getElementById("p2").innerHTML = translations[lang].p2;
  document.getElementById("p3").innerHTML = translations[lang].p3;

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
