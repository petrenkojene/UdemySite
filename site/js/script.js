window.addEventListener("DOMContentLoaded", () => {
  // TABS
  const tabsParents = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();
  tabsParents.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //   TIMER
  const breakpoint = "2022-01-17";
  function getDeltaTime(endtime, gmt) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    gmt = gmt * 1000 * 60 * 60;
    t = t - gmt;
    const days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function zero(item) {
    if (item >= 0 && item < 10) {
      return (item = `0${item}`);
    } else {
      return item;
    }
  }
  function setClock(selector, endtime, gmt) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timerInterval = setInterval(updateClock, 1000);

    function updateClock() {
      const t = getDeltaTime(endtime, gmt);

      days.innerHTML = zero(t.days);
      hours.innerHTML = zero(t.hours);
      minutes.innerHTML = zero(t.minutes);
      seconds.innerHTML = zero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timerInterval);
      }
    }
  }
  setClock(".timer", breakpoint, 2);

  // MODAL

  const modalWindow = document.querySelector(".modal"),
    btnModal = document.querySelectorAll("[data-modal]"),
    closeModal = document.querySelector("[data-close]");

  btnModal.forEach((e) => {
    e.addEventListener("click", () => {
      showModal();
      clearTimeout(showModalTime);
    });
  });
  function closeModalWindow() {
    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show");
    document.body.style.overflow = "";
  }
  function showModal() {
    modalWindow.classList.add("show");
    modalWindow.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearTimeout(showModalTime);
  }
  closeModal.addEventListener("click", () => {
    closeModalWindow();
  });

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow) {
      closeModalWindow();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      closeModalWindow();
    }
  });
  const showModalTime = setTimeout(showModal, 3000);
  function showModalScrol() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      showModal();
      window.removeEventListener("scroll", showModalScrol);
    }
  }
  window.addEventListener("scroll", showModalScrol);

  // CARDS

  class Cards {
    constructor(src, subtitle, description, price, parentSelector) {
      this.src = src;
      this.subtitle = subtitle;
      this.description = description;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
    }
    ShowCards() {
      const element = document.createElement("div");
      element.innerHTML = `
      <div class="menu__item">
      <img src=${this.src} alt="vegy">
      <h3 class="menu__item-subtitle">${this.subtitle}</h3>
      <div class="menu__item-descr">${this.description}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>
  </div>`;
      this.parent.append(element);
    }
  }

  let Fitnes = new Cards(
    '"img/tabs/vegy.jpg"',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    ".menu .container"
  );

  Fitnes.ShowCards();

  let Premium = new Cards(
    "img/tabs/elite.jpg",
    " Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    550,
    ".menu .container"
  );
  Premium.ShowCards();

  let Postnoe = new Cards(
    "img/tabs/post.jpg",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    430,
    ".menu .container"
  );
  Postnoe.ShowCards();
});
