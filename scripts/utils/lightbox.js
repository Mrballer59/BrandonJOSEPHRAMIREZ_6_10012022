const lightBox = document.getElementById("lightbox");
const lightBoxOutro = document.getElementById("header");
const lightBoxClose = document.getElementById("lightbox-close");
const lightBoxMediaContener = document.querySelector("#lightbox-contener");

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
