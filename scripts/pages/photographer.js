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

  // Modale Part
  const modal = document.getElementById("contact-modal");
  const modalIntro = document.getElementById("contact me");
  const contactButton = document.getElementById("contact-button");

  contactButton.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "block";
    modalIntro.focus();
  });
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
  // LightBox part
  const lightBoxLink = document.querySelectorAll(".media");
  const lightBoxMediaContainer = document.querySelector("#lightBox-container");

  const lightBoxtitle = document.querySelector("#lightBox-container-title");
  const prevArrow = document.getElementById("lightBox-prev");
  const nextArrow = document.getElementById("lightBox-next");

  prevArrow.addEventListener("click", () => {});
  nextArrow.addEventListener("click", () => {});

  nextArrow.addEventListener("click", () => {
    let imageLightbox = document.querySelector(".lightBox-container > img");
    console.log(lightBoxLink);
    console.log(parseInt(imageLightbox.dataset.id, 10));
    const result = mediaBoxes.find(
      (element) => element.id === parseInt(imageLightbox.dataset.id, 10)
    );
    console.log(result);

    console.log(mediaBoxes.indexOf(result));
    const i = mediaBoxes.indexOf(result);
    const nextImage = mediaBoxes[i + 1];
    console.log(nextImage.image);

    const nextPhoto = nextImage.image;
    const picture = `./assets/images/${nextPhoto}`;
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.dataset.id = mediaBoxes[i + 1].id;
    lightBoxMediaContainer.innerHTML = "";
    lightBoxMediaContainer.appendChild(img);
    imageLightbox = document.querySelector(".lightBox-container > img");
    console.log(imageLightbox);
  });

  const feedLightBox = (element) => {
    const lightBoxLinkTitle = element.nextSibling.firstChild;
    lightBoxtitle.textContent = lightBoxLinkTitle.textContent;

    const lightBox = document.getElementById("lightBox");
    const mediaLightBoxLink = element.src;

    if (mediaLightBoxLink.includes(".jpg")) {
      const img = document.createElement("img");
      img.setAttribute("src", mediaLightBoxLink);
      img.dataset.id = element.dataset.id;
      // img.setAttribute("id", "image-lightbox");
      lightBoxMediaContainer.appendChild(img);
    }
    if (mediaLightBoxLink.includes(".mp4")) {
      const video = document.createElement("video");
      video.setAttribute("src", mediaLightBoxLink);
      video.setAttribute("controls", "");
      lightBoxMediaContainer.appendChild(video);
    }
    lightBox.setAttribute("aria-hidden", "false");
    lightBox.style.visibility = "visible";
    lightBox.focus();
  };
  lightBoxLink.forEach((element) => {
    element.addEventListener("keyprees", (e) => {
      if (e.key === "Enter") feedLightBox(element);
    });
    element.addEventListener("click", () => {
      feedLightBox(element);
    });
  });

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
  totalLikesBox.setAttribute("aria-lable", `${totalLikes} likes`);
  still_box.appendChild(totalLikesBox);
  still_box.setAttribute("tabindex", 0);

  const heart = document.createElement("p");
  heart.innerHTML = `<i class="fas fa-heart"></i>`;
  still_box.appendChild(heart);

  //Likes function part
  const hearts = document.querySelectorAll(".big-heart");
  hearts.forEach((element) => {
    element.addEventListener("click", () => {
      const likeCount = element.previousSibling;
      const classes = likeCount.classlist;
      const result = classes.toggle("hearts");
      if (result) {
        let number = parseInt(likeCount.textContent, 10);
        likeCount.textContent = `${(number += 1)}`;
        totalLikesBox.textContent = `${(totalLikesBox += 1)}`;
        const elementLikes = element;
        elementLikes.style.color = "#db8876";
      } else {
        let number = parseInt(likeCount.textContent, 10);
        likeCount.textContent = `${(number -= 1)}`;
        totalLikesBox.textContent = `${(totalLikes -= 1)}`;
        const elementLikes = element;
        elementLikes.style.color = "#901c1c";
      }
    });
    element.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const likeCount = element.previousSibling;
        const classes = likeCount.classList;
        const result = classes.toggle("hearts");
        if (result) {
          let number = parseInt(likeCount.textContent, 10);
          likeCount.textContent = `${(number += 1)}`;
          totalLikesBox.textContent = `${(totalLikes += 1)}`;
          elementLikes.style.color = "#db8876";
        } else {
          let number = parseInt(likeCount.textContent, 10);
          likeCount.textContent = `${(totalLikes -= 1)}`;
          const elementLikes = element;
          elementLikes.style.color = "#901c1";
        }
      }
    });
  });
}

async function init() {
  // fetchs the data and display it
  const { photographers } = await getPhotographers();
  displayData(photographers);

  const { media } = await getMedias();
  displayMedia(media);
}

init();

// Function of filter

const selected = document.getElementById("selected-choice");
const popularity = document.getElementById("choice-popularity");
const date = document.getElementById("choice-date");
const title = document.getElementById("choice-title");

const selectedChoiceHidden = () => {
  if (selected.innerHTML === popularity.innerHTML) {
    popularity.classList.remove("dropdown-menu-li");
    popularity.innerHTML = "";
  } else {
    popularity.innerHTML = "Popularité";
    popularity.classList.add("dropdown-menu-li");
  }
  if (selected.innerHTML === date.innerHTML) {
    date.classList.remove("dropdown-menu-li");
    date.innerHTML = "";
  } else {
    date.innerHTML = "Date";
    date.classList.add("dropdown-menu-li");
  }
  if (selected.innerHTML === title.innerHTML) {
    title.classList.remove("dropdown-menu-li");
    title.innerHTML = "";
  } else {
    title.innerHTML = "Titre";
    title.classList.add("dropdown-menu-li");
  }
};

selectedChoiceHidden();

popularity.addEventListener("click", async () => {
  selected.innerHTML = "Popularité";
  selectedChoiceHidden();
  async function sortByLike() {
    let media = [];

    await fetch("./data/photographers.json")
      .then((res) => res.json())
      .then((data) => {
        media = data.media;
      });

    const mediaSection = document.querySelector(".photograph-media");
    // mediaSection.innerHTML = "";
    const PageQueryString = window.location.search;
    const urlParams = new URLSearchParams(PageQueryString);
    const idPage = urlParams.get("id");

    // Transformation id = string en id =number pour faire la comparaison
    const idPageParse = JSON.parse(idPage);

    // Récupération des tableaux correspondant à l'id
    const mediaBoxes = media.filter(
      (element) => element.photographerId === idPageParse
    );
    mediaBoxes.sort((a, b) => b.likes - a.likes);
    mediaBoxes.forEach((mediaBoxe) => {
      const mediaCard = document.getElementById(mediaBoxe.id);

      mediaSection.appendChild(mediaCard);
    });
  }
  sortByLike();
});
date.addEventListener("click", async () => {
  selected.innerHTML = "Date";
  selectedChoiceHidden();

  async function sortByDate() {
    let media = [];

    await fetch("./data/photographers.json")
      .then((res) => res.json())
      .then((data) => {
        media = data.media;
      });

    const mediaSection = document.querySelector(".photograph-media");
    // mediaSection.innerHTML = "";
    const PageQueryString = window.location.search;
    const urlParams = new URLSearchParams(PageQueryString);
    const idPage = urlParams.get("id");
    // Transformation id = string en id =number pour faire la comparaison
    const idPageParse = JSON.parse(idPage);

    // Récupération des tableaux correspondant à l'id
    const mediaBoxes = media.filter(
      (element) => element.photographerId === idPageParse
    );

    mediaBoxes.sort((a, b) => new Date(b.date) - new Date(a.date));
    mediaBoxes.forEach((mediaBoxe) => {
      const mediaCard = document.getElementById(mediaBoxe.id);

      mediaSection.appendChild(mediaCard);
    });
  }
  sortByDate();
});

title.addEventListener("click", async () => {
  selected.innerHTML = "Titre";
  selectedChoiceHidden();

  async function sortByTitle() {
    let media = [];

    await fetch("./data/photographers.json")
      .then((res) => res.json())
      .then((data) => {
        media = data.media;
      });

    const mediaSection = document.querySelector(".photograph-media");

    const PageQueryString = window.location.search;
    const urlParams = new URLSearchParams(PageQueryString);
    const idPage = urlParams.get("id");
    // Transformation id = string en id =number pour faire la comparaison
    const idPageParse = JSON.parse(idPage);

    // Récupération des tableaux correspondant à l'id
    const mediaBoxes = media.filter(
      (element) => element.photographerId === idPageParse
    );

    function compare(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }
    mediaBoxes.sort(compare);

    mediaBoxes.forEach((mediaBoxe) => {
      const mediaCard = document.getElementById(mediaBoxe.id);

      mediaSection.appendChild(mediaCard);
    });
  }
  sortByTitle();
});
