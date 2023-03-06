import { fetchData } from "./fetch.js";

const showModal = document.getElementById('showModal');


showModal.addEventListener('click', async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');

  const articles = await fetchData('http://localhost:5678/api/works', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const modalContentImg = document.querySelector('.modalContentBody');
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



// 2e Partie modale

const addPictureButton = document.querySelector('.addPicture');

addPictureButton.addEventListener('click', function(){

    document.getElementById('modal').classList.remove('visible');
    document.getElementById('secondModal').classList.add('visible');



//   const categorySelect = document.createElement('select');
//   categorySelect.name = 'category';
//   form.appendChild(categorySelect);
 
//   fetchData('http://localhost:5678/api/categories')
//     .then(categories => {
//       categories.forEach(category => {
//         const option = document.createElement('option');
//         option.value = category.id;
//         option.textContent = category.name;
//         categorySelect.appendChild(option);
//       });
//   });
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
  else if (e.target === secondModal) {
    secondModal.classList.remove('visible');
  }
})