function showLoggedInContent() {

    let authToken = localStorage.getItem('token');

    if (authToken) {
      let hiddenElements = document.querySelectorAll('.hidden');
      
      for (let i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].classList.remove('hidden');
      }
      let loginStatus = document.getElementById('loginStatus');
      loginStatus.innerHTML = '<a href="login.html" class="link" id="logOut"><li>logout</li></a>';
      const banner = document.getElementById('banner');
      banner.style.display = "flex";
    }
}

showLoggedInContent();




