function showLoggedInContent() {
    console.log('hello');
    let authToken = window.localStorage.getItem('authToken');
    if (authToken) {
      let hiddenElements = document.querySelectorAll('.hidden');
      for (let i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].classList.remove('hidden');
      }
      let loginStatus = document.getElementById('loginStatus');
      loginStatus.innerHTML = '<a href="login.html" class="link" id="loginStatus"><li>log out</li></a>';
    }
}

showLoggedInContent();