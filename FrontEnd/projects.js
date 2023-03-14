import { fetchData } from "./fetch.js";

// select the gallery element
const gallery = document.querySelector(".gallery");

function logDetails(article) {
  console.log(
    `Title: ${article.title}, ID: ${article.id}, Category: ${article.categoryId}`
  );
}

// fetch the articles and create the gallery
export function generateWorks() {
  fetchData("http://localhost:5678/api/works")
    .then((articles) => {
      // loop through each article and create a gallery item for it
      articles.forEach((article) => {
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
        const id = document.createElement("p");
        id.classList.add("hidden");
        id.textContent = article.id;
        galleryItem.appendChild(id);

        const category = document.createElement("p");
        category.classList.add("hidden");
        category.classList.add("categoryId");
        category.textContent = parseInt(article.categoryId);
        galleryItem.appendChild(category);

        // add the gallery item to the gallery
        gallery.appendChild(galleryItem);

        // add an event listener to the image element that logs the article's details
        image.addEventListener("click", () => logDetails(article));
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

generateWorks();

// Filter System

const btnAll = document.querySelector(".btnAll");
const btnObjects = document.querySelector(".btnObjects");
const btnAppartments = document.querySelector(".btnAppartments");
const btnHotels = document.querySelector(".btnHotels");

function filterItems(categoryId) {
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    if (
      categoryId === 0 ||
      parseInt(item.querySelector(".categoryId").textContent) === categoryId
    ) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

btnAll.addEventListener("click", () => {
  filterItems(0);
});

btnObjects.addEventListener("click", () => {
  filterItems(1);
});

btnAppartments.addEventListener("click", () => {
  filterItems(2);
});

btnHotels.addEventListener("click", () => {
  filterItems(3);
});

// Design filtre

const buttons = document.querySelectorAll(".filters button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
      btn.style.backgroundColor = "white";
      btn.style.color = "#1D6154";
    });

    button.classList.add("active");
    button.style.backgroundColor = "#1D6154";
    button.style.color = "white";
  });
});

// Apparition des Elements de la page lorsqu'il y a un token

const hiddenElements = document.querySelectorAll(".hidden");
const banner = document.getElementById("banner");
const filters = document.querySelector(".filters");
const login = document.getElementById("loginStatus");
const header = document.querySelector("header");

if (localStorage.getItem("token")) {
  hiddenElements.forEach((element) => {
    element.classList.remove("hidden");
  });
  banner.style.display = "flex";
  filters.style.display = "none";
  login.innerHTML =
    '<a href="login.html" class="link" id="logout"><li>logout</li></a>';
  header.classList.add("loggedHeader");
}
