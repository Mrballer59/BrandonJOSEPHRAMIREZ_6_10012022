// function displayModal() {
//     const modal = document.getElementById("contact_modal");
// 	modal.style.display = "block";
// }

const modal = document.getElementById("contact-modal");
const modalOutro = document.getElementById("header");
const closeCross = document.getElementById("close-cross");

function closeModal() {
  // const modal = document.getElementById("contact_modal");
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
  modalOutro.focus();
}
closeCross.addEventListener("click", () => {
  closeModal();
});
modal.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
const inputs = document.querySelectorAll(".text-control");
const submit = document.getElementById("contact-modal");

let first;
let last;
let email;
let yourMessage;
const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector(`#${tag} +span`);
  if (!valid) {
    container.classList.add("error");
    span.classList.add("error-message");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const firstChecker = (value) => {
  if (value.length > 0 && value.length < 2)
    errorDisplay(
      "first",
      "Veuillez entrer 2 caractères ou plus pour le prénom."
    );
};
// closeCross.addEventListener("click", ())
