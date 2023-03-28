import { generateWorks } from "./projects.js";
import { resetModal } from "./modal.js";

const fileInput = document.getElementById('image');
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('category');
const uploadButton = document.getElementById('uploadImg');


fileInput.addEventListener('input', updateButtonState);
titleInput.addEventListener('input', updateButtonState);
categorySelect.addEventListener('change', updateButtonState);

function updateButtonState() {

  console.log("updateButtonState called");
  console.log("fileInput.value: ", fileInput.value);
  console.log("titleInput.value: ", titleInput.value);
  console.log("categorySelect.value: ", categorySelect.value);

  if (fileInput.files.length === 0) {
    errorMsg.style.display = "block";
  } else {
    errorMsg.style.display = "none";
  }

  if (
    fileInput.value !== "" &&
    titleInput.value !== "" &&
    categorySelect.value !== ""
  ) {
    uploadButton.style.backgroundColor = "#1D6154"; // Green color
    uploadButton.style.color = "#fff";
    uploadButton.style.setProperty("color", "#fff", "important");
  } else {
    uploadButton.style.backgroundColor = "#A7A7A7"; // Grey color
    uploadButton.style.color = "#fff";
    uploadButton.style.setProperty("color", "#fff", "important");
  }
}

fileInput.addEventListener('change', function() {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      preview.src = reader.result;
      preview.style.display = 'block';
    });
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
    preview.style.display = 'none';
  }
});


const previewImg = document.getElementById("preview");
const uploadImgContainerImg = document.querySelector(".uploadImgContainerImg");
const uploadPictureBtn = document.querySelector(".uploadPictureBtn");
const restrictionImg = document.querySelector(".restrictionImg");

previewImg.addEventListener("load", function() {
  if (previewImg.src) {
    uploadImgContainerImg.style.display = "none";
    uploadPictureBtn.querySelector("input").style.display = "none";
    restrictionImg.style.display = "none";
  } else {
    uploadImgContainerImg.style.display = "block";
    uploadPictureBtn.querySelector("input").style.display = "block";
    restrictionImg.style.display = "block";
  }
});







const form = document.getElementById("uploadForm");
const errorMsg = document.querySelector("#error-msg");

// Get the authorization token from localStorage
const token = localStorage.getItem("token");

// Attach an event listener to the form's submit button
form.addEventListener("submit", function (event) {
  event.preventDefault();

  
  // Create a new FormData object and append the form data to it
  const formData = new FormData();
  formData.append("image", fileInput.files[0]);
  formData.append("title", titleInput.value);
  formData.append(
    "category",
    parseInt(document.getElementById("category").value)
    );
    
    
  // Send the form data via a POST request using fetch()
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        // Form was sent successfully, show a success message
        console.log("Form was sent successfully!");
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";
        generateWorks();
        form.reset();
        fileInput.value = "";
        previewImg.src = "";
        previewImg.style.display = "none";
        uploadImgContainerImg.style.display = "block";
        uploadPictureBtn.querySelector("input").style.display = "block";
        restrictionImg.style.display = "block";
        uploadButton.style.backgroundColor = "#A7A7A7"; // Grey color
        uploadButton.disabled = true;
        resetModal();
      } else {
        // There was an error, show an error message
        alert("The form was not filled correctly.");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch request:", error);
    });
});