//Mettre le code JavaScript lié à la page photographer.html

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

async function init() {
  // fetchs the data and display it
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
