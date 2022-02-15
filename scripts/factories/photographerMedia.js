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
      img.setAttribute("alt", `${title},closeup view`);
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
      const movie = `assets/movies/${video}`;
      const videoContent = document.createElement("video");
      videoContent.setAttribute("src", movie);
      videoContent.setAttribute("tabindex", 0);
      videoContent.setAttribute("class", "media");
      article.appendChild(videoContent);

      const titleMovie = document.createElement("p");
      titleMovie.setAttribute("tabindex", 0);
      titleMovie.textContent = video.replace(/_/g, " ").replace(".mp4", " ");
      titleMovie.setAttribute("class", "infoBox-title");
      div.appendChild(titleMovie);

      const posterTitle = video.replace(".mp4", ".jpg");
      const poster = `assets/poster/${posterTitle}`;
      videoContent.setAttribute("poster", poster);
    }
    const likesMedia = document.createElement("p");
    likesMedia.textContent = likes;
    likesMedia.setAttribute("tabindex", 0);
    likesMedia.setAttribute("class", "info-likes");

    const hearts1 = document.createElement("p");
    hearts1.innerHTML = `<i class="fas fa-heart"></i>`;
    hearts1.setAttribute("class", "big-heart");

    hearts1.setAttribute("tabindex", 0);
    hearts1.setAttribute("aria-label", `${likes} likes`);
    article.appendChild(div);
    div.appendChild(likesMedia);
    div.appendChild(hearts1);
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
