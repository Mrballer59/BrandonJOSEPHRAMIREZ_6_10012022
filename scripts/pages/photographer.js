//Mettre le code JavaScript lié à la page photographer.html
function getPhotographers() {
  let photographers = [];
  fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (photographers = data.photographers));
  return {
    photographers,
  };
}
getPhotographers();
