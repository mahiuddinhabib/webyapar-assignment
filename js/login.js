document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Perform the POST request to the server (you may use fetch or another method)
    // In this example, I'm using a placeholder URL and assuming you have a function 'postData'
    postData("http://localhost:5000/api/v1/auth/login", {
      // Get the values from the form
      userId: document.getElementById("userId").value,
      password: document.getElementById("password").value,
    })
      .then((response) => {
        // Assuming response is a JSON object
        console.log(response);
        if (response.success) {
          // Store the access token in local storage
          localStorage.setItem("accessToken", response.data.accessToken);
          window.location.href = "/create-user";
        } else {
          alert("Login failed: " + response.message); // Handle login failure
        }
        document.getElementById("userId").value = "";
        document.getElementById("password").value = "";
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login"); // Handle error
      });
  });

// Placeholder function for making a POST request
async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
