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

// Menu Fixed
const header = document.getElementById("js-header");

function fixedMenu(){
  console.log(window.pageYOffset);
  if(window.pageYOffset > 70){
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
}
document.addEventListener('scroll', fixedMenu);
