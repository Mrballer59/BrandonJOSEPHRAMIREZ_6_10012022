export default function mediaFacotory(data) {
  const { date, id, image, likes, photographerId, price, title } = data;
  const picture = `./assets/images/${image}`;
  function getMediaCardDOM() {
    const article = document.createElement("article");
    const div = document.createElement("div");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `${title}`);
    img.setAttribute("tabindex", 0);
    img.setAttribute("class", "media");
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

    article.appendChild(img);
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
    getMediaCardDOM,
  };
}
