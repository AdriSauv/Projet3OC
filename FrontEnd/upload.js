function fetchUpload() {
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

    // Send the form data via a POST request using fetch()
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Do something with the response data
    })
    .catch(error => {
      console.error("There was a problem with the fetch request:", error);
    });
  });
}

fetchUpload();