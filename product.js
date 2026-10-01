let menuBtn = document.querySelector("#menu-btn");
let menu = document.querySelector(".menu");
let cartBtn = document.querySelector("#cart");
let modalCart = document.querySelector(".modal-cart");
let hideBG = document.querySelector(".hide-bg");
let products = document.querySelectorAll(".card");

menuBtn.addEventListener("click", toggleMenu);
cartBtn.addEventListener("click", showModalCart);
hideBG.addEventListener("click", hideModalCart);

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