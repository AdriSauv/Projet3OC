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

// MODAL 

const showModal = document.getElementById('showModal');
const modalContentImg = document.querySelector('.modalContentImg');

showModal.addEventListener('click', async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');

  const articles = await fetchData('http://localhost:5678/api/works', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

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
    deleteBtn.addEventListener('click', async () => {
      const token = localStorage.getItem('token');
      await fetchData(`http://localhost:5678/api/works/${article.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      projectArticle.remove();
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


// fermeture de la modale quand appui sur X

const closeBtn = document.querySelector('.closeBtn');
closeBtn.addEventListener('click', function(){
  modal.classList.remove('visible');
});

// fermeture modale quand appui à côté

window.addEventListener('click', function(e){
  if (e.target === modal) {
    modal.classList.remove('visible');
  }
})
