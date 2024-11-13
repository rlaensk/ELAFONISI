document.addEventListener("DOMContentLoaded", () => {
  //scroll시 heder 유지, 변경
  const $header = document.querySelector("header");
  const $logoImg = document.querySelector("#logo img");
  const $kakaoIcon = document.querySelector(".kakaoIcon img");
  const $instarIcon = document.querySelector(".instarIcon img");
  const $hrv_btn = document.querySelector(".hrv_btn");
  const $hambergerMenu = document.querySelector(".hambergerMenu");
  const $hamOneLine = document.querySelector(".oneLine");
  const $hamtwoLine = document.querySelector(".twoLine");
  const $hamthreeLine = document.querySelector(".threeLine");
  const $hamtwoText = document.querySelector(".twoLineText");
  const $reservation = document.querySelector(".reservation");
  let currentIndex = 0;
  const $nav = document.querySelector("nav");
  const $headerDiv = document.querySelector("header div");
  const headerchangeAfter = () => {
    $logoImg.src = "./image/logo_off.png";
    $kakaoIcon.src = "./image/kakao.png";
    $instarIcon.src = "./image/instargram_02.png";
    $hrv_btn.src = "./image/hrv_btn.png";
    $header.style.backgroundColor = "white";
    $header.style.borderBottom = "1px solid lightgray";
    $hambergerMenu.style.backgroundColor = "#0f4480";
    $hamOneLine.classList.add("activeOneLine");
    $hamthreeLine.classList.add("activeThreeLine");
    $hamtwoLine.classList.add("activeTwoLine");
    $hamtwoText.classList.add("activeTwoLineText");
    $reservation.style.borderLeft = "1px solid #0f4480";
  };

  const headerchangeRemove = () => {
    $logoImg.src = "./image/logo_on.png";
    $kakaoIcon.src = "./image/kakao_white.png";
    $instarIcon.src = "./image/instargram_white.png";
    $hrv_btn.src = "./image/hrv_btn_white.png";
    $header.style.backgroundColor = "white";
    $header.style.backgroundColor = "transparent";
    $hambergerMenu.style.backgroundColor = "transparent";
    $hamOneLine.classList.remove("activeOneLine");
    $hamthreeLine.classList.remove("activeThreeLine");
    $hamtwoLine.classList.remove("activeTwoLine");
    $hamtwoText.classList.remove("activeTwoLineText");
    $reservation.style.borderLeft = "1px solid white";
  };

  window.addEventListener("scroll", () => {
    //메뉴가 열려있으면 헤더 상태 변경 안함
    if (isMenuOpen) return;

    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (scrollPosition > 100) {
      headerchangeAfter();
    } else {
      headerchangeRemove();
    }
  });

  //hanberger클릭시 nav Open,헤더 변경
  let hambergerCount = 0; // 초기화
  let scrollPosition = 0; // 스크롤 위치 초기화
  let isMenuOpen = false; // 메뉴가 열렸는지 여부 플래그
  let $ham_NavBox = document.querySelector("#ham_navBox");
  let hambercerMenuOpen = () => {
    $nav.style.transform = "translateY(0)";
    $nav.style.zIndex = 100;
    $hamtwoText.innerHTML = "CLOSE";
    $nav.style.opacity = 1;
    $headerDiv.style.marginLeft = "0px";
  };
  console.log(hambergerCount);
  $hambergerMenu.addEventListener("click", function () {
    if (hambergerCount === 0) {
      hambergerCount++;
    } else {
      hambergerCount--;
    }
    if (hambergerCount != 0) {
      // 스크롤 위치 저장

      scrollPosition = window.scrollY;
      console.log("Scroll Position Saved:", scrollPosition);

      // 헤더 고정
      $header.style.position = "fixed";
      $header.style.top = "0";
      $header.style.left = "0";
      $header.style.width = "100%";

      // 바디 고정 및 스크롤 잠금
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";

      isMenuOpen = true; // 메뉴 열림 상태 플래그 설정

      // 메뉴 열기
      hambercerMenuOpen();
      // 헤더 상태 변경
      if (currentIndex >= 0) {
        headerchangeAfter();
      }
    } else {
      // 스크롤 잠금 해제
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("width");

      // 스크롤 위치 복원
      window.scrollTo({
        top: scrollPosition,
        behavior: "instant",
      });

      // 메뉴 닫기
      headerchangeRemove();

      $nav.style.transform = "translateY(-111%)";
      $hamtwoText.innerHTML = "MENU";
      $nav.style.opacity = 0;
      $headerDiv.style.marginLeft = "10px";
      hambergerCount;
      isMenuOpen = false; // 메뉴 열림 상태 플래그 설정
    }
  });

  //nav메뉴 클릭시 그 하위 메뉴 나타남
  const $navList = document.querySelectorAll(".nav_text");
  const $navHidden = document.querySelectorAll(".nav_hiddenMeun");

  $navList.forEach((nav, index) => {
    nav.addEventListener("click", () => {
      const hiddenMenu = $navHidden[index];

      $navHidden.forEach((menu, menuIndex) => {
        if (menuIndex !== index) {
          menu.style.height = "0px";
        }
      });
      if (hiddenMenu.style.height === "0px" || hiddenMenu.style.height === "") {
        // 요소의 실제 높이 계산
        hiddenMenu.style.height = "auto";
        const height = hiddenMenu.scrollHeight + "px"; // auto상태에서 실제높이 계산
        hiddenMenu.style.height = "0px"; // 0으로 초기화
        void hiddenMenu.offsetHeight; // 강제로 reflow 발생
        hiddenMenu.style.height = height; // 실제 높이로 설정
      } else {
        hiddenMenu.style.height = hiddenMenu.scrollHeight + "px"; //현재 높이를 정확히 설정
        void hiddenMenu.offsetHeight; // 강제로 reflow 발생
        hiddenMenu.style.height = "0px"; // 0으로 초기화
      }
    });
  });
});
