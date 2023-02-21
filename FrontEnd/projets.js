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