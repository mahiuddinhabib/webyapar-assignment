// Add an event listener to the form
document
  .getElementById("createUserForm")
  .addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    // Check if the access token is available
    if (!accessToken) {
      alert("Authorization token not found. Please log in as an admin.");
      return;
    }

    // Perform the POST request to create a user
    postData(
      "http://localhost:5000/api/v1/auth/create-user",
      {
        userId: document.getElementById("userId").value,
        password: document.getElementById("password").value,
      },
      accessToken
    )
      .then((response) => {
        if (response.success) {
          alert("User created successfully");
          // Optionally, you can redirect or perform other actions upon successful user creation
        } else {
          alert("User creation failed: " + response.message);
        }
      })
      .catch((error) => {
        console.error("Error during user creation:", error);
        alert("An error occurred during user creation");
      });
    document.getElementById("userId").value = "";
    document.getElementById("password").value = "";
  });

// Placeholder function for making a POST request with authorization
async function postData(url, data, accessToken) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
