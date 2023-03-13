import { generateWorks } from "./projects.js";

const form = document.getElementById("uploadForm");
const fileInput = document.getElementById("image");
const titleInput = document.getElementById("title");

// Get the authorization token from localStorage
const token = localStorage.getItem("token");

// Attach an event listener to the form's submit button
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Create a new FormData object and append the form data to it
  const formData = new FormData();
  formData.append("image", fileInput.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", parseInt(document.getElementById("category").value));

  console.log(formData);

  // Send the form data via a POST request using fetch()
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.ok) {
      // Form was sent successfully, show a success message
      alert("Form was sent successfully!");
      const gallery = document.querySelector('.gallery');
      gallery.innerHTML="";
      generateWorks();
    } else {
      // There was an error, show an error message
      alert("There was an error sending the form.");
    }
    return response.json();
  })
  .catch((error) => {
    console.error("There was a problem with the fetch request:", error);
  });
});
