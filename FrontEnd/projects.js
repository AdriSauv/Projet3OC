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


showModal.addEventListener('click', async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');

  const articles = await fetchData('http://localhost:5678/api/works', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const modalContentImg = document.querySelector('.modalContentImg');
  modalContentImg.innerHTML = '';

  const modalFooter = document.querySelector('.modalContentFooter');
  

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


// 2e Partie modale

const addPictureButton = document.querySelector('.addPicture');

addPictureButton.addEventListener('click', function(){

    const modalHeader = document.querySelector('.modalContentHeader');
    const modalBody = document.querySelector('.modalContentImg');
    const modalFooter = document.querySelector('.modalContentFooter');
    
    modalHeader.innerHTML = '<h2>Ajout Photo<h2>';
    modalFooter.innerHTML ='<input class="uploadPicture" type="submit" value="Valider">';
    modalBody.innerHTML ='';

    const formWrap = document.createElement('div');
    modalBody.appendChild(formWrap);

    const form = document.createElement('form');
    form.classList.add('formUploadImg');
    formWrap.appendChild(form);
    
    // create a span element for the icon
    const iconSpan = document.createElement('span');
    iconSpan.classList.add('fas', 'fa-image', 'iconSpan');
    form.appendChild(iconSpan);

    // add a line break
    form.appendChild(document.createElement('br'));

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.name = 'image';
    form.appendChild(fileInput);

    form.appendChild(document.createElement('br'));

    const restrictionImg = document.createElement('p');
    restrictionImg.innerText = 'jpg, png : 4mo max';
    restrictionImg.classList.add('restrictionImg');
    form.appendChild(restrictionImg);

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Titre';
    formWrap.appendChild(titleLabel);

    formWrap.appendChild(document.createElement('br'));
  
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.classList.add('titleInput');
    formWrap.appendChild(titleInput);

    formWrap.appendChild(document.createElement('br'));
  
    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Categorie';
    formWrap.appendChild(categoryLabel);

    formWrap.appendChild(document.createElement('br'));
  
    const categorySelect = document.createElement('select');
    categorySelect.name = 'category';
    formWrap.appendChild(categorySelect);

    formWrap.appendChild(document.createElement('br'));
  
    fetchData('http://localhost:5678/api/categories')
      .then(categories => {
        categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
    });

});