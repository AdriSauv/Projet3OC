// Récupérer les projets depuis API
const response = await fetch ("http://localhost:5678/api/works");
const project = await response.json();

// Liste des images sur la page principale
const mainPageImages = [];


function generateProjects(project){

    for ( let i=0; i < project.length; i++){

      const article = project[i];

      // récupération de l'élément du DOM qui accueillera la gallery
      const sectionGallery = document.querySelector(".gallery");
      // Création d'une balise qui sera dédiée à un article
      const projectArticle = document.createElement("article");
      // Création Balises
      const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;
      const titreElement = document.createElement("h5");
      titreElement.innerText = article.title;

      // Rattache balise à section gallery

      sectionGallery.appendChild(projectArticle);
      projectArticle.appendChild(imageElement);
      projectArticle.appendChild(titreElement);

      // Ajout d'un data attribut indiquant l'id de l'article
      projectArticle.dataset.id = article.id;

      // sauvagrde image dans la liste des images de la page principale
      mainPageImages.push(projectArticle);
    }
}

generateProjects(project);

async function generateModalProjects(project){
  // Keep track of the deleted image ID
  let deletedImageId;

    for ( let i=0; i < project.length; i++){

        const article = project[i];

        // récupération de l'élément du DOM qui accueillera la gallery
        const sectionGallery = document.querySelector(".modalContentImg");

        // Check if the article is the deleted image and skip it
        if (article.id === deletedImageId) {
          continue;
        }

        // Création d'une balise qui sera dédiée à un article
        const projectArticle = document.createElement("article");
        projectArticle.classList.add("articleWrapper");

        // Création Balises
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.classList.add("modalImg");

        const deleteElement = document.createElement("button");
        deleteElement.classList.add('deleteImage');
        deleteElement.innerText = "x";
        deleteElement.dataset.articleId = article.id;
        deleteElement.addEventListener('click', async () => {
            const articleId = parseInt(deleteElement.dataset.articleId);

            // Set the deleted image ID
            deletedImageId = articleId;

            // Delete the image from the modal
            imageElement.parentNode.removeChild(imageElement);
            
            // Remove the corresponding article element from the main page
            const index = mainPageImages.findIndex(article => article.dataset.id === articleId.toString());
            if (index > -1) {
                const mainPageArticle = mainPageImages[index];
                mainPageArticle.parentNode.removeChild(mainPageArticle);
                mainPageImages.splice(index, 1);
            }

            // Delete the article from the API
            const response = await fetch(`http://localhost:5678/api/works/${articleId}`, { method: 'DELETE' });
            const data = await response.json();
            console.log(data);
        });

        const titreElement = document.createElement("p");
        titreElement.innerText = "éditer";

        // Rattache balise à section gallery

        sectionGallery.appendChild(projectArticle);
        projectArticle.appendChild(imageElement);
        projectArticle.appendChild(titreElement);
        projectArticle.appendChild(deleteElement);

        // Ajout d'un data attribut indiquant l'id de l'article
        projectArticle.dataset.id = article.id;
    }
}

// AFFICHAGE MODALE

// récupérer modale et bouton modifier

const modal = document.getElementById('modal');
const modifyBtn = document.getElementById('showModal');

// affichage modale quand click sur modifier

modifyBtn.addEventListener('click', function(){
  modal.classList.add('visible');
  document.querySelector(".modalContentImg").innerHTML = "";
  generateModalProjects(project);
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

// Cacher la modale par défaut

modal.classList.remove('visible');