export default function profileFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `./assets/photographers/${portrait}`;
  function getUserCardDOM() {
    const article = document.createElement("article");

    article.setAttribute("class", "maincontent");
    const textArticle = document.createElement("div");
    textArticle.setAttribute("class", "textcontent");
    const subArticle = document.createElement("article");
    subArticle.setAttribute("tabindex", 0);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `${name}`);
    img.setAttribute("tabindex", 0);

    const h1 = document.createElement("h1");
    h1.textContent = name;
    h1.setAttribute("tabindex", 0);

    const pLocation = document.createElement("p");
    pLocation.textContent = `${city}, ${country}`;

    const pTagline = document.createElement("p");
    pTagline.textContent = `${tagline}`;
    pTagline.setAttribute("class", "Tag");

    const btn = document.createElement("button");
    btn.textContent = `Contactez-moi`;
    btn.setAttribute("class", "contact_button");
    btn.setAttribute("onclick", "displayModal()");
    btn.setAttribute("aria-label", "Contact me");

    article.appendChild(textArticle);
    textArticle.appendChild(h1);
    textArticle.appendChild(subArticle);
    subArticle.appendChild(pLocation);
    subArticle.appendChild(pTagline);

    article.appendChild(btn);
    article.appendChild(img);

    return article;
  }
  return { name, picture, city, country, tagline, price, id, getUserCardDOM };
}
