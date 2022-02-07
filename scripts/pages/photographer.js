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
  const photographersHeader = document.querySelector(".photograph-header");
  // Get the id in l'URL
  const PageQueryString = window.location.search;
  const urlPart = new URLSearchParams(PageQueryString);
  const idPage = urlPart.get("id");
  //transform ID to a string

  const idPageParse = JSON.parse(idPage);

  const profile = photographers.find((element) => element.id === idPageParse);
  const photographersProfile = profileFactory(profile);
  const userCardDOM = photographersProfile.getUserCardDOM();
  photographersHeader.appendChild(userCardDOM);
}

async function displayMedia(media) {
  const mediaSection = document.querySelector(".photograph-media");

  const PageQueryString = window.location.search;
  const urlPart = new URLSearchParams(PageQueryString);
  const idPage = urlPart.get("id");

  const idPageParse = JSON.parse(idPage);
  //Get from table the correct id
  const mediaBoxes = media.filter(
    (element) => element.photographerId === idPageParse
  );

  mediaBoxes.sort((a, b) => b.likes - a.likes);
  mediaBoxes.forEach((mediaBoxe1) => {
    const mediaBox = mediaFactory(mediaBoxe1);
    const mediaCardDOM = mediaBox.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}
let totalLikes = 0;
mediaBoxes.map((element) => {
  totalLikes += element.likes;
  return totalLikes;
});

//Adding the total of likes/hearts on the still-box
const still_box = document.querySelector(".still-box");
const totalLikesBox = document.createElement("p");
totalLikesBox.textContent = `${totalLikes}`;
totalLikesBox.setAttribute("class", "total-likes");
still_box.appendChild(totalLikesBox);
still_box.setAttribute("tabindex", 0);
const heart = document.createElement("p");
heart.innerHTML = `<i class="fas fa-heart></i>`;

async function init() {
  // fetchs the data and display it
  const { photographers } = await getPhotographers();
  displayData(photographers);

  const { media } = await getMedias();
  displayMedia(media);
}

init();
