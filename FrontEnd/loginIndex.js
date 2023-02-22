function showLoggedInContent() {

    let authToken = window.localStorage.getItem('authToken');

    if (authToken) {
      let hiddenElements = document.querySelectorAll('.hidden');
      for (let i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].classList.remove('hidden');
      }
      let loginStatus = document.getElementById('loginStatus');
      loginStatus.innerHTML = '<a href="login.html" class="link" id="logOut"><li>log out</li></a>';
    }
}

showLoggedInContent();

// récupère bouton modifer et la modale

const modal = document.getElementById('modal');
const modifyBtn = document.getElementById('showModal');

// affichage modale quand click sur modifier

modifyBtn.addEventListener('click', function(){
  modal.classList.add('visible');
});

// fermeture de la modale quand appui sur X

const closeBtn = document.querySelector('.closeBtn');
closeBtn.addEventListener('click', function(){
  modal.classList.remove('visible');
});

// Cacher la modale par défaut

modal.classList.remove('visible');

