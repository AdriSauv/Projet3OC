import { fetchData } from "./fetch.js";

const gallery = document.querySelector('.gallery');

// fetch the articles from the API
fetchData("http://localhost:5678/api/works")
  .then(articles => {
    // loop through each article and create a gallery item for it
    articles.forEach(article => {
      // create a gallery item
      const galleryItem = document.createElement("div");
      galleryItem.classList.add("gallery-item");
      
      // create an image element for the article's image
      const image = document.createElement("img");
      image.src = article.imageUrl;
      galleryItem.appendChild(image);
      
      // create a title element for the article's title
      const title = document.createElement("h3");
      title.textContent = article.title;
      galleryItem.appendChild(title);
      
      // hide the article's ID and category
      const id = document.createElement("input");
      id.type = "hidden";
      id.value = article.id;
      galleryItem.appendChild(id);
      
      const category = document.createElement("input");
      category.type = "hidden";
      category.value = article.category;
      galleryItem.appendChild(category);
      
      // add the gallery item to the gallery
      gallery.appendChild(galleryItem);
    });
  })
  .catch(error => {
    console.error(error);
});


const hiddenElements = document.querySelectorAll(".hidden");
const banner = document.getElementById('banner');

if (localStorage.getItem("token")) {
    hiddenElements.forEach(element => {
        element.classList.remove("hidden");
    });
    banner.style.display = 'flex';
}