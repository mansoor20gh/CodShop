let menuBtn = document.querySelector("#menu-btn");
let menu = document.querySelector(".menu");
let cartBtn = document.querySelector("#cart");
let modalCart = document.querySelector(".modal-cart");
let hideBG = document.querySelector(".hide-bg");
let products = document.querySelectorAll(".card");
let informationBox = document.querySelector(".personal-information");
let finalSendProductBtns = document.querySelectorAll(
  "#final-btn-shopping-cart",
);

menuBtn.addEventListener("click", toggleMenu);
cartBtn.addEventListener("click", showModalCart);
hideBG.addEventListener("click", hideModalCart);
finalSendProductBtns.forEach((finalSendProductBtn) => {
  finalSendProductBtn.addEventListener("click", sendProduct);
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
  if (modalCart.classList.contains("show")) {
    modalCart.classList.remove("show");
  }else if (informationBox.classList.contains("show")) {
    informationBox.classList.remove("show");
  }
  hideBG.style.display = "none";
  document.body.style.overflow = "auto";
}
//*send product to DB
function sendProduct() {
  showInformationBox();
}
//* information
function showInformationBox() {
  if (modalCart.classList.contains("show")) {
    modalCart.classList.remove("show");
  }
  informationBox.classList.add("show");
  hideBG.style.display = "block";
}
