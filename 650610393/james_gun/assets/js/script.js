function toggleHam(x) {
  x.classList.toggle("change");

  let myMenu = document.getElementById("Mymenu");
  if (myMenu.className === "nav-menu") {
    myMenu.className += " menu-active";
  } else {
    myMenu.className = "nav-menu";
  }

  console.log("myMenu");
}

document.querySelectorAll("[contenteditable]").forEach((el) => {
  el.removeAttribute("contenteditable");
});

/*dark, light mode*/
let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const DisableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : DisableDarkmode();
});
