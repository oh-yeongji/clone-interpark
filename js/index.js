// 사용되는 리소스가  모두 완료되고나서
// js를 실행하여야 정상적인 처리가 가능하다.
window.addEventListener("load",function () {
  //모달창 처리
  // let body = document.querySelector("body");
  // body.classList.add("modal-active");
  // let modal = document.querySelector(".modal");
  // modal.onclick = function () {
  //   body.classList.remove("modal-active");
  //   this.style.display = "none";
  // };

  //위로 이동하기
  // .gotop을 js에 저장하자.
  const goTop = document.querySelector(".gotop");

  // goTop의 클릭을 처리한다.
  goTop.addEventListener("click", function () {
    // 위로 슬라이딩 코드
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  //  <!-- Initialize Swiper -->

  //1번. 백틱을  이용한 html 생성
  //2번. json 데이터로 뽑아보기
  //.sw-promotion 에 출력할 html 생성
  //for 문을 이용한 데이터 html 생성
  //json 형태: JavaSript Object Notation 형식의 데이터
  //prodata.json 을 불러와서 배치한다.

  // let data = jData;
  let data;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      // console.log(req.response);
      // 현재 전달된 문자들은 json이 아닙니다.
      // req/response는 데이터 타입이 문자열입니다.
      // 문자열을 json 객체로 변경하는 작업을 하셔야 합니다.

      data = JSON.parse(req.response);
      makePromotionSlide();
    }
  };
  //promotion파일 만들어서 안에 넣어주자
  xhttp.open("GET", "data/prodata.json");
  xhttp.send();

  function makePromotionSlide() {
    let swPromotionHtml = ``;
    for (let i = 0; i < data.good_count; i++) {
      let obj = data[`good_${i + 1}`];

      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}">
          <img src="images/${obj.img}" alt="${obj.name}">
        </a>
      </div>
      `;
      swPromotionHtml += temp;
    }
    // 위의 백틱 내용을 넣어줄 장소를 저장
    let swPromotionWrapper = document.querySelector(
      ".sw-promotion .swiper-wrapper"
    );
    swPromotionWrapper.innerHTML = swPromotionHtml;

    let promotionSwiper = new Swiper(".sw-promotion", {
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 1000,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".promotion .sw-next",
        prevEl: ".promotion .sw-prev",
      },
      pagination: {
        el: ".sw-promotion-pg",
        clickable: true,
      },
      breakpoints: {
        760: {
          slidesPerView: 2,
        },
      },
    });
  }

  // function makePromotionSlide() {
  //   let swPromotionHtml = ``;
  //   for (let i = 0; i < 6; i++) {
  //     let obj = data[`good_${i + 1}`];

  //     let html = `
  //   <div class = "swiper-slide">
  //   <a href= "${obj.link}">

  //   <img src="images/${obj.img}" alt="${obj.name}">
  //   </a>
  //   </div>
  //   `;
  //     swPromotionHtml += html;
  //   }

  //   //위의 백틱 내용을 넣어줄 장소를 저장
  //   let swPromotionWrapper = document.querySelector(
  //     ".sw-promotion .swiper-wrapper"
  //   );
  //   swPromotionWrapper.innerHTML = swPromotionHtml;

  //   let promotionSwiper = new Swiper(".sw-promotion", {
  //     slidesPerView: 1,
  //     spaceBetween: 24,
  //     speed: 1000,
  //     loop: true,
  //     autoplay: {
  //       delay: 2500,
  //       disableOnInteraction: false,
  //     },

  //     navigation: {
  //       nextEl: ".promotion .sw-next",
  //       prevEl: ".promotion .sw-prev",
  //     },
  //     pagination: {
  //       el: ".sw-promotion-pg",
  //       // 클릭이 가능
  //       clickable: true,
  //     },

  //     breakpoints: {
  //       760: {
  //         slidesPerView: 2,
  //       },
  //     },
  //   });
  // }

  //쇼핑

  //tour 데이터 파싱 및 슬라이드 제작
  // function parseTour(_cate) {
  //   if (_cate === "망설이면 품절") {
  //   } else if (_cate === "패키지") {
  //   } else if (_cate === "숙소") {
  //   } else if (_cate === "해외숙소") {
  //   }
  // }

  // parseTour("망설이면 품절");
  // parseTour("패키지");
  // parseTour("숙소");
  // parseTour("해외숙소");

  // // 요청
  // let tourData;
  // const tourXhttp = new XMLHttpRequest();
  // // 이벤트가있다
  // tourXhttp.onreadystatechange = function (event) {
  //   let req = event.target;
  //   // 끝이랑 비교
  //   if (req.readyState === XMLHttpRequest.DONE) {
  //     tourData = JSON.parse(req.response);
  //     makeTourSlide();
  //   }
  // };
  // tourXhttp.open("GET", "tourdata.json");
  // tourXhttp.send();
  // function makeTourSlide() {
  //   let swTourHtml = ``;
  //   for (let i = 0; i < tourData.tour_total; i++) {
  //     let obj = tourData[`tour_${i + 1}`];
  //     // let cate = obj.category;

  //     let temp = `
  //   <div class="swiper-slide">
  //   <a href="${obj.link}" class="tour-link">
  //     <div class="tour-img">
  //       <img src="images/${obj.pic}" alt="${obj.alt}" />
  //     </div>
  //     <div class="tour-info">
  //       <ul class="tour-info-list">
  //         <li><span class="tour-cate">${obj.category}</span></li>

  //         <li>
  //           <span class="tour-title"
  //             >${obj.title}</span
  //           >
  //         </li>
  //         <li>
  //           <span class="tour-place">${obj.place}</span>
  //         </li>
  //         <li>
  //           <span class="tour-price"><b>${obj.price}</b>원~</span>
  //         </li>
  //       </ul>
  //     </div>
  //   </a>
  // </div>
  //   `;
  //     swTourHtml += temp;

  //     let swTourWrapper = document.querySelector(".sw-tour .swiper-wrapper");
  //     swTourWrapper.innerHTML = swTourHtml;
  //     // <!-- tour swiper -->
  //     let tourSwiper = new Swiper(".sw-tour", {
  //       slidesPerView: 3,
  //       grid: {
  //         rows: 2,
  //         fill: "row",
  //       },
  //       spaceBetween: 10,
  //       navigation: {
  //         nextEl: ".tour .sw-next",
  //         prevEl: ".tour .sw-prev",
  //       },
  //       breakpoints: {
  //         1024: {
  //           spaceBetween: 32,
  //           slidesPerView: 2,
  //           // 화면당 2개씩 슬라이드 이동
  //           slidesPerGroup: 2,
  //           grid: {
  //             rows: 1,
  //           },
  //         },
  //         1280: {
  //           spaceBetween: 26,
  //           slidesPerView: 3,
  //           // 화면당 4개씩 슬라이드 이동
  //           slidesPerGroup: 3,
  //           grid: {
  //             rows: 1,
  //           },
  //         },
  //       },
  //     });
  //   }
  // }

  //ticket json 연동

  //live json 연동

  //book json연동

  //event json연동
});
