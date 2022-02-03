export default function mediaFacotory(data) {
  const { date, id, image, likes, photographerId, price, title, video } = data;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("id", id);
    const div = document.createElement("div");
    div.setAttribute("class", "infoBox");

    if (image) {
      const picture = `./assets/images/${image}`;
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", `${title}`);
      img.setAttribute("tabindex", 0);
      img.setAttribute("class", "media");
      article.appendChild(img);

      const titleMedia = document.createElement("p");
      titleMedia.textContent = title;
      titleMedia.setAttribute("tabindex", 0);
      titleMedia.setAttribute("class", "infoBox-title");
      div.appendChild(titleMedia);
    }
    if (video) {
      const movie = `.assets/movies/${video}`;
      const videoContent = document.createElement("video");
      videoContent.setAttribute("src", movie);
      videoContent.setAttribute("controls", "");
      videoContent.setAttribute("class", "media");
      article.appendChild(videoContent);
    }

    // const div = document.createElement("div");
    // div.setAttribute("class", "infoBox");
    // const titleMedia = document.createElement("p");
    // titleMedia.textContent = title;
    // titleMedia.setAttribute("tabindex", 0);
    // titleMedia.setAttribute("class", "infoBox-title");

    const titleMovie = document.createElement("p");
    titleMovie.setAttribute("tabindex", 0);
    titleMovie.textContent = video.replace(/_/g, " ").replace(".mp4", " ");
    titleMovie.setAttribute("class", "infoBox-title");
    div.appendChild(titleMovie);

    const likesMedia = document.createElement("p");
    likesMedia.textContent = likes;
    likesMedia.setAttribute("tabindex", 0);
    likesMedia.setAttribute("class", "infoBox-likes");

    const hearts = document.createElement("p");
    hearts.innerHTML = `<i class="fas fa-heart"></i>`;
    hearts.setAttribute("class", "infoBox-heart");

    article.appendChild(div);

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
