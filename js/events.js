window.addEventListener("load", function () {
  let data;
  function parseEvent() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function (e) {
      let req = e.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        data = JSON.parse(req.response);
        makeEventSlide();
      }
    };

    xhr.open("GET", "data/events.json");

    xhr.send();
  }
  parseEvent();
  let eventSwiper;
  function makeEventSlide() {
    let swEventHtml = ``;
    for (let i = 0; i < data.event_total; i++) {
      let obj = data[`event_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
      <a href="${obj.link}" class="events-link">
        <img src="images/${obj.img}" alt="${obj.alt}"/>
      </a>
      </div>	
	`;
      swEventHtml += temp;
    }

    console.log(swEventHtml);
    let swEventWrapper = document.querySelector(".sw-events .swiper-wrapper");
    swEventWrapper.innerHTML = swEventHtml;

    // if (eventSwiper) {
    //   eventSwiper.destroy();
    // }
    // <!-- event-swiper -->
    eventSwiper = new Swiper(".sw-events", {
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
  }
});
