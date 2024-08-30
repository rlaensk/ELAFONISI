window.addEventListener("DOMContentLoaded", () => {
  //roomNameText 로딩시 나타나기

  const $roomNameText = document.querySelector("#container .top h2");
  $roomNameText.classList.add("sliding");

  const roomImgContainer = document.querySelector(".roomImg_ul");
  const nextArrow = document.querySelector(".nextArrow");
  const prevArrow = document.querySelector(".prevArrow");
  const $MainRoomNav = document.querySelector(".roomNav");
  const $MainroomNavItems = document.querySelectorAll(".roomNav li");

  //첫번째 슬라이드와 마지막 슬라이드 선택 및 복제
  const MainfisrtSlide = roomImgContainer.querySelector("li"); //첫번째 요소 선택
  const MainlastSlide = roomImgContainer.querySelector("li:last-child"); //마지막 요소 선택
  const MainfisrtSlideclone = MainfisrtSlide.cloneNode(true); //복제
  const MainlastSlideClone = MainlastSlide.cloneNode(true); //복제

  //복제된 슬라이드 추가
  roomImgContainer.prepend(MainlastSlideClone); //복제한 요소를 첫번째 앞에 추가
  roomImgContainer.appendChild(MainfisrtSlideclone); //복제한 요소를 마지막에 추가

  //슬라이드 초기상태 설정
  let slideCurrent = 1;
  roomImgContainer.style.transform = `translateX(-${1920 * slideCurrent}px)`;

  nextArrow.addEventListener("click", () => {
    const slides = document.querySelectorAll(".roomImg_ul li");
    slideCurrent++;

    roomImgContainer.style.transition = "transform 0.5s ease-in-out";
    roomImgContainer.style.transform = `translateX(-${100 * slideCurrent}vw)`;

    //현재 보여지는 슬라이드순서와 nav 순서 일치
    $MainroomNavItems.forEach((item, index) => {
      if (index === slideCurrent - 1) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    //마지막 슬라이드일 경우 처음 슬라이드 복사
    if (slideCurrent === slides.length - 1) {
      setTimeout(() => {
        roomImgContainer.style.transition = "none"; // 애니메이션 제거
        slideCurrent = 1; // 첫 번째 슬라이드로 이동
        roomImgContainer.style.transform = `translateX(-${
          100 * slideCurrent
        }vw)`;
      }, 500); // 애니메이션이 끝난 후 실행
    }
  });
  prevArrow.addEventListener("click", () => {
    const slides = document.querySelectorAll(".roomImg_ul li");
    slideCurrent--;

    roomImgContainer.style.transition = "transform 0.5s ease-in-out";
    roomImgContainer.style.transform = `translateX(-${100 * slideCurrent}vw)`;

    //현재 보여지는 슬라이드순서와 nav 순서 일치
    $MainroomNavItems.forEach((item, index) => {
      if (index === slideCurrent - 1) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    //첫번째 슬라이드일 경우 마지막 슬라이드 복사
    if (slideCurrent === 0) {
      setTimeout(() => {
        roomImgContainer.style.transition = "0ms"; // 애니메이션 제거

        roomImgContainer.style.transform = `translateX(-${
          100 * slideCurrent
        }vw)`;
      }, 500);
      slideCurrent = slides.length - 2; // 마지막 슬라이드로 이동 // 애니메이션이 끝난 후 실행
    }
  });

  //tap클릭하면 해당 메뉴 나타남
  const $tabLi = document.querySelectorAll(".eqTab li");
  const $tabMenu = document.querySelectorAll(".eqTab .eqLi");

  $tabLi.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      //tab메뉴에서 active클래스 제거
      $tabLi.forEach((tab) => tab.classList.remove("active"));
      $tabMenu.forEach((tab) => tab.classList.remove("divactive"));
      //클릭한 tab메뉴에 active클래스 추가
      tab.classList.add("active");
      if ($tabMenu[index]) {
        $tabMenu[index].classList.add("divactive");
      } else {
        console.error(`$tabMeu에 해당하는 인덱스 ${index}가 없습니다.`);
      }
    });
  });

  // reservationBtn hover evnet
  const $reservationBtn = document.querySelector(".reservationBtn");
  const $reservationBtnText = document.querySelector(".reservationBtn a");
  $reservationBtn.addEventListener("mouseover", () => {
    $reservationBtnText.classList.add("hover");
    $reservationBtn.style.border = "1px solid #d6a884";
  });
  $reservationBtn.addEventListener("mouseout", () => {
    $reservationBtnText.classList.remove("hover");
  });
});
//   //roomlist evnet

//   //무한 슬라이드 구현

//   const $accomRoomImgContainer = document.querySelector(".roomList_ul");
//   const $accomRoomImg = document.querySelectorAll(".roomList_ul li");
//   const $accPagenation = document.querySelector(".pagenation");
//   const roomWidth = 500;
//   const roomLength = $accomRoomImg.length;
//   const speed = 3000;
//   let currentNum = 0;
//   let start = 0;

//   //첫번째 슬라이드와 마지막 슬라이드 선택 및 복제
//   const firstSlide = $accomRoomImgContainer.firstElementChild;
//   const lastSlide = $accomRoomImgContainer.lastElementChild;
//   const firstSlideClone = firstSlide.cloneNode(true);
//   const lastSlideClone = lastSlide.cloneNode(true);

//   //roomList너비설정
//   $accomRoomImgContainer.style.width = `${roomWidth * (roomLength + 2)}px`;
//   $accomRoomImgContainer.style.transform = `translate3d(-${roomWidth}px,0,0)`;
//   //복제된 슬라이드 추가
//   $accomRoomImgContainer.appendChild(firstSlideClone);
//   $accomRoomImgContainer.insertBefore(lastSlideClone, firstSlide);

//   //동적으로 페이지네이션 추가
//   let pageChild = "";
//   for (let i = 0; i < roomLength; i++) {
//     pageChild += `<li class="page"></li>`;
//   }
//   $accPagenation.innerHTML = pageChild;

//   const $pageDot = document.querySelectorAll(".page");

//   let curIndex = start;
//   let curSlide = $accomRoomImg[curIndex];
//   $pageDot[0].classList.add("active");
//   setInterval(() => {
//     curIndex++;

//     // 유효한 인덱스인지 확인
//     if (curIndex >= $pageDot.length) {
//       curIndex = 0; // 인덱스가 범위를 벗어나면 첫 번째로 돌아감
//     }

//     // 페이지네이션 업데이트
//     $pageDot.forEach((dot) => dot.classList.remove("active")); // 모든 dot에서 active 클래스 제거
//     $pageDot[curIndex]?.classList.add("active"); // 현재 인덱스의 dot에 active 클래스 추가

//     //slide이동

//     $accomRoomImgContainer.style.transition = `${speed}ms`;
//     $accomRoomImgContainer.style.transform = `translate3d(-${
//       roomWidth * curIndex
//     }px, 0px, 0px)`;
//     console.log(curIndex);
//     if (curIndex === roomLength - 2) {
//       setTimeout(() => {
//         $accomRoomImgContainer.style.transition = "0ms";
//         curIndex = 0;
//         $accomRoomImgContainer.style.transform = `translate3d(-${roomWidth}px, 0px, 0px)`;
//       }, speed);
//     }

//     // 슬라이드 및 페이지 점 업데이트
//     curSlide.classList.remove("slide_active");
//     $pageDot[curIndex].classList.remove("active");

//     // curIndex = (curIndex + 1) % roomLength; // curIndex를 순환하게 만듦
//     curSlide = $accomRoomImg[curIndex === roomLength - 1 ? 0 : curIndex];

//     curSlide.classList.add("slide_active");
//     $pageDot[curIndex].classList.add("active");
//   }, speed);
// });

window.addEventListener("DOMContentLoaded", () => {
  const roomImgContainer = document.querySelector(".roomImg_ul");
  const nextArrow = document.querySelector(".nextArrow");
  const prevArrow = document.querySelector(".prevArrow");
  const $MainRoomNav = document.querySelector(".roomNav");
  const $MainroomNavItems = document.querySelectorAll(".roomNav>li");

  // 첫 번째 및 마지막 슬라이드 복제
  const MainfisrtSlide = roomImgContainer.querySelector("li");
  const MainlastSlide = roomImgContainer.querySelector("li:last-child");
  const MainfisrtSlideclone = MainfisrtSlide.cloneNode(true);
  const MainlastSlideClone = MainlastSlide.cloneNode(true);

  // 복제된 슬라이드 추가
  roomImgContainer.prepend(MainlastSlideClone);
  roomImgContainer.appendChild(MainfisrtSlideclone);

  // 슬라이드 초기 상태 설정
  let slideCurrent = 1;
  roomImgContainer.style.transform = `translateX(-${100 * slideCurrent}vw)`;
  roomImgContainer.style.width = `${100 * roomImgContainer.children.length}vw`;
  nextArrow.addEventListener("click", () => {
    const slides = document.querySelectorAll(".roomImg_ul li");
    slideCurrent++;

    roomImgContainer.style.transition = "transform 0.5s ease-in-out";
    roomImgContainer.style.transform = `translateX(-${100 * slideCurrent}vw)`;

    // 현재 보여지는 슬라이드 순서와 nav 순서 일치
    $MainroomNavItems.forEach((item) => {
      item.addEventListener("click", () => {
        $MainroomNavItems.forEach((item) => item.classList.remove("active"));
        item.classList.add("active");
      });
    });

    // 마지막 슬라이드일 경우 첫 번째 슬라이드로 돌아가기
    if (slideCurrent === slides.length - 1) {
      setTimeout(() => {
        roomImgContainer.style.transition = "none"; // 애니메이션 제거
        slideCurrent = 1; // 첫 번째 슬라이드로 이동
        roomImgContainer.style.transform = `translateX(-${
          100 * slideCurrent
        }vw)`;
      }, 500);
    }
  });

  prevArrow.addEventListener("click", () => {
    const slides = document.querySelectorAll(".roomImg_ul li");
    slideCurrent--;

    // 슬라이드가 첫 번째 이전으로 이동하면 마지막 슬라이드로 순환
    if (slideCurrent < 0) {
      slideCurrent = slides.length - 1; // 마지막 슬라이드로 이동
    }

    roomImgContainer.style.transition = "transform 0.5s ease-in-out";
    roomImgContainer.style.transform = `translateX(-${100 * slideCurrent}vw)`;

    // 네비게이션 아이템 업데이트
    $MainroomNavItems.forEach((item, index) => {
      if (index === slideCurrent) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // 첫 번째 슬라이드일 경우 마지막 슬라이드로 순환
    if (slideCurrent === 0) {
      setTimeout(() => {
        roomImgContainer.style.transition = "none"; // 애니메이션 제거
        slideCurrent = slides.length - 2; // 마지막 슬라이드로 이동
        roomImgContainer.style.transform = `translateX(-${
          100 * slideCurrent
        }vw)`;
      }, 500);
    }
  });
  // 초기화 - 네비게이션 아이템 클릭 이벤트 리스너 추가
  $MainroomNavItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // 슬라이드 이동
      slideCurrent = index;
      roomImgContainer.style.transition = "transform 0.5s ease-in-out";
      roomImgContainer.style.transform = `translateX(-${100 * slideCurrent}vw)`;

      // 네비게이션 아이템 업데이트
      $MainroomNavItems.forEach((navItem) =>
        navItem.classList.remove("active")
      );
      item.classList.add("active");
    });
  });

  // 무한 슬라이드 구현
  const $accomRoomImgContainer = document.querySelector(".roomList_ul");
  const $accomRoomImg = document.querySelectorAll(".roomList_ul li");
  const $accPagenation = document.querySelector(".pagenation");
  const roomWidth = 560;
  const roomLength = $accomRoomImg.length;
  const slideSpeed = 1000; // 슬라이드 이동 시간
  const intervalSpeed = 2500; // 슬라이드 대기 시간
  let curIndex = 0;
  let isSliding = false;

  // 슬라이드 컨테이너 너비 설정
  $accomRoomImgContainer.style.width = `${roomWidth * (roomLength + 1)}px`;

  // 페이지네이션 생성
  let pageChild = "";
  for (let i = 0; i < roomLength; i++) {
    pageChild += `<li class="page"></li>`;
  }
  $accPagenation.innerHTML = pageChild;

  const $pageDot = document.querySelectorAll(".page");
  $pageDot[0].classList.add("active"); // 처음 시작 시 첫 번째 페이지 활성화

  setInterval(() => {
    if (isSliding) return;
    isSliding = true; // 슬라이드 전환 중임을 표시

    const firstSlide = $accomRoomImgContainer.firstElementChild;
    const firstSlideClone = firstSlide.cloneNode(true);

    // 슬라이드 이동
    $accomRoomImgContainer.style.transition = `${slideSpeed}ms ease-in-out`;
    $accomRoomImgContainer.style.transform = `translate3d(-${roomWidth}px, 0px, 0px)`;

    // 슬라이드 전환이 끝난 후 원본 슬라이드 삭제 및 복제된 슬라이드 추가
    setTimeout(() => {
      // 슬라이드 위치를 초기화
      $accomRoomImgContainer.style.transition = "none";
      $accomRoomImgContainer.style.transform = `translate3d(0px, 0px, 0px)`;

      // 원본 슬라이드를 삭제하고 복제된 슬라이드를 추가
      $accomRoomImgContainer.removeChild(firstSlide);
      $accomRoomImgContainer.appendChild(firstSlideClone);

      // 페이지네이션 업데이트
      curIndex = (curIndex + 1) % roomLength;
      $pageDot.forEach((dot) => dot.classList.remove("active"));
      $pageDot[curIndex].classList.add("active");

      isSliding = false; // 슬라이드 전환이 완료되었음을 표시
    }, slideSpeed);
  }, intervalSpeed + slideSpeed); // 슬라이드 전환 속도와 대기 시간을 더하여 정확한 지연 시간 설정
  $accomRoomImg.forEach((room, index) => {
    room.addEventListener("click", () => {
      $accomRoomImgContainer.style.transform = `translate3d(-${
        roomWidth * (index + 1)
      }px, 0px, 0px)`;
    });
  });
});
