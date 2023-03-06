function fetchUpload() {
  const form = document.getElementById("uploadForm");
  const fileInput = document.getElementById("fileInput");
  const titleInput = document.getElementById("title");
  const categoryInput = document.getElementById("category");

  // Attach an event listener to the form's submit button
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Read the file input as a Base64-encoded string
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = function() {
      const fileString = reader.result.split(",")[1];

      // Create a new FormData object and append the form data to it
      const formData = new FormData();
      formData.append("file", fileString);
      formData.append("title", titleInput.value.toString());
      formData.append("category", parseInt(categoryInput.value, 10));

      // Send the form data via a POST request using fetch()
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData
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
    };
  });
}
