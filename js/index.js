// 사용되는 리소스가  모두 완료되고나서
// js를 실행하여야 정상적인 처리가 가능하다.
window.onload = function () {
  //위로 이동하기
  // .gotop을 js에 저장하자.
  const goTop = document.querySelector(".gotop");
  console.log(goTop);
  console.log(typeof goTop);
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
  xhttp.open("GET", "prodata.json");
  xhttp.send();

  function makePromotionSlide() {
    let swPromotionHtml = ``;
    for (let i = 0; i < data.good_count; i++) {
      let obj = data[`good_${i + 1}`];

      let html = `
      <div class="swiper-slide">
        <a href="${obj.link}">
          <img src="images/${obj.img}" alt="${obj.name}">
        </a>
      </div>
      `;
      swPromotionHtml += html;
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

  // <!-- Shopping Swiper -->
  let shoppingData;
  const shopXhttp = new XMLHttpRequest();
  shopXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      shoppingData = JSON.parse(req.response);
      makeShoppingSlide();
    }
  };
  shopXhttp.open("GET", "shoppingdata.json");
  shopXhttp.send();
  function makeShoppingSlide() {
    let swShoppingHtml = ``;

    for (let i = 0; i < shoppingData.good_count; i++) {
      let obj = shoppingData[`good_${i + 1}`];
      //html에서 temp
      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="good">
          <img src="images/${obj.pic}" alt="${obj.product}" />
          <div class="good-info">
            <ul class="good-info-list">
              <li>
                <b><span>${obj.ratio}%</span> ${obj.price}원</b>
              </li>
              <li><p>${obj.product}</p></li>
            </ul>
          </div>
        </a>
      </div>
    `;
      swShoppingHtml += temp;
    }

    let swShoppingWrapper = document.querySelector(
      ".sw-shopping .swiper-wrapper"
    );
    swShoppingWrapper.innerHTML = swShoppingHtml;
    let shoppingSwiper = new Swiper(".sw-shopping", {
      slidesPerView: 5,
      grid: {
        rows: 2,
        fill: "row",
      },
      spaceBetween: 10,
      navigation: {
        nextEl: ".shopping .sw-next",
        prevEl: ".shopping .sw-prev",
      },
      breakpoints: {
        1024: {
          spaceBetween: 32,
          slidesPerView: 3,
          // 화면당 3개씩 이동
          slidesPerGroup: 3,

          grid: {
            rows: 1,
          },
        },
        1280: {
          spaceBetween: 26,
          slidesPerView: 4,
          // 화면당 4개씩 이동
          slidesPerGroup: 4,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }

  //tour
  // 요청
  let tourData;
  const tourXhttp = new XMLHttpRequest();
  // 이벤트가있다
  tourXhttp.onreadystatechange = function (event) {
    let req = event.target;
    // 끝이랑 비교
    if (req.readyState === XMLHttpRequest.DONE) {
      tourData = JSON.parse(req.response);
      makeTourSlide();
    }
  };
  tourXhttp.open("GET", "tourdata.json");
  tourXhttp.send();
  function makeTourSlide() {
    let swTourHtml = ``;
    for (let i = 0; i < tourData.tour_total; i++) {
      let obj = tourData[`tour_${i + 1}`];
      // let cate = obj.category;

      let temp = `
    <div class="swiper-slide">
    <a href="${obj.link}" class="tour-link">
      <div class="tour-img">
        <img src="images/${obj.pic}" alt="${obj.alt}" />
      </div>
      <div class="tour-info">
        <ul class="tour-info-list">
          <li><span class="tour-cate">${obj.category}</span></li>
          
          <li>
            <span class="tour-title"
              >${obj.title}</span
            >
          </li>
          <li>
            <span class="tour-place">${obj.place}</span>
          </li>
          <li>
            <span class="tour-price"><b>${obj.price}</b>원~</span>
          </li>
        </ul>
      </div>
    </a>
  </div>
    `;
      swTourHtml += temp;

      let swTourWrapper = document.querySelector(".sw-tour .swiper-wrapper");
      swTourWrapper.innerHTML = swTourHtml;
      // <!-- tour swiper -->
      let tourSwiper = new Swiper(".sw-tour", {
        slidesPerView: 3,
        grid: {
          rows: 2,
          fill: "row",
        },
        spaceBetween: 10,
        navigation: {
          nextEl: ".tour .sw-next",
          prevEl: ".tour .sw-prev",
        },
        breakpoints: {
          1024: {
            spaceBetween: 32,
            slidesPerView: 2,
            // 화면당 2개씩 슬라이드 이동
            slidesPerGroup: 2,
            grid: {
              rows: 1,
            },
          },
          1280: {
            spaceBetween: 26,
            slidesPerView: 3,
            // 화면당 4개씩 슬라이드 이동
            slidesPerGroup: 3,
            grid: {
              rows: 1,
            },
          },
        },
      });
    }
  }

  //ticket json 연동
  let ticketData;
  const ticketXhttp = new XMLHttpRequest();
  ticketXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      ticketData = JSON.parse(req.response);
    }
  };
  ticketXhttp.open("GET", "ticketdata.json");
  ticketXhttp.send();

  function makeTicketSlide() {
    let swTicketHtml = ``;
    for (let i = 0; i < ticketData.ticket_total; i++) {
      let obj = ticketData[`ticket_${i + 1}`];

      let temp = `
<div class="swiper-slide">
<a href="${obj.link}" class="ticket-link">
  <div class="ticket-img">
    <img src="images/${obj.pic}" alt="${obj.title}" />
    <span class="ticket-rank">${obj.rank}</span>
  </div>
  <div class="ticket-info">
    <ul class="ticket-info-list">
      <li>
        <span class="ticket-title"
          ><b>${obj.title}</b></span
        >
      </li>
      <li>
        <span class="ticket-hall">${obj.place}</span>
      </li>
      <li>
        <span class="ticket-date"
          >${obj.date}</span
        >
      </li>
      <li><span class="ticket-sale">${obj.sale}</span></li>
    </ul>
  </div>
</a>
</div>
`;

      swTicketHtml += temp;
     
    }

    let swTicketWrapper = document.querySelector(".sw-ticket .swiper-wrapper");
    console.log(swTicketWrapper);

    swTicketWrapper.innerHTML = swTicketHtml;

    // <!-- ticket swiper -->

    let ticketSwiper = new Swiper(".sw-ticket", {
      slidesPerView: "auto",
      spaceBetween: 10,
      navigation: {
        nextEl: ".ticket .sw-next",
        prevEl: ".ticket .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
    });

    
//live json
    let liveData = {
      live_1: { pic: "", cate: "", title: "", date: "", time: "" },
    };
    let swLiveHtml = `
<div class="swiper-slide">
<a href="#" class="live-link">
  <div class="live-img">
    <img src="images/live1.jpg" alt="라이브" />
  </div>
  <div class="live-info">
    <div class="live-info-top">
      <span class="live-info-cate">방송예정</span>
      <p class="live-info-title">
        2박 3일로 떠나는 후쿠오카 여행✈ 패키지VS자유여행 다
        준비했어요😆
      </p>
    </div>
    <div class="live-info-main">
      <p class="live-info-date">04월 27일 (목요일)</p>
      <p class="live-info-time">16:00</p>
    </div>
    <div class="live-info-bottom clearfix">
      <div class="live-info-thumb">
        <img src="images/live1.jpg" alt="라이브" />
      </div>
      <div class="live-info-desc">
        <p class="live-info-desc-title">
          [미미의밥상] 감자탕 4.7kg(국내산등뼈 100%
          10인분)+라면사리
        </p>
        <p class="live-info-desc-price">
          <em>22%</em> <b>19,840</b>원
        </p>
      </div>
    </div>
  </div>
</a>
</div>
<div class="swiper-slide">
<a href="#" class="live-link">
  <div class="live-img">
    <img src="images/live2.jpg" alt="라이브" />
  </div>
  <div class="live-info">
    <div class="live-info-top">
      <span class="live-info-cate">방송예정</span>
      <p class="live-info-title">
        2박 3일로 떠나는 후쿠오카 여행✈ 패키지VS자유여행 다
        준비했어요😆
      </p>
    </div>
    <div class="live-info-main">
      <p class="live-info-date">04월 27일 (목요일)</p>
      <p class="live-info-time">19:00</p>
    </div>
    <div class="live-info-bottom clearfix">
      <div class="live-info-thumb">
        <img src="images/live1.jpg" alt="라이브" />
      </div>
      <div class="live-info-desc">
        <p class="live-info-desc-title">
          [미미의밥상] 감자탕 4.7kg(국내산등뼈 100%
          10인분)+라면사리
        </p>
        <p class="live-info-desc-price">
          <em>22%</em> <b>19,840</b>원
        </p>
      </div>
    </div>
  </div>
</a>
</div>
<div class="swiper-slide">
<a href="#" class="live-link">
  <div class="live-img">
    <img src="images/live3.jpg" alt="라이브" />
  </div>
  <div class="live-info">
    <div class="live-info-top">
      <span class="live-info-cate">방송예정</span>
      <p class="live-info-title">
        2박 3일로 떠나는 후쿠오카 여행✈ 패키지VS자유여행 다
        준비했어요😆
      </p>
    </div>
    <div class="live-info-main">
      <p class="live-info-date">04월 27일 (목요일)</p>
      <p class="live-info-time">16:00</p>
    </div>
    <div class="live-info-bottom clearfix">
      <div class="live-info-thumb">
        <img src="images/live1.jpg" alt="라이브" />
      </div>
      <div class="live-info-desc">
        <p class="live-info-desc-title">
          [미미의밥상] 감자탕 4.7kg(국내산등뼈 100%
          10인분)+라면사리
        </p>
        <p class="live-info-desc-price">
          <em>22%</em> <b>19,840</b>원
        </p>
      </div>
    </div>
  </div>
</a>
</div>
<div class="swiper-slide">
<a href="#" class="live-link">
  <div class="live-img">
    <img src="images/live4.jpg" alt="라이브" />
  </div>
  <div class="live-info">
    <div class="live-info-top">
      <span class="live-info-cate">방송예정</span>
      <p class="live-info-title">
        2박 3일로 떠나는 후쿠오카 여행✈ 패키지VS자유여행 다
        준비했어요😆
      </p>
    </div>
    <div class="live-info-main">
      <p class="live-info-date">04월 28일 (금요일)</p>
      <p class="live-info-time">20:30</p>
    </div>
    <div class="live-info-bottom clearfix">
      <div class="live-info-thumb">
        <img src="images/live1.jpg" alt="라이브" />
      </div>
      <div class="live-info-desc">
        <p class="live-info-desc-title">
          [미미의밥상] 감자탕 4.7kg(국내산등뼈 100%
          10인분)+라면사리
        </p>
        <p class="live-info-desc-price">
          <em>22%</em> <b>19,840</b>원
        </p>
      </div>
    </div>
  </div>
</a>
</div>

`;
    let swLiveWrapper = document.querySelector(".sw-live .swiper-wrapper");
    swLiveWrapper.innerHTML = swLiveHtml;

    // live swiper
    let liveSwiper = new Swiper(".sw-live", {
      slidesPerView: 4,
      // 사진사이들 간격
      spaceBetween: 10,
      navigation: {
        nextEl: ".live .sw-next",
        prevEl: ".live .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
    });
  }

  // books-swiper
  let booksSwiper = new Swiper(".sw-books", {
    slidesPerView: 3,
    grid: {
      rows: 4,
      fill: "row",
    },
    spaceBetween: 19,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
        grid: {
          rows: 1,
        },
      },
      1280: {
        slidesPerView: 5,

        slidesPerGroup: 5,
        spaceBetween: 27,
        grid: {
          rows: 1,
        },
      },
    },
  });

  // <!-- event-swiper -->

  let eventSwiper = new Swiper(".sw-events", {
    slidesPerView: 3,
    spaceBetween: 27,
    navigation: {
      nextEl: ".events .sw-next",
      prevEl: ".events .sw-prev",
    },
    breakpoints: {
      1280: {
        slidesPerView: 4,
      },
    },
  });
};
