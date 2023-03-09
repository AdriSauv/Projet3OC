async function fetchUpload() {
  const form = document.getElementById("uploadForm");
  const fileInput = document.getElementById("image");
  const titleInput = document.getElementById("title");

  const token = localStorage.getItem("token");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append(
      "category",
      parseInt(document.getElementById("category").value)
    );

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      // Do something with the response data
    } catch (error) {
      console.error("There was a problem with the fetch request:", error);
    }
  });
}


