import { fetchData } from "./fetch.js";
import { generateWorks } from "./projects.js";

// Display Modal on click

const showModal = document.getElementById("showModal");

showModal.addEventListener("click", async (event) => {
  event.preventDefault();

  const token = localStorage.getItem("token");

  const articles = await fetchData("http://localhost:5678/api/works", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const modalContentImg = document.querySelector(".modalContentBody");
  // Refresh modal body to not have duplicates everytime we open the modal

  modalContentImg.innerHTML = "";

  // Find the first article in the array
  const firstArticle = articles[0];

  articles.forEach((article, index) => {
    const projectArticle = document.createElement("article");
    projectArticle.classList.add("articleWrapper");

    const img = document.createElement("img");
    img.setAttribute("src", article.imageUrl);
    img.setAttribute("data-id", article.id);
    img.classList.add("modalImg");

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.innerHTML = '<i class="fas fa-trash-can"></i>';
    deleteBtn.classList.add("deleteImage");

    const edit = document.createElement("p");
    edit.textContent = "éditer";

    // Add another button only to the first image
    if (article.id === firstArticle.id && index === 0) {
      const moveBtn = document.createElement("button");
      moveBtn.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>';
      moveBtn.classList.add("moveBtn");
      projectArticle.appendChild(moveBtn);
    }

    // Delete image from API when button is clicked
    deleteBtn.addEventListener("click", async () => {
      const token = localStorage.getItem("token");
      console.log("hello");
      await fetch(`http://localhost:5678/api/works/${article.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      projectArticle.remove();
      // Delete Image from the main page using the id

      const mainImg = document.querySelector(`[data-id="${article.id}"]`);
      if (mainImg) {
        mainImg.parentNode.remove();
      }
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      generateWorks();
    });

    modalContentImg.appendChild(projectArticle);
    projectArticle.appendChild(img);
    projectArticle.appendChild(deleteBtn);
    projectArticle.appendChild(edit);
  });

  document.getElementById("modal").classList.add("visible");
});

// 2e Partie modale

const addPictureButton = document.querySelector(".addPicture");

addPictureButton.addEventListener("click", function () {
  document.getElementById("previousBtn").removeAttribute("style");
  document.querySelector(".modalContentButton").style.justifyContent =
    "space-between";
  document.getElementById("header1").style.display = "none";
  document.getElementById("header2").style.display = "flex";

  document.querySelector(".modalContentBody").style.display = "none";
  document.querySelector(".secondModalContentBody").removeAttribute("style");

  document.querySelector(".modalContentFooter").style.display = "none";

  const categorySelect = document.getElementById("category");
  // Récupérer les catégories via l' API et les insérer dans la balise select
  fetchData("http://localhost:5678/api/categories").then((categories) => {
    categorySelect.innerHTML = "";
    categories.forEach((category) => {
      const option = document.createElement("option");

      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  });
});

const previousBtn = document.getElementById("previousBtn");

previousBtn.addEventListener("click", () => {
  document.getElementById("previousBtn").style.display = "none";
  header1.style.display = "block";
  header2.style.display = "none";

  document.querySelector(".modalContentBody").removeAttribute("style");
  document.querySelector(".secondModalContentBody").style.display = "none";
  document.querySelector(".modalContentButton").removeAttribute("style");

  document.querySelector(".modalContentFooter").removeAttribute("style");

  generateWorks();
});

// Bouton Valider VERT/GRIS

// Select the input elements
const fileInput = document.getElementById("image");
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");
const uploadButton = document.getElementById("uploadImg");

// Add event listeners to the input elements
fileInput.addEventListener("change", updateButtonState);
titleInput.addEventListener("input", updateButtonState);
categorySelect.addEventListener("change", updateButtonState);

// Update the state of the upload button
function updateButtonState() {
  if (
    fileInput.value !== "" &&
    titleInput.value !== "" &&
    categorySelect.value !== ""
  ) {
    uploadButton.style.backgroundColor = "#1D6154"; // Green color
    uploadButton.style.color = "#fff !important";
    uploadButton.disabled = false;
  } else {
    uploadButton.style.backgroundColor = "#A7A7A7"; // Grey color
    uploadButton.style.color = "#fff !important";
    uploadButton.disabled = true;
  }
}

// Image preview
const uploadImgContainer = document.querySelector(".uploadImgContainer");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const previewImg = document.createElement("img");
      previewImg.src = reader.result;
      previewImg.style.maxWidth = "130px";
      uploadImgContainer.innerHTML = "";
      uploadImgContainer.appendChild(previewImg);
    });
    reader.readAsDataURL(file);
  } else {
    uploadImgContainer.innerHTML = "";
  }
});

const modalCloseBtn = document.querySelector("#modal .closeBtn");

const modal = document.getElementById("modal");

function resetModal() {
  modal.classList.remove("visible");
  document.getElementById("previousBtn").style.display = "none";
  document.querySelector(".modalContentButton").style.justifyContent =
    "flex-end";
  document.getElementById("header1").style.display = "block";
  document.getElementById("header2").style.display = "none";
  document.querySelector(".modalContentBody").style.display = "flex";
  document.querySelector(".secondModalContentBody").style.display = "none";
  document.querySelector(".modalContentFooter").style.display = "flex";
  document.getElementById("category").innerHTML =
    '<option value="" selected disabled hidden></option>';
}

modalCloseBtn.addEventListener("click", resetModal);

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    resetModal();
  }
});
