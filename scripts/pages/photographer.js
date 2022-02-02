//Mettre le code JavaScript lié à la page photographer.html
import mediaFactory from "../factories/photographerMedia.js";
import profileFactory from "../factories/photographerProfile.js";

async function getPhotographers() {
  let photographers = [];
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      photographers = data.photographers;
    });

  return {
    photographers,
  };
}

async function getMedias() {
  let media = [];
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      media = data.media;
    });

  return {
    media,
  };
}

async function displayData(photographers) {
  // Get the id in l'URL
  const photographersHeader = document.querySelector(".photograph-header");
  const PageQueryString = window.location.search;
  const urlPart = new URLSearchParams(PageQueryString);
  const idPage = urlPart.get("id");

  const idPageParse = JSON.parse(idPage);

  const profile = photographers.find((element) => element.id === idPageParse);

  const photographersProfile = profileFactory(profile);
  const userCardDOM = photographersProfile.getUserCardDOM();
  photographersHeader.appendChild(userCardDOM);
}
async function displayMedia(media) {
  const mediaSection = document.querySelector(".photograph-media");
  console.log(media);
  const PageQueryString = window.location.search;
  const urlPart = new URLSearchParams(PageQueryString);
  const idPage = urlPart.get("id");

  const idPageParse = JSON.parse(idPage);
  //Get from table the correct id
  const mediaBoxes = media.filter(
    (element) => element.photographerId === idPageParse
  );
  console.log(mediaBoxes);

  mediaBoxes.forEach((mediaBoxe1) => {
    const mediaBoxe = mediaFactory(mediaBoxe1);
    const mediaCardDOM = mediaBoxe.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}

// //Adding the total of likes/hearts on the still-box
// const still_box = document.querySelector(".still-box");
// const totalLikesBox = document.createElement("p");
// totalLikesBox.textContent = `${totalLikes}`;
// totalLikesBox.setAttribute("class", "total-likes");
// still_box.appendChild(totalLikesBox);
// still_box.setAttribute("tabindex", 0);
// const heart = document.createElement("p");
// heart.innerHTML = `<i class="fas fa-heart></i>`;

async function init() {
  // fetchs the data and display it
  const { photographers } = await getPhotographers();
  displayData(photographers);

  const { media } = await getMedias();
  displayMedia(media);
}

init();
