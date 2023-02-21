// Récupérer formulaire dans une const

const loginForm = document.getElementById('loginForm');

console.log(loginForm); 

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche la page de recharger sur le onClick
  
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
  
    // Envoi des données sur l'API
    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => {
      if (response.ok) {
        window.location.href="index.html";
      } else {
        alert("Identifiants non valides");
      }
    })
});