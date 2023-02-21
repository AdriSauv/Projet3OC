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

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";

window.localStorage.setItem("authToken", authToken);