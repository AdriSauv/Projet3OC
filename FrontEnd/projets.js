// Récupérer les projets depuis API
const response = await fetch ("http://localhost:5678/api/works");
const project = await response.json();


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
    }
}

generateProjects(project);

function generateModalProjects(project){

    for ( let i=0; i < project.length; i++){

        const article = project[i];

        // récupération de l'élément du DOM qui accueillera la gallery
        const sectionGallery = document.querySelector(".modalContentImg");

        // Création d'une balise qui sera dédiée à un article
        const projectArticle = document.createElement("article");
        // Création Balises
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.classList.add("modalImg")
        const titreElement = document.createElement("p");
        titreElement.innerText = "éditer";

        // Rattache balise à section gallery

        sectionGallery.appendChild(projectArticle);
        projectArticle.appendChild(imageElement);
        projectArticle.appendChild(titreElement);

        
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