let userId1 = "";
let userId2 = "";

// Add an event listener to the form
document
  .getElementById("viewUsersForm")
  .addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();
    console.log('hello');

    // Get the user IDs from the form
    userId1 = document.getElementById("userId1").value;
    userId2 = document.getElementById("userId2").value;

    // Redirect to the user view page with the specified user IDs in the URL
    window.location.href = "/user-table";

    if (userId1) {
      renderUserTable(`http://localhost:5000/api/v1/users/${userId1}`);
    }
    if (userId2) {
      renderUserTable(`http://localhost:5000/api/v1/users/${userId2}`);
    }
  });

function goBack() {
  // Navigate back to the view users form
  window.location.href = "/create-user";
}

// Function to render user data in the table
function renderUserTable(url) {
  const tableBody = document
    .getElementById("userTable")
    .getElementsByTagName("tbody")[0];

  // Clear existing table rows
  tableBody.innerHTML = "";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Check if the response is successful
      if (data.success) {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
                    <td>${data.userId}</td>
                    <td>${data.name ? data.name : "-"}</td>
                    <td><img src="${
                      data.profileImg ? data.profileImg : ""
                    }" alt="User Photo" width="50"></td>
                    <td class="action-buttons">
                        <button class="edit-button" onclick="editUser(${
                          data.userId
                        })">Edit</button>
                        <button class="delete-button" onclick="deleteUser(${
                          data.userId
                        })">Delete</button>
                    </td>`;
      } else {
        console.error("Failed to fetch user data:", data.message);
        alert("Failed to fetch user data. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error during fetch:", error);
      alert("An error occurred during fetch. Please try again.");
    });
}

function editUser(userId) {
  // Implement your edit logic here
  console.log("Edit user with ID:", userId);
}

function deleteUser(userId) {
  // Implement your delete logic here
  console.log("Delete user with ID:", userId);
}
