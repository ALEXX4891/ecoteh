
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

// -------------------------------------------- start корзина: ---------------------------------------------

const headerCartBtn = document.querySelector(".btn__cart");
function setCartActive() {
  headerCartBtn.classList.add("btn__cart_active");
}
function setCartEmpty() {
  headerCartBtn.classList.remove("btn__cart_active");
}
headerCartBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "cart.html";
});

const cartItemDelBtns = document.querySelectorAll(".card__del-btn");
if (cartItemDelBtns) {
  cartItemDelBtns.forEach((item) => {
    const el = item.closest(".cart__card");
    item.addEventListener("click", function (e) {
      e.preventDefault();
      el.remove();
      getTotalCost();
    });
  });
}

const cartCards = document.querySelectorAll(".cart__card");

if (cartCards.length) {
  // console.log(cartCards);
  const btnMontage = document.querySelectorAll(".btn_montage");
  if (btnMontage) {
    btnMontage.forEach((item) => {
      // изменение вида кнопки при клике:
      item.addEventListener("click", function () {
        item.classList.toggle("btn_montage_active");
        // const cost = item.closest(".cart__card").querySelector(".card__cost");
        // let quontity = item
        //   .closest(".cart__card")
        //   .querySelector(".card__counter-value").value;
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
      if (Number(counterValue.value) <= 0) {
        quontity = 0;
        counterValue.value = 0;
      } else {
        quontity = counterValue.value;
      }
      getCost(item, quontity);
      getTotalCost();
    });

    plus.addEventListener("click", function () {
      quontity++;
      counterValue.value = quontity;
      getCost(item, quontity);
      getTotalCost();
      setCartActive()
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
  if (total === 0) {
    setCartEmpty()
    totalCost.innerHTML = "0";
  }
}

// -------------------------------------------- end корзина ---------------------------------------------

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
// console.log(cardsFeedback);

if (cardsFeedback.length) {
  // console.log(cardsFeedback);
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
      // item.classList.remove("card_about_overflow");
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
const catalog = document.querySelector(".catalog-all-main");
if (catalog) {

  const activOptionsItem = document.querySelectorAll(".activ-options__item");
  if (activOptionsItem) {
    activOptionsItem.forEach((item) => {
      const closeBtn = item.querySelector(".activ-options__icon");
      closeBtn.addEventListener("click", function () {
        item.remove();
      });
    });
  }

  const allActivOptionsDelBtn = document.querySelector(".activ-options__del-all");
  if (allActivOptionsDelBtn) {
    const closeBtn = allActivOptionsDelBtn.querySelector(".activ-options__icon");
    closeBtn.addEventListener("click", function () {
      activOptionsItem.forEach((item) => {
        item.remove();
      })
      allActivOptionsDelBtn.remove();
    });
  }





  const menuItem = catalog.querySelectorAll(".filter__item_head");
  menuItem.forEach((item) => {
    item.addEventListener("click", function () {
      menuItem.forEach((item) => {
        item.classList.remove("filter__item_head_active");
      });
      item.classList.add("filter__item_head_active");
    });
  });

  //открытие фильтра:
  const filterItem = catalog.querySelectorAll(".filter__item_body");
  filterItem.forEach((item) => {
    item.addEventListener("click", function (e) {
      //закрытие всех остальных фильтров:
      filterItem.forEach((item) => {
        if (item !== e.target.closest(".filter__item_body")) {
          item.classList.remove("filter__item_body_active");
          const arrow = item.querySelector(".filter__icon");
          arrow.classList.remove("filter__icon_active");
        }
      });

      item.classList.toggle("filter__item_body_active");
      const arrow = item.querySelector(".filter__icon");
      arrow.classList.toggle("filter__icon_active");
    });
  });

  // закрытие фильтра:
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      filterItem.forEach((item) => {
        item.classList.remove("filter__item_body_active");
        const arrow = item.querySelector(".filter__icon");
        arrow.classList.remove("filter__icon_active");
      });
    }    
  })
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".filter__item_body")) {
      filterItem.forEach((item) => {
        item.classList.remove("filter__item_body_active");
        const arrow = item.querySelector(".filter__icon");
        arrow.classList.remove("filter__icon_active");
      });
    }
  })

  

  const catalogCards = document.querySelectorAll(".catalog-all__item");

  if (catalogCards.length) {
    // console.log(catalogCards);
    catalogCards.forEach((item) => {
      const cartLinkBtn = item.querySelector(".in-cart__icon");
      cartLinkBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = cartLinkBtn.getAttribute("data-href");
      });

      const colorBtn = item.querySelectorAll(".card__color-item");
      if (colorBtn) {
        colorBtn.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            colorBtn.forEach((item) => {
              item.classList.remove("card__color-item_active");
            });
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
        if (Number(counterValue.value) <= 0) {
          quontity = 0;
          counterValue.value = "";
        } else {
          quontity = counterValue.value;
        }
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
        e.preventDefault();
        toCartBtn.classList.add("card__btn_to-cart_hide");
        cartBtn.classList.add("card__btn_in-cart_visible");
      });
    });
  }
}

// -------------------------------------------- end Каталог ---------------------------------------------
// -------------------------------------------- start Описание товара: ---------------------------------------------

const goodsItem = document.querySelector(".goods-item__main");
if (goodsItem) {
  const montageBtn = goodsItem.querySelector(".btn_montage");

  montageBtn.addEventListener("click", function (e) {
    e.preventDefault();
    montageBtn.classList.toggle("btn_montage_active");
  });

  const botMenu = goodsItem.querySelectorAll(".bot-block__menu-item");
  const botText = goodsItem.querySelectorAll(".bot-block__text");
  botMenu.forEach((item) => {
    item.addEventListener("click", function (e) {
      const id = item.getAttribute("data-id");
      botMenu.forEach((item) => {
        item.classList.remove("bot-block__menu-item_active");
      });
      item.classList.add("bot-block__menu-item_active");

      botText.forEach((item) => {
        item.classList.remove("bot-block__text_active");
        if (item.getAttribute("data-id") === id) {
          item.classList.add("bot-block__text_active");
        }
      });
    });
  });

  const previews = document.querySelectorAll(".small-img-wrap__img");

  if (previews) {
    previews.forEach((item) => {
      item.addEventListener("click", function () {
        const imgBox = document
          .querySelector(".goods-item__img")
          .querySelector("img");
        const img = item.querySelector("img").getAttribute("src");
        imgBox.setAttribute("src", img);
      });
    });
  }

  // счетчик количества карточек в корзине:
  const plus = goodsItem.querySelector(".in-cart__counter-btn_plus");
  const minus = goodsItem.querySelector(".in-cart__counter-btn_minus");
  const counterValue = goodsItem.querySelector(".in-cart__counter-value");
  const totalCost = goodsItem.querySelector(".cost__cost-value");
  const priceEl = goodsItem.querySelector(".in-cart__price").innerHTML;
  let price = parseInt(priceEl.replace(/\s/g, ""));
  console.log(totalCost);

  let quontity = 0;
  counterValue.addEventListener("input", function (e) {
    if (Number(counterValue.value) <= 0) {
      quontity = 0;
      counterValue.value = 0;
    } else {
      quontity = counterValue.value;
    }
    totalCost.innerHTML = (quontity * price).toLocaleString();
  });

  plus.addEventListener("click", function (e) {
    quontity++;
    counterValue.value = quontity;
    console.log(quontity * price);
    totalCost.innerHTML = (quontity * price).toLocaleString();
  });

  minus.addEventListener("click", function (e) {
    if (counterValue.value > 0) {
      quontity--;
      counterValue.value = quontity;
      totalCost.innerHTML = (quontity * price).toLocaleString();
      console.log(quontity * price);
      totalCost.innerHTML = (quontity * price).toLocaleString();
    }
  });

  const colorBtn = goodsItem.querySelectorAll(".color-list__color-item");
  if (colorBtn) {
    colorBtn.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        colorBtn.forEach((item) => {
          item.classList.remove("color-list__color-item_active");
        });
        item.classList.add("color-list__color-item_active");
      });
    });
  }
}

// -------------------------------------------- end Описание товара ---------------------------------------------
// -------------------------------------------- start OWL: ---------------------------------------------
// let margin = 16;

// jQuery(($) => {
//   if ($(window).width() <= 768) {
//     margin = 13;
//   }
// });
console.log(window.screen.width / 340);

jQuery(($) => {
  if ($(window).width() > 0) {
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 16,
      items: 3,
      nav: true,
      // navText : ["<i class='fa fa-chevron-left'>>>>></i>","<i class='fa fa-chevron-right'><<<<<<<</i>"],
      dots: false,
      singleItem: false,
      autoplay: false,
      smartSpeed: 1000,
      autoplayTimeout: 5000,
      responsive: {
        0: {
          nav: false,
          items: window.screen.width / 360,
        },
        800: {
          nav: false,
          items: window.screen.width / 420,
        },
        1200: {
          // items: 4
        },
      },
    });
  }
});

// -------------------------------------------- end OWL ---------------------------------------------

// -------------------------------------------- start BURGER: ---------------------------------------------

const burger = document.querySelector(".burger");
const headerNav = document.querySelector(".header__nav");

if (burger) {
  burger.addEventListener("click", function (e) {
    burger.classList.toggle("burger_active");
    headerNav.classList.toggle("nav_active");
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".header__nav") && !e.target.closest(".burger")) {
      burger.classList.remove("burger_active");
      headerNav.classList.remove("nav_active");
    }
  });
}
// -------------------------------------------- end BURGER ---------------------------------------------

// -------------------------------------------- start Search: ---------------------------------------------
const headerSearchWrap = document.querySelector(".header__search-form-wrap");

if (headerSearchWrap) {
  if (window.screen.width <= 920) {
    headerSearchWrap.addEventListener("click", function (e) {
      headerSearchWrap.classList.add("header__search-form-wrap_active");
      console.log("200");
    });
  }

  const closeSearchBtn = headerSearchWrap.querySelector(
    ".search-form__close-btn"
  );
  const inputField = headerSearchWrap.querySelector(".search-form__input");

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener("click", function (e) {
      // e.preventDefault();
      headerSearchWrap.classList.remove("header__search-form-wrap_active");
      inputField.value = "";
      console.log("100");
      e.stopPropagation();
    });
  }

  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".search-form") &&
      headerSearchWrap.classList.contains("header__search-form-wrap_active")
    ) {
      headerSearchWrap.classList.remove("header__search-form-wrap_active");
      inputField.value = "";
      console.log("400");
    }
  });
}

// -------------------------------------------- end Search ---------------------------------------------


// -------------------------------------------- start товар: ---------------------------------------------
const goodsCartBtn = document.querySelectorAll(".goods-item__btn_to-cart");

if (goodsCartBtn) {
  // const goodsQuantity = document.querySelector(".goods__quantity");
  goodsCartBtn.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      item.classList.toggle("goods-item__btn_to-cart_active");
      // headerCartBtn.classList.toggle("btn__cart_active");
      setCartActive()
    });
  });
}

// -------------------------------------------- end товар ---------------------------------------------
// -------------------------------------------- start корзина: ---------------------------------------------

// -------------------------------------------- end корзина ---------------------------------------------

// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------
// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------
// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------
