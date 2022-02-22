const lightBox = document.getElementById("lightBox");
const lightBoxOutro = document.getElementById("header");
const lightBoxClose = document.getElementById("lightBox-close");
const lightBoxMediaContener = document.querySelector("#lightBox-container");

function closeLightBox() {
  lightBox.setAttribute("aria-hidden", "true");
  lightBox.style.visibility = "hidden";
  (lightBoxMediaContener.innerHTML = ""), lightBoxOutro.focus();
}

lightBoxClose.addEventListener("click", () => {
  closeLightBox();
});

lightBox.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightBox();
  }
});
lightBoxClose.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    lightBoxMediaContenair.focus();
  }
});
