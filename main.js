import { createClient } from "@supabase/supabase-js";

let sliderX = document.querySelector(".slideshow-container");
let menuBtn = document.querySelector("#menu-btn");
let menu = document.querySelector(".menu");
let cartBtn = document.querySelector("#cart");
let modalCart = document.querySelector(".modal-cart");
let hideBG = document.querySelector(".hide-bg");
let searchBox = document.querySelector("#search-box");
const containerCardProducts = document.querySelector("#card-carousel");
const supabaseUrl = "https://vgwcxepzhsmumfkjbjkb.supabase.co";
const supabaseKey = "sb_publishable_N0gLopbyk67-NAkdH1cRvw_t9wUc-qO";
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");
let dot1 = document.querySelector(".one");
let dot2 = document.querySelector(".two");
let slideIndex = 1;

window.addEventListener("load", (e) => showSlides(slideIndex));
menuBtn.addEventListener("click", toggleMenu);
cartBtn.addEventListener("click", showModalCart);
hideBG.addEventListener("click", hideModalCart);
searchBox.addEventListener("keyup", (e) => searchProduct(e));
prevBtn.addEventListener("click", () => {
  plusSlides(-1);
});
nextBtn.addEventListener("click", () => {
  plusSlides(1);
});
dot1.addEventListener("click", () => {
  currentSlide(1);
});
dot2.addEventListener("click", () => {
  currentSlide(2);
});

//* connect DB
const supabase = createClient(supabaseUrl, supabaseKey);

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
  let products = document.querySelectorAll(".card");
  products.forEach((product) => {
    let titleProducts = product.children[1].children[0].textContent;
    if (titleProducts.includes(e.target.value)) {
      product.style.display = "flex";
    } else {
      product.style.display = "none";
    }
  });
}
async function getProductInDB() {
  const { data, error } = await supabase.from("products").select("*");

  data.forEach((products) => {
    showProduct(products.name, products.price, products.image);
  });
}
function showProduct(name, price, url) {
  let productCart = `<div class="card">
        <img src="${url}" alt="${name}" class="img-card" draggable="false" />
        <div class="info-card">
          <p class="product-name">${name}</p>
          <p class="info-product">قیمت هر کیلو</p>
        </div>
        <span class="product-by">
          <p class="price">${price}</p>
          <span class="container-count">
            <a href="product.html" class="by-btn">
              <span class="material-symbols-outlined"> add </span>
            </a>
          </span>
        </span>
      </div>
  `;
  containerCardProducts.insertAdjacentHTML("beforeend", productCart);
}
getProductInDB();
