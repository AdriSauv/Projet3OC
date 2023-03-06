import { fetchData } from "./fetch.js";

// Display Modal on click

const showModal = document.getElementById('showModal');


showModal.addEventListener('click', async (event) => {
    event.preventDefault();
    // Vérifie si bien connecté
    const token = localStorage.getItem('token');

    const articles = await fetchData('http://localhost:5678/api/works', {
        headers: {Authorization: `Bearer ${token}`}
});

    const modalContentImg = document.querySelector('.modalContentBody');
    // Refresh modal body to not have duplicates everytime we open the modal
    modalContentImg.innerHTML = '';
  

    articles.forEach(article => {
        const projectArticle = document.createElement("article");
        projectArticle.classList.add("articleWrapper");
    
        const img = document.createElement('img');
        img.setAttribute('src', article.imageUrl);
        img.setAttribute('data-id', article.id);
        img.classList.add('modalImg');
    
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash-can"></i>';
        deleteBtn.classList.add('deleteImage');

        // Delete image from API when button is clicked

        deleteBtn.addEventListener('click', async () => {
        const token = localStorage.getItem('token');
        await fetchData(`http://localhost:5678/api/works/${article.id}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        projectArticle.remove();
        // Delete Image from the main page using the id
        const mainImg = document.querySelector(`[data-id="${article.id}"]`);
        if (mainImg) {
            mainImg.parentNode.remove();
        }
        });
    modalContentImg.appendChild(projectArticle);
    projectArticle.appendChild(img);
    projectArticle.appendChild(deleteBtn);
  });

    document.getElementById('modal').classList.add('visible');
});



// 2e Partie modale

const addPictureButton = document.querySelector('.addPicture');

addPictureButton.addEventListener('click', function(){

    document.getElementById('modal').classList.remove('visible');
    document.getElementById('secondModal').classList.add('visible');

    const categorySelect = document.getElementById('category');
    // Récupérer les catégories via l' API et les insérer dans la balise select
    fetchData('http://localhost:5678/api/categories')
    .then(categories => {
        categorySelect.innerHTML = "";
        categories.forEach(category => {

        const option = document.createElement('option');

        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
        });
    });
});

// Bouton Valider VERT/GRIS

// Select the input elements
const fileInput = document.getElementById('fileInput');
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('category');
const uploadButton = document.getElementById('uploadImg');

// Add event listeners to the input elements
fileInput.addEventListener('change', updateButtonState);
titleInput.addEventListener('input', updateButtonState);
categorySelect.addEventListener('change', updateButtonState);

// Update the state of the upload button
function updateButtonState() {
  if (fileInput.value !== '' && titleInput.value !== '' && categorySelect.value !== '') {
    uploadButton.style.backgroundColor = '#1D6154'; // Green color
    uploadButton.style.color = '#fff !important';
    uploadButton.disabled = false;
  } else {
    uploadButton.style.backgroundColor = '#A7A7A7'; // Grey color
    uploadButton.style.color = '#fff !important';
    uploadButton.disabled = true;
  }
}

// Image preview
const uploadImgContainer = document.querySelector('.uploadImgContainer');

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const previewImg = document.createElement('img');
        previewImg.src = reader.result;
        previewImg.style.maxWidth = '130px';
        uploadImgContainer.innerHTML = '';
        uploadImgContainer.appendChild(previewImg);
      });
      reader.readAsDataURL(file);
    } else {
      uploadImgContainer.innerHTML = '';
    }
});



const modalCloseBtn = document.querySelector('#modal .closeBtn');

// Add an event listener to the close button for the first modal
modalCloseBtn.addEventListener('click', function() {
  document.getElementById('modal').classList.remove('visible');
});

// Select the close button for the second modal
const secondModalCloseBtn = document.querySelector('#secondModal .closeBtn');

// Add an event listener to the close button for the second modal
secondModalCloseBtn.addEventListener('click', function() {
  document.getElementById('secondModal').classList.remove('visible');
});

// fermeture modale quand appui à côté

window.addEventListener('click', function(e){
  if (e.target === modal) {
    modal.classList.remove('visible');
  }
  else if (e.target === secondModal) {
    secondModal.classList.remove('visible');
  }
})

// Select the "previousBtn" button
const previousBtn = document.getElementById("previousBtn");

// Add an event listener to the button
previousBtn.addEventListener("click", () => {
  // Hide the second modal
  document.getElementById("secondModal").classList.remove('visible');
  // Show the first modal
  document.getElementById("modal").classList.add('visible');
});
