let show = true; 

const menuSection = document.querySelector(".menu-section")
const menuToggle = menuSection.querySelector(".menu-toggle")

menuToggle.addEventListener("click", () => {

    document.body.style.overflow = show ? "hidden" : "initial"

    menuSection.classList.toggle("on", show)
    show = !show;
})

const menuHamburger = document.getElementById("js-btn-mobile");

menuHamburger.addEventListener("click", () => {
  menuHamburger.classList.toggle("is-active");
})