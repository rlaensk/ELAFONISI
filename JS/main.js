//새로고침 시 맨위로 이동
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
document.addEventListener("DOMContentLoaded", () => {
  const $contentBox = document.querySelectorAll(".fullpageBox");
  const $fullpageBtn = document.querySelectorAll(".fullNav .fullNavAlink");
  const $fullpageNav = document.querySelector(".fullPageNav");
  const $slideImgBox = document.querySelector(".fullpageBox");
  const $slideImgBtn = document.querySelectorAll(".slideBtn");
  const $fullpageNavSpans = document.querySelectorAll(".fullNav .fullNavAlink");
  const $kakaoRv = document.querySelector("#kakaoRv");

  let currentIndex = 0;
  let isScrolling = false;

  //FULL PAGE SCROLL EVENT
  document.addEventListener("wheel", (event) => {
    if (isScrolling) return;
    isScrolling = true;

    const clientHeight = innerHeight;

    if (event.deltaY > 0) {
      $kakaoRv.style.transform = "translateX(0)";

      if (currentIndex < $contentBox.length - 1) {
        currentIndex++;
        window.scrollTo({
          top: clientHeight * currentIndex,
          behavior: "smooth",
        });
      } else if (currentIndex === $contentBox.length - 1) {
        $fullpageNav.style.transform = "translateY(-100%)";
        $fullpageNav.style.transition = "transform 0.5s ease";
      }
    } else if (event.deltaY < 0) {
      if (currentIndex > 0) {
        currentIndex--;
        window.scrollTo({
          top: clientHeight * currentIndex,
          behavior: "smooth",
        });
      } else {
        $kakaoRv.style.transform = "translateX(220px)";
      }

      if (currentIndex < $contentBox.length - 1) {
        $fullpageNav.style.transform = "translateY(0)";
        $fullpageNav.style.transition = "transform 1s ease";
      }
    }

    updateNavigationColors($fullpageBtn);

    setTimeout(() => {
      isScrolling = false;
    }, 300);
  });

  //스크롤시 fullpageNav text변경
  const navItem = document.querySelectorAll(
    ".fullNav1, .fullNav2, .fullNav3, .fullNav4, .fullNav5, .fullNav6 , .fullNav7"
  );
  // currentIndex값 업데이트
  document.addEventListener("scroll", () => {
    navItem.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.add("active");
        if (index === 2) {
          item.classList.add("activeColor");
        }
      } else {
        item.classList.remove("active");
      }
    });
  });

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

  let hambergerCount = 0; // 초기화
  let scrollPosition = 0; // 스크롤 위치 초기화
  let isMenuOpen = false; // 메뉴가 열렸는지 여부 플래그

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

  $hambergerMenu.addEventListener("click", function () {
    if (hambergerCount === 0) {
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
      hambergerCount++;
      isMenuOpen = true; // 메뉴 열림 상태 플래그 설정

      // 메뉴 열기
      $nav.style.transform = "translateY(0)";
      $hamtwoText.innerHTML = "CLOSE";
      $nav.style.opacity = 1;
      $headerDiv.style.marginLeft = "0px";
      //메뉴 열리면 Nav 사라지기
      $fullpageNav.style.display = "none";

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
      //fullpageNav 보이기
      $fullpageNav.style.display = "flex";
      $nav.style.transform = "translateY(-111%)";
      $hamtwoText.innerHTML = "MENU";
      $nav.style.opacity = 0;
      $headerDiv.style.marginLeft = "10px";
      hambergerCount--;
      isMenuOpen = false; // 메뉴 열림 상태 플래그 설정
    }
  });

  // 네비게이션 버튼 클릭 이벤트
  $fullpageBtn.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = index;
      window.scrollTo({
        top: window.innerHeight * currentIndex,
        behavior: "smooth",
      });
      updateNavigationColors($fullpageBtn);
    });
  });

  const updateNavigationColors = (btn) => {
    btn.forEach((button, index) => {
      // 공통 스타일 설정
      if (index !== 2) {
        // 2번째 페이지가 아닌 경우
        button.style.backgroundColor =
          index === currentIndex ? "white" : "#ffffff38";
        button.style.borderColor = "#ffffff38"; // 기본 border 색상
      } else {
        // 2번째 페이지인 경우
        button.style.backgroundColor =
          index === currentIndex ? "lightgray" : "#ffffff38";
        button.style.borderColor =
          index === currentIndex ? "lightgray" : "#ffffff38";
      }
    });

    // 2번째 페이지일 때 nav의 왼쪽 줄과 나머지 버튼들의 border 색상 변경
    if (currentIndex === 2) {
      $fullpageNav.style.borderLeft = "1px solid lightgray"; // 왼쪽 줄 색상 변경
      btn.forEach((button) => {
        button.style.borderColor = "lightgray"; // 버튼 border 색상 변경
      });
    } else {
      // 2번째 페이지가 아닐 때 기본 상태로 복구
      $fullpageNav.style.borderLeft = "1px solid white";
    }
  };

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

  // mainsliderImg slide
  let imgCurrentIndex = 0;
  $slideImgBtn.forEach((button, index) => {
    button.addEventListener("click", () => {
      imgCurrentIndex = index;
      $slideImgBox.style.transform = `translateX(-${imgCurrentIndex * 100}vw)`;
      $slideImgBox.style.transition = "all 1s";
      // updateNavigationColors($slideImgBtn);
      $slideImgBtn.forEach((button) => {
        button.classList.remove("active");
      });
      button.classList.add("active");
    });
  });

  //main video play,pause Btn
  const $video = document.querySelector(".bg");
  const $playPauseBtn = document.querySelector("#playPauseBtn");
  const $nextBtn = document.querySelector(".nextBtn");
  const totalSlide = $slideImgBox.children.length;

  //재생 버튼 클릭하면 정지, 정지버튼 클릭하면 재생
  $playPauseBtn.addEventListener("click", () => {
    if ($video.paused) {
      $video.play();
      $playPauseBtn.classList.remove("play");
      $playPauseBtn.classList.add("pause");
    } else {
      $video.pause();
      $playPauseBtn.classList.remove("pause");
      $playPauseBtn.classList.add("play");
    }
  });

  $nextBtn.addEventListener("click", () => {
    if (imgCurrentIndex < totalSlide - 1) {
      //슬라이드가 마지막에 도달했는지 확인
      imgCurrentIndex++;

      $slideImgBtn.forEach((button) => {
        button.classList.remove("active");
      });
      $slideImgBtn[imgCurrentIndex].classList.add("active");
    } else {
      imgCurrentIndex = 0; // 마지막 슬라이드에서 첫번쨰 슬라이드로 이동
    }

    $slideImgBox.style.transform = `translateX(-${imgCurrentIndex * 100}vw)`;
    $slideImgBox.style.transition = "all 2s";
  });

  // Day OR NIGHT
  const $imgBox = document.querySelector("#imgBox");
  const $dayBtn = document.querySelector(".day");
  const $nightBtn = document.querySelector(".night");
  const $changeBtn = document.querySelectorAll(".changeBtn button");
  const $dayafter = window.getComputedStyle($dayBtn, "::after");

  //day버튼을 클릭하면 Daytime추가되고, night버튼을 클릭하면 Night클래스 추가됨
  $changeBtn.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("day")) {
        $imgBox.classList.remove("Night");

        $imgBox.classList.add("Daytime");

        $dayBtn.classList.remove("opacity");
        $nightBtn.classList.add("opacity");
        $nightBtn.classList.remove("night-after-inline-block");
        $dayBtn.classList.add("day-after-inline-block");
      } else if (button.classList.contains("night")) {
        $imgBox.classList.remove("Daytime");

        $imgBox.classList.add("Night");

        $nightBtn.classList.remove("opacity");
        $dayBtn.classList.add("opacity");
        $dayBtn.classList.remove("day-after-inline-block");
        $nightBtn.classList.add("night-after-inline-block");
      }
    });
  });
});

//speialOffer
const $offerContent = document.querySelector(".offerContent");

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("./JS/data.json") // data.json으로 변경
    .then((response) => {
      const data = response.data;
      if (Array.isArray(data)) {
        // 올바르게 data로 수정
        data.forEach((offer) => {
          const template = `
            <dl>
              <dt><a href="/"><img src="${offer.image}" alt="${
            offer.title
          }" /></a></dt>
              <dd class='offerTitle'><a href="/"><h2>${
                offer.title
              }</h2></a></dd>
              <dd class='offerText'><a href="/">${offer.content1}</a></dd>
              <dd class='offerText'><a href="/">${
                offer.content2 || ""
              }</a></dd> <!-- content2가 없으면 빈 문자열 -->  
              <dd class='date'><strong>[등록일자] : </strong> ${offer.date}</dd>
            </dl>
          `;
          $offerContent.insertAdjacentHTML("beforeend", template);
        });
      } else {
        console.log("Data is not an array:", data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

//ACCOMMODATION

const $roomdiv = document.querySelectorAll(".roomdiv .imghover");
const $accommodationMoreseeBtn = document.querySelectorAll(".roomdiv .moerSee");
const $specialroomdiv = document.querySelectorAll(".specialBox .imghover");
const $specialMoreseeBtn = document.querySelectorAll(".specialBox  .moerSee");
//buttn Hover style change
const handleMoreBtnMouseEnter = (roomdiv, button) => {
  roomdiv.classList.add("hoverColor");
  roomdiv.style.transform = "scale(1.1)";
  button.classList.add("hoverBtn");
};
const handleMoreBtnMouseLeave = (roomdiv, button) => {
  roomdiv.classList.remove("hoverColor");
  roomdiv.style.transform = "scale(1)";
  button.classList.remove("hoverBtn");
};

$accommodationMoreseeBtn.forEach((button, index) => {
  const roomdiv = $roomdiv[index];
  if (roomdiv) {
    button.addEventListener("mouseenter", () => {
      handleMoreBtnMouseEnter(roomdiv, button);
    });
    button.addEventListener("mouseleave", () => {
      handleMoreBtnMouseLeave(roomdiv, button);
    });
  }
});

// section01

const $privateyPool = document.querySelector(".privateyPool");
const $infinityPool = document.querySelector(".infinityPool");
const $rooftopPool = document.querySelector(".roofTopPool");
const $infinityPoolHidden = document.querySelector(".infinityPool .hideWrap");
const $infinityPoolsmallBox = document.querySelector(
  ".infinityPool .hideencontent"
);
const $privateyPoolsmallBox = document.querySelector(
  ".privateyPool .hideencontent"
);
const $rooftopPoolsmallBox = document.querySelector(
  ".roofTopPool .hideencontent"
);
const $privateyPoolHidden = document.querySelector(".privateyPool .hideWrap");
const $rooftopPoolHidden = document.querySelector(".roofTopPool .hideWrap");
const $FTextBoxs = document.querySelectorAll(".FText");
const $imgHover = document.querySelector(".imghover");

function handleMouseEnter(
  activePool,
  hiddenBox,
  smallBox,
  activeWidth,
  orderWidth
) {
  //다른 풀의 크기 조정
  $infinityPool.style.width = orderWidth;
  $privateyPool.style.width = orderWidth;
  $rooftopPool.style.width = orderWidth;
  //숨겨진 박스 및 작은 박스 표시 설정
  $infinityPoolHidden.style.display = "none";
  $infinityPoolsmallBox.style.display = "flex";
  $privateyPoolsmallBox.style.display = "flex";
  $rooftopPoolsmallBox.style.display = "flex";
  //현재 활성화된 풀의 스타일 설정
  activePool.style.width = activeWidth;
  hiddenBox.style.display = "inline-block";
  smallBox.style.display = "none";
  //텍스트 박스의 높이 조정
  $FTextBoxs.forEach((textBox) => {
    if (activePool.contains(textBox)) {
      textBox.style.height = "0px";
      void textBox.offsetHeight;

      textBox.style.height = "50px";
    }
  });
}

function handleMouseLeave(
  activePool,
  hiddenBox,
  smallBox,
  activeWidth,
  orderWidth
) {
  $infinityPool.style.width = activeWidth;
  $privateyPool.style.width = orderWidth;
  $rooftopPool.style.width = orderWidth;

  hiddenBox.style.display = "none";
  smallBox.style.display = "flex";

  $FTextBoxs.forEach((textBox) => {
    if (activePool.contains(textBox)) {
      // 강제로 레이아웃 재계산을 트리거
      textBox.style.height = "0px"; // 기존 height 값으로 설정 (필요한 경우)

      // 강제로 reflow 발생
      void textBox.offsetHeight;

      // height를 0px로 변경하여 transition 효과 적용
      textBox.style.height = "0px";
    }
  });
}

$infinityPool.addEventListener("mouseenter", () => {
  handleMouseEnter(
    $infinityPool,
    $infinityPoolHidden,
    $infinityPoolsmallBox,
    "60vw",
    "22.5vw"
  );
});
$infinityPool.addEventListener("mouseleave", () => {
  handleMouseLeave(
    $privateyPool,
    $privateyPoolHidden,
    $privateyPoolsmallBox,
    "60vw",
    "22.5vw"
  );
});

$privateyPool.addEventListener("mouseenter", () => {
  handleMouseEnter(
    $privateyPool,
    $privateyPoolHidden,
    $privateyPoolsmallBox,
    "60vw",
    "22.5vw"
  );
});

$privateyPool.addEventListener("mouseleave", () => {
  handleMouseLeave(
    $privateyPool,
    $privateyPoolHidden,
    $privateyPoolsmallBox,
    "60vw",
    "22.5vw"
  );
});

$rooftopPool.addEventListener("mouseenter", () => {
  handleMouseEnter(
    $rooftopPool,
    $rooftopPoolHidden,
    $rooftopPoolsmallBox,
    "60vw",
    "22.5vw"
  );
});

$rooftopPool.addEventListener("mouseleave", () => {
  handleMouseLeave(
    $rooftopPool,
    $rooftopPoolHidden,
    $rooftopPoolsmallBox,
    "60vw",
    "22.5vw"
  );
});

$specialMoreseeBtn.forEach((button, index) => {
  const roomdiv = $specialroomdiv[index];

  if (roomdiv) {
    button.addEventListener("mouseenter", () => {
      handleMoreBtnMouseEnter(roomdiv, button);
    });
    button.addEventListener("mouseleave", () => {
      handleMoreBtnMouseLeave(roomdiv, button);
    });
  }
});

//special02
const $bbq = document.querySelector(".bbq");
const $spa = document.querySelector(".spa");
const $pet = document.querySelector(".pet");
const $cafe = document.querySelector(".cafe");
const $bbqhideWrap = document.querySelector(".bbq .hideWrap");
const $bbqhideencontent = document.querySelector(".bbq .hideencontent");
const $spahideWrap = document.querySelector(".spa .hideWrap");
const $spahideencontent = document.querySelector(".spa .hideencontent");
const $pethideWrap = document.querySelector(".pet .hideWrap");
const $pethideencontent = document.querySelector(".pet .hideencontent");
const $cafehideWrap = document.querySelector(".cafe .hideWrap");
const $cafehideencontent = document.querySelector(".cafe .hideencontent");
const $orderSeviceSection = document.querySelectorAll(".orderSevice .imghover");
const $orderSeviceMoreseeBtn = document.querySelectorAll(
  ".orderSevice  .moerSee"
);
//bbq hover 이벤트
$bbq.addEventListener("mouseenter", (e) => {
  handleMouseEnter($bbq, $bbqhideWrap, $bbqhideencontent);
});
$bbq.addEventListener("mouseleave", (e) => {
  handleMouseLeave($bbq, $bbqhideWrap, $bbqhideencontent);
});
//spa hover 이벤트
$spa.addEventListener("mouseenter", (e) => {
  handleMouseEnter($spa, $spahideWrap, $spahideencontent);
});
$spa.addEventListener("mouseleave", (e) => {
  handleMouseLeave($spa, $spahideWrap, $spahideencontent);
});
//pet hover 이벤트
$pet.addEventListener("mouseenter", (e) => {
  handleMouseEnter($pet, $pethideWrap, $pethideencontent);
});
$pet.addEventListener("mouseleave", (e) => {
  handleMouseLeave($pet, $pethideWrap, $pethideencontent);
});
//cafe hover 이벤트
$cafe.addEventListener("mouseenter", () => {
  handleMouseEnter($cafe, $cafehideWrap, $cafehideencontent);
});
$cafe.addEventListener("mouseleave", () => {
  handleMouseLeave($cafe, $cafehideWrap, $cafehideencontent);
});

//button Click event
$orderSeviceMoreseeBtn.forEach((button, index) => {
  const orderSeviceSection = $orderSeviceSection[index];
  button.addEventListener("mouseenter", function (e) {
    handleMoreBtnMouseEnter(orderSeviceSection, button);
  });
  button.addEventListener("mouseleave", function (e) {
    handleMoreBtnMouseLeave(orderSeviceSection, button);
  });
});

// About

const $aboutBtn = document.querySelector(".aboutText .moerSee");
$aboutBtn.addEventListener("mouseenter", () => {
  $aboutBtn.classList.add("hoverBtn");
});
$aboutBtn.addEventListener("mouseleave", () => {
  $aboutBtn.classList.remove("hoverBtn");
});
