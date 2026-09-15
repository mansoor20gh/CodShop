let sliderX = document.querySelector(".slideshow-container");
let menuBtn = document.querySelector("#menu-btn");
let menu = document.querySelector(".menu");
let cartBtn = document.querySelector("#cart");
let modalCart = document.querySelector(".modal-cart");
let hideBG = document.querySelector(".hide-bg");
// let titleProducts = document.querySelectorAll(".product-name");
let searchBox = document.querySelector("#search-box");
let products = document.querySelectorAll(".card");
let slideIndex = 1;

window.addEventListener("load", (e) => showSlides(slideIndex));
menuBtn.addEventListener("click", toggleMenu);
cartBtn.addEventListener("click", showModalCart);
hideBG.addEventListener("click", hideModalCart);
searchBox.addEventListener("keyup", (e) => searchProduct(e));
//* Slider
function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  searchBox.value = "";
}

let startX = 0;
sliderX.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

sliderX.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      plusSlides(1);
    } else {
      plusSlides(-1);
    }
  }
});

//* menu
function toggleMenu() {
  menu.classList.toggle("show");
  if (menu.classList.contains("show")) {
    menuBtn.childNodes[1].innerHTML = "close";
  } else {
    menuBtn.childNodes[1].innerHTML = "menu";
  }
}
//* cart
function showModalCart() {
  modalCart.classList.add("show");
  hideBG.style.display = "block";
  document.body.style.overflow = "hidden";
}
function hideModalCart() {
  modalCart.classList.remove("show");
  hideBG.style.display = "none";
  document.body.style.overflow = "auto";
}
function searchProduct(e) {
  products.forEach((product) => {
    titleProducts = product.children[1].children[0].innerHTML;
    if (titleProducts.includes(e.target.value)) {
      product.style.display = "flex";
    } else {
      product.style.display = "none";
    }
  });
}
