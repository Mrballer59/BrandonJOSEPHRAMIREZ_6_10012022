export default function mediaFacotory(data) {
  const { date, id, image, likes, photographerId, price, title, video } = data;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    if (image) {
      const picture = `./assets/images/${image}`;
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", `${title}`);
      img.setAttribute("tabindex", 0);
      img.setAttribute("class", "media");
      article.appendChild(img);
    }
    if (video) {
      const movie = `.assets/movies/${video}`;
      const videoContent = document.createElement("video");
      videoContent.setAttribute("src", movie);
      videoContent.setAttribute("controls", "");
      videoContent.setAttribute("class", media);
      article.appendChild(videoContent);
    }

    const div = document.createElement("div");
    div.setAttribute("class", "infoBox");

    const titleMedia = document.createElement("p");
    titleMedia.textContent = title;
    titleMedia.setAttribute("tabindex", 0);
    titleMedia.setAttribute("class", "infoBox-title");

    const likesMedia = document.createElement("p");
    likesMedia.textContent = likes;
    likesMedia.setAttribute("tabindex", 0);
    likesMedia.setAttribute("class", "infoBox-likes");

    const hearts = document.createElement("p");
    hearts.innerHTML = `<i class="fas fa-heart"></i>`;
    hearts.setAttribute("class", "infoBox-heart");

    article.appendChild(div);
    div.appendChild(titleMedia);
    div.appendChild(likesMedia);
    div.appendChild(hearts);
    return article;
  }
  return {
    date,
    id,
    image,
    photographerId,
    price,
    title,
    video,
    getMediaCardDOM,
  };
}
