const cartBtn = document.querySelector(".btn__cart");

let key = 0;
cartBtn.addEventListener("click", () => {
  cartBtn.classList.toggle("btn__cart_active");
  if (!key) {
    cartBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.87388 5H17.0842C17.3518 5.00001 17.6165 5.05857 17.8612 5.17191C18.1059 5.28524 18.3251 5.45083 18.5047 5.65801C18.6843 5.86519 18.8203 6.10936 18.904 6.37478C18.9877 6.64019 19.0171 6.92097 18.9905 7.199L18.4157 13.199C18.3684 13.6925 18.1472 14.1501 17.7949 14.4829C17.4427 14.8157 16.9845 15 16.5094 15H7.36085C6.91777 15.0002 6.48832 14.84 6.14563 14.5469C5.80293 14.2537 5.56818 13.8456 5.48134 13.392L3.87388 5Z" fill="#2DA1B7"/>
      <path d="M3.87388 5H17.0842C17.3518 5.00001 17.6165 5.05857 17.8612 5.17191C18.1059 5.28524 18.3251 5.45083 18.5047 5.65801C18.6843 5.86519 18.8203 6.10936 18.904 6.37478C18.9877 6.64019 19.0171 6.92097 18.9905 7.199L18.4157 13.199C18.3684 13.6925 18.1472 14.1501 17.7949 14.4829C17.4427 14.8157 16.9845 15 16.5094 15H7.36085C6.91777 15.0002 6.48832 14.84 6.14563 14.5469C5.80293 14.2537 5.56818 13.8456 5.48134 13.392L3.87388 5ZM3.87388 5L3.09793 1.757C3.04604 1.54075 2.92641 1.34881 2.75806 1.21166C2.5897 1.0745 2.38227 1.00001 2.16871 1H1M6.74776 19H8.66368M14.4114 19H16.3274" stroke="#2DA1B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>    
      155`;
  } else {
    cartBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M3.87388 5H17.0842C17.3518 5.00001 17.6165 5.05857 17.8612 5.17191C18.1059 5.28524 18.3251 5.45083 18.5047 5.65801C18.6843 5.86519 18.8203 6.10936 18.904 6.37478C18.9877 6.64019 19.0171 6.92097 18.9905 7.199L18.4157 13.199C18.3684 13.6925 18.1472 14.1501 17.7949 14.4829C17.4427 14.8157 16.9845 15 16.5094 15H7.36085C6.91777 15.0002 6.48832 14.84 6.14563 14.5469C5.80293 14.2537 5.56818 13.8456 5.48134 13.392L3.87388 5ZM3.87388 5L3.09793 1.757C3.04604 1.54075 2.92641 1.34881 2.75806 1.21166C2.5897 1.0745 2.38227 1.00001 2.16871 1H1M6.74776 19H8.66368M14.4114 19H16.3274"
        stroke="#555A5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    Корзина`;
  }
  key = !key;
});

//подсветка активного пункта меню:---------------------------------------------------------
const body = document.querySelector("body");
const page = body.getAttribute("data-page");
const navLinks = document.querySelectorAll(".nav__link");
navLinks.forEach((item) => {
  if (item.getAttribute("href") === `${page}.html`) {
    item.classList.add("nav__link_active");
  }
});

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  allowTouchMove: true,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// -------------------------------------------- start popup: ---------------------------------------------
const popupLinks = document.querySelectorAll(".popup-link");
const lockPadding = document.querySelectorAll(".lock-padding");
// const btn = document.querySelector(".project-btn");

let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const curentPopup = document.getElementById(popupName); //получаем id попап-окна
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll(".popup-close");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup")); //ближайший родитель класса popup
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      // закрываем текущий открытый попап, если он есть
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    console.log(curentPopup);
    curentPopup.classList.add("open");
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        // если клик был по области вокруг попапа то ничего не делаем
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

// добавляем боди padding-right при открытии попапа, на ширину скролл-бара
function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".header").offsetWidth + "px";
  // console.log(lockPaddingValue);
  for (let index = 0; index < lockPadding.length; index++) {
    const el = lockPadding[index];
    el.style.marginRight = lockPaddingValue;
    // console.log(el.style.marginRight);
  }
  body.style.paddingRight = lockPaddingValue;
  // console.log(body.style.paddingRight);
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.marginRight = "0px";
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});
// -------------------------------------------- end popup: ---------------------------------------------

// -------------------------------------------- start gallery: ---------------------------------------------
const previews = document.querySelectorAll(".slider_img");

if (previews) {
  previews.forEach((item) => {
    item.addEventListener("click", function () {
      const imgBox = document
        .querySelector(".article__img")
        .querySelector("img");
      const img = item.querySelector("img").getAttribute("src");
      imgBox.setAttribute("src", img);
    });
  });
}

// -------------------------------------------- end gallery: ---------------------------------------------

// -------------------------------------------- start btn_montage: ---------------------------------------------

// -------------------------------------------- end btn_montage ---------------------------------------------

// -------------------------------------------- start cart: ---------------------------------------------

const cartCards = document.querySelectorAll(".cart__card");

if (cartCards.length) {
  console.log(cartCards);
  const btnMontage = document.querySelectorAll(".btn_montage");
  if (btnMontage) {
    btnMontage.forEach((item) => {
      // изменение вида кнопки при клике:
      item.addEventListener("click", function () {
        item.classList.toggle("btn_montage_active");
        const cost = item.closest(".cart__card").querySelector(".card__cost");
        let quontity = item
          .closest(".cart__card")
          .querySelector(".card__counter-value").value;
        // console.log(quontity);
        getTotalCost();
      });
    });
  }

  cartCards.forEach((item) => {
    // счетчик количества карточек в корзине:
    const plus = item.querySelector(".card__counter-btn_plus");
    const minus = item.querySelector(".card__counter-btn_minus");
    const counterValue = item.querySelector(".card__counter-value");
    let quontity = 0;

    counterValue.addEventListener("input", function (e) {
      quontity = counterValue.value;
      counterValue.value = counterValue.value;
      getCost(item, quontity);
      getTotalCost();
    });

    plus.addEventListener("click", function () {
      quontity++;
      counterValue.value = quontity;
      getCost(item, quontity);
      getTotalCost();
    });
    minus.addEventListener("click", function () {
      if (counterValue.value > 0) {
        quontity--;
        counterValue.value = quontity;
        getCost(item, quontity);
        getTotalCost();
      }
    });
  });
}

// вычисление стоимости товара в корзине, в зависимости от количества:
function getCost(item, quontity) {
  console.log("getCost");
  const cost = item.querySelector(".card__cost");
  const priceText = item.querySelector(".card__price").innerHTML;
  const price = parseInt(priceText.replace(/\s/g, ""));
  cost.innerHTML = (price * quontity).toLocaleString();
}

// вычисление общей стоимости товаров в корзине:
function getTotalCost() {
  // console.log(55);
  let total = 0;
  const totalCost = document.querySelector(".form__cost-value");
  let allCosts = document.querySelectorAll(".card__cost");

  allCosts.forEach((item) => {
    total += parseInt(item.innerHTML.replace("&nbsp;", ""));
    totalCost.innerHTML = total.toLocaleString();
  });
}

// -------------------------------------------- end cart ---------------------------------------------

// -------------------------------------------- start О компании: ---------------------------------------------

const btns = document.querySelectorAll(".stage__item");

const articles = document.querySelectorAll(".stage__article");

if (btns.length) {
  console.log(btns);
  btns.forEach((item) => {
    item.addEventListener("click", function () {
      btns.forEach((item) => {
        item.classList.remove("stage__item_active");
      });
      const id = item.getAttribute("data-id");
      articles.forEach((item) => {
        item.classList.remove("stage__article_active");
        if (item.getAttribute("data-id") === id) {
          item.classList.add("stage__article_active");
        }
      });
      // document.querySelector(`.stage__article[data-id="${id}"]`).classList.add("stage__article_active");
      item.classList.toggle("stage__item_active");
    });
  });
}
// -------------------------------------------- end О компании ---------------------------------------------

// -------------------------------------------- start Отзывы: ---------------------------------------------

const cardsFeedback = document.querySelectorAll(".card_about");

if (cardsFeedback.length) {
  console.log(cardsFeedback);
  const openBtns = document.querySelectorAll(".feedback-btn_open");
  openBtns.forEach((item) => {
    item.addEventListener("click", function () {
      console.log(1);
      const card = item.closest(".card_about");
      card.classList.add("card_about_open");
      // const id = item.getAttribute("data-id");
      // document.querySelector(`.feedback[data-id="${id}"]`).classList.add("feedback_active");
    });
  });
  const closeBtns = document.querySelectorAll(".feedback-btn_close");
  if (closeBtns) {
    closeBtns.forEach((item) => {
      item.addEventListener("click", function () {
        console.log(2);
        const card = item.closest(".card_about");
        card.classList.remove("card_about_open");
      });
    });
  }
  cardsFeedback.forEach((item) => {
    if (overflow(item.querySelector(".card__desc"))) {
      item.classList.add("card_about_overflow");
    } else {
      item.classList.remove("card_about_overflow");
    }
    // item.addEventListener("click", function () {
    //   console.log(3);
    //   const card = item.closest(".card_about");
    //   card.classList.remove("card_about_open");
    // });
  });
}

function overflow(e) {
  return e.scrollWidth > e.offsetWidth || e.scrollHeight > e.offsetHeight;
}

// -------------------------------------------- end Отзывы ---------------------------------------------

// -------------------------------------------- start Каталог: ---------------------------------------------
const catalogCards = document.querySelectorAll(".catalog-all__item");

if (catalogCards.length) {

  const cartBtn = document.querySelector(".in-cart__icon");
  
  cartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = cartBtn.getAttribute("data-href");
  });
  console.log(catalogCards);
  
  catalogCards.forEach((item) => {
    const colorBtn = item.querySelectorAll(".card__color-item");

    if (colorBtn) {
      colorBtn.forEach((item) => {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          colorBtn.forEach((item) => {
            item.classList.remove("card__color-item_active");
          })
          item.classList.add("card__color-item_active");
        });
      });
    }





    const toCartBtn = item.querySelector(".card__btn_to-cart");  
    toCartBtn.addEventListener("click", function (e) {
      e.preventDefault();
    });
    const cartBtn = item.querySelector(".card__btn_in-cart");
    cartBtn.addEventListener("click", function (e) {
      e.preventDefault();
    });

    // счетчик количества карточек в корзине:
    const plus = item.querySelector(".card__counter-btn_plus");
    const minus = item.querySelector(".card__counter-btn_minus");
    const counterValue = item.querySelector(".card__counter-value");
    let quontity = 0;

    // counterValue.addEventListener("change", function (e) {
    //   quontity = e.target.value;
    // });
    counterValue.addEventListener("input", function (e) {
      quontity = counterValue.value;
      counterValue.value = counterValue.value;
      // quontity = Number(counterValue.value);
      // counterValue.value = Number(counterValue.value).toLocaleString();
      // // console.log(counterValue.value);
      // console.log(Number(counterValue.value).toLocaleString());
    });





    plus.addEventListener("click", function (e) {
      e.preventDefault();

      quontity++;
      counterValue.value = quontity;
      // getCost(item, quontity);
      // getTotalCost();
    });
    minus.addEventListener("click", function (e) {
      if (counterValue.value > 0) {
        e.preventDefault();

        quontity--;
        counterValue.value = quontity;
        // getCost(item, quontity);
        // getTotalCost();
      }
    });

    const montageBtn = item.querySelector(".btn_montage");

    montageBtn.addEventListener("click", function (e) {
      e.preventDefault();
      montageBtn.classList.toggle("btn_montage_active");
    });

    toCartBtn.addEventListener("click", function (e) {

      console.log(cartBtn);
      e.preventDefault();
      console.log(2);
      toCartBtn.classList.add("card__btn_to-cart_hide");
      cartBtn.classList.add("card__btn_in-cart_visible");
    });
  });
}
// -------------------------------------------- end Каталог ---------------------------------------------
// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------
// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------

// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------

// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------

// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------
// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------

// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------
// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------
// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------
