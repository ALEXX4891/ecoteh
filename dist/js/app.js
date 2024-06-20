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
    Корзина`
  }
  key = !key;
});

//подсветка активного пункта меню:---------------------------------------------------------
const body = document.querySelector("body");
const page = body.getAttribute("data-page");
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach((item) => {
  if (item.getAttribute("href") === `${page}.html`) {
    item.classList.add("nav__link_active");    
  }
})

// start swiper -----------------------------------------------------------------------------
// const swipers = document.querySelectorAll('.swiper');
// swipers.forEach((item) => {
//   new Swiper(item, {
//     // Optional parameters
//     direction: "horizontal",
//     loop: true,
//     allowTouchMove: true,
//     // Navigation arrows
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//   });
// })

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

// const swiper2 = new Swiper(".swiper2", {
//   // Optional parameters
//   direction: "horizontal",
//   loop: true,
//   allowTouchMove: true,
//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

// end swiper -----------------------------------------------------------------------------


// const activPage = document.querySelector(`.${page}`);

// // import * as flsFunctions from "./modules/functions.js";

// // flsFunctions.isWebp();

// //пример импорта библиотеки swiper из node_modules:
// // import Swiper, { Navigation, Pagination } from "swiper";

// // const swiper = new Swiper(".swiper", {
// //   modules: [Navigation, Pagination],
// //   navigation: {
// //     nextEl: ".swiper-button-next",
// //     prevEl: ".swiper-button-prev",
// //   },
// //   pagination: {
// //     el: ".swiper-pagination",
// //     type: "bullets",
// //   },
// // })

// //кастомный select
// // const element1 = document.querySelector("select");
// // const choices1 = new Choices(element1, {
// //   // renderChoiceLimit: 3,
// //   // maxItemCount: 3,
// //   itemSelectText: "",
// //   searchEnabled: false,
// //   shouldSort: false,
// //   noResultsText: 'ни чего не найдено',
// //   placeholder: true,
// // });

// const fieldInput1 = document.querySelector("#field-input-1");
// const btn1 = document.querySelector("#btn-1");

// if (fieldInput1) {
//   fieldInput1.addEventListener("input", function () {
//     if (fieldInput1.value.length > 0) {
//       btn1.classList.remove("btn_disabled");
//     } else {
//       btn1.classList.add("btn_disabled");
//     }
//   });
// }

// const inputSearch = document.querySelectorAll(".input_search");
// if (inputSearch) {
//   inputSearch.forEach((item) => {
//     item.addEventListener("click", function () {
//       item.classList.add("input_search_active");
//     });
//   });
// }

// const inputFields = document.querySelectorAll(".input_search-field");

// if (inputFields) {
//   inputFields.forEach((item) => {
//     item.addEventListener("click", function () {
//       item.classList.add("input_search-field_active");
//     });
//   });
// }

// const inputDate = document.querySelectorAll(".input_date");
// if (inputDate) {
//   inputDate.forEach((item) => {
//     item.addEventListener("click", function () {
//       item.classList.add("input_date_active");
//     });
//   });
// }

// const selectField = document.querySelectorAll(".my-select");
// const selectFieldMult = document.querySelectorAll(".my-select_multiple");

// const selectList = document.querySelectorAll(".my-select__list");
// const selectItem = document.querySelectorAll(".my-select__item");

// if (selectFieldMult) {
//   selectFieldMult.forEach((item) => {
//     item.addEventListener("click", function () {
//       item.classList.toggle("my-select_multiple_open");
//     });
//   });
//   document.addEventListener("click", function (e) {
//     if (!e.target.closest(".my-select_multiple")) {
//       selectFieldMult.forEach((item) => {
//         item.classList.remove("my-select_multiple_open");
//       });
//     }
//   });
// }

// if (selectField) {
//   selectField.forEach((item) => {
//     item.addEventListener("click", function (e) {
//       item.classList.toggle("my-select_open");
//     });
//   });
//   document.addEventListener("click", function (e) {
//     if (!e.target.closest(".my-select")) {
//       selectField.forEach((item) => {
//         item.classList.remove("my-select_open");
//       });
//     } else {
//     }
//   });

//   selectItem.forEach((item) => {
//     item.addEventListener("click", function (e) {
//       const text = item.closest(".my-select").querySelector(".my-select__text");
//       text.innerHTML = item.innerHTML;
//       text.classList.add("my-select__text_active");
//       // text.setAttribute("data-value", item.getAttribute("data-value"));
//       e.stopPropagation();
//       // console.log(item);
//       item.closest(".my-select").classList.remove("my-select_open");
//       item.closest(".my-select").classList.add("my-select_active");
//     });
//   });
// }

// // const popupCloseIcon = document.querySelectorAll(".popup-close");
// // if (popupCloseIcon.length > 0) {
// //   for (let index = 0; index < popupCloseIcon.length; index++) {
// //     const el = popupCloseIcon[index];
// //     el.addEventListener("click", function (e) {
// //       popupClose(el.closest(".popup")); //ближайший родитель класса popup
// //       e.preventDefault();
// //     });
// //   }
// // }

// const navLlink = document.querySelectorAll(".nav__link");
// const thisPage = document.querySelector(".page").innerHTML;
// if (navLlink) {
//   navLlink.forEach((item) => {
//     if (item.innerHTML.includes(thisPage)) {
//       item.classList.add("nav__link_active");
//     }
//   });
// }

// // setTimeout(function () {
// //   document.querySelector("main").classList.add("main_active");
// // }, 200);

// // simplebar:
// if (document.querySelector(".my-simplebar-1")) {
//   const simpleBar1 = new SimpleBar(document.querySelector(".my-simplebar-1"), {
//     scrollbarMaxSize: 85,
//     autoHide: false,
//     forceVisible: true,
//   });
// }

// if (document.querySelector(".my-simplebar-2")) {
//   const simpleBar2 = new SimpleBar(document.querySelector(".my-simplebar-2"), {
//     scrollbarMaxSize: 85,
//     autoHide: false,
//     forceVisible: true,
//   });
// }

// if (document.querySelectorAll(".my-simplebar-input")) {
//   document.querySelectorAll(".my-simplebar-input").forEach((item) => {
//     new SimpleBar(item, {
//       scrollbarMaxSize: 45,
//       scrollbarMinSize: 33,
//       autoHide: false,
//       forceVisible: true,
//     });
//   });
// }

// const btnVariant = document.querySelectorAll(".btn-variant");
// if (btnVariant) {
//   btnVariant.forEach((item) => {
//     item.addEventListener("click", function () {
//       // window.location.href = item.getAttribute("href");
//       window.location.href = "calculating-done.html";
//     });
//   });
// }

// const btnCancel = document.querySelectorAll(".btn-cancel");
// if (btnCancel) {
//   btnCancel.forEach((item) => {
//     item.addEventListener("click", function () {
//       window.location.href = "calculating.html";
//     });
//   });
// }

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

