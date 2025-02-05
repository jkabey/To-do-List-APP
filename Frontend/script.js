
// const API_URL = "http://localhost:3000";

// const authContainer = document.getElementById("auth-container");
// const todoContainer = document.getElementById("todo-container");
// const registerForm = document.getElementById("register-form");
// const loginForm = document.getElementById("login-form");
// const todoInput = document.getElementById("todoInput");
// const addTodoBtn = document.getElementById("add-todo");
// const todoList = document.getElementById("todoList");
// const todoCount = document.getElementById("todoCount");
// const deleteButton = document.getElementById("deleteButton");
// const logoutButton = document.getElementById("logout-button");

// function setCookie(name, value, days) {
//     const date = new Date();
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//     let expires = "expires=" + date.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/;HttpOnly;Secure";
// }

// function getCookie(name) {
//     let cookieName = name + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(cookieName) == 0) {
//             return c.substring(cookieName.length, c.length);
//         }
//     }
//     return "";
// }

// let authToken = getCookie("authToken");

// function updateUI() {
//     if (authToken) {
//         authContainer.style.display = "none";
//         todoContainer.style.display = "block";
//         fetchTodos();
//     } else {
//         authContainer.style.display = "block";
//         todoContainer.style.display = "none";
//     }
// }

// if (registerForm) {
//     registerForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const username = document.getElementById("reg-username").value;
//         const password = document.getElementById("reg-password").value;

//         fetch(`${API_URL}/register`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, password }),
//         })
//         .then(res => {
//             if (!res.ok) {
//               return res.json().then(err => {throw new Error(err.error || "Registration failed")});
//             }
//             return res.json();
//         })
//         .then((data) => {
//             alert(data.message || "Registration successful!");
//             setCookie("authToken", data.token, 7);
//             authToken = data.token;
//             updateUI();
//         })
//         .catch((error) => {
//             console.error("Error registering:", error);
//             alert(error.message || "An unexpected error occurred during registration.");
//         });
//     });
// }

// if (loginForm) {
//     loginForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const username = document.getElementById("login-username").value;
//         const password = document.getElementById("login-password").value;

//         fetch(`${API_URL}/login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, password }),
//         })
//         .then(res => {
//             if (!res.ok) {
//               return res.json().then(err => {throw new Error(err.error || "Login failed")});
//             }
//             return res.json();
//         })
//         .then((data) => {
//             alert(data.message || "Login successful!");
//             setCookie("authToken", data.token, 7);
//             authToken = data.token;
//             updateUI();
//         })
//         .catch((error) => {
//             console.error("Error logging in:", error);
//             alert(error.message || "An unexpected error occurred during login.");
//         });
//     });
// }

// function fetchTodos() {
//     fetch(`${API_URL}/todos`, {
//         headers: { Authorization: "Bearer " + authToken },
//     })
//         .then((res) => res.json())
//         .then((todos) => {
//             displayTasks(todos);
//         })
//         .catch((error) => console.error("Error fetching todos:", error));
// }

// function addTask() {
//     const text = todoInput.value.trim();
//     if (!text) return alert("Task cannot be empty!");

//     fetch(`${API_URL}/todos`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + authToken,
//         },
//         body: JSON.stringify({ text }),
//     })
//         .then(res => {
//             if (!res.ok) {
//                 return res.json().then(err => {throw new Error(err.error || "Failed to add task")});
//             }
//             return res.json();
//         })
//         .then(() => {
//             fetchTodos();
//             todoInput.value = "";
//         })
//         .catch((error) => {
//             console.error("Error adding task:", error);
//             alert(error.message || "An unexpected error occurred while adding task.")
//         });
// }

// function toggleTask(id, completed) {
//     fetch(`${API_URL}/todos/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + authToken,
//         },
//         body: JSON.stringify({ completed }),
//     })
//     .then(res => {
//         if (!res.ok) {
//             return res.json().then(err => {throw new Error(err.error || "Failed to toggle task")});
//         }
//         return res.json();
//     })
//         .then(() => fetchTodos())
//         .catch((error) => {
//             console.error("Error toggling task:", error);
//             alert(error.message || "An unexpected error occurred while toggling task.")
//         });
// }

// function deleteAllTasks() {
//     fetch(`${API_URL}/todos`, {
//         method: "DELETE",
//         headers: {
//             Authorization: "Bearer " + authToken,
//         },
//     })
//         .then(res => {
//             if (!res.ok) {
//                 return res.json().then(err => { throw new Error(err.error || "Failed to delete tasks") });
//             }
//             return res;
//         })
//         .then(() => {
//             fetchTodos();
//         })
//         .catch((error) => {
//             console.error("Error deleting tasks:", error);
//             alert(error.message || "Failed to delete tasks");
//         });
// }

// function displayTasks(todos) {
//     todoList.innerHTML = "";
//     if (!Array.isArray(todos)) {
//         console.error("Invalid todos format:", todos);
//         return;
//     }

//     todos.forEach((item) => {
//         const li = document.createElement("li");

//         const checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.checked = item.completed;
//         checkbox.addEventListener("change", () => toggleTask(item.id, checkbox.checked));

//         const p = document.createElement("p");
//         p.textContent = item.text;
//         p.style.textDecoration = item.completed ? "line-through" : "none";

//         li.appendChild(checkbox);
//         li.appendChild(p);
//         todoList.appendChild(li);
//     });

//     todoCount.textContent = todos.length;
// }

// function logout() {
//     document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     authToken = null;
//     updateUI();
// }

// if (addTodoBtn) addTodoBtn.addEventListener("click", addTask);
// if (deleteButton) deleteButton.addEventListener("click", deleteAllTasks);
// if (logoutButton) logoutButton.addEventListener("click", logout);

// updateUI();



// const API_URL = "http://localhost:3000";

// const authContainer = document.getElementById("auth-container");
// const todoContainer = document.getElementById("todo-container");
// const registerForm = document.getElementById("register-form");
// const loginForm = document.getElementById("login-form");
// const todoInput = document.getElementById("todoInput");
// const addTodoBtn = document.getElementById("add-todo");
// const todoList = document.getElementById("todoList");
// const todoCount = document.getElementById("todoCount");
// const deleteButton = document.getElementById("deleteButton");
// const logoutButton = document.getElementById("logout-button");

// // Cookie functions
// function setCookie(name, value, days) {
//     const date = new Date();
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//     let expires = "expires=" + date.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }

// function getCookie(name) {
//     let cookieName = name + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i].trim();
//         if (c.indexOf(cookieName) == 0) {
//             return c.substring(cookieName.length, c.length);
//         }
//     }
//     return "";
// }

// let authToken = getCookie("authToken");

// // UI Update
// function updateUI() {
//     if (authToken) {
//         authContainer.style.display = "none";
//         todoContainer.style.display = "block";
//         fetchTodos();
//     } else {
//         authContainer.style.display = "block";
//         todoContainer.style.display = "none";
//     }
// }

// // Registration
// if (registerForm) {
//     registerForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const username = document.getElementById("reg-username").value;
//         const password = document.getElementById("reg-password").value;

//         fetch(`${API_URL}/register`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, password }),
//         })
//         .then(res => res.json())
//         .then((data) => {
//             alert(data.message || "Registration successful!");
//             setCookie("authToken", data.token, 7);
//             authToken = data.token;
//             updateUI();
//         })
//         .catch((error) => alert("Error registering: " + error.message));
//     });
// }

// // Login
// if (loginForm) {
//     loginForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const username = document.getElementById("login-username").value;
//         const password = document.getElementById("login-password").value;

//         fetch(`${API_URL}/login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, password }),
//         })
//         .then(res => res.json())
//         .then((data) => {
//             alert(data.message || "Login successful!");
//             setCookie("authToken", data.token, 7);
//             authToken = data.token;
//             updateUI();
//         })
//         .catch((error) => alert("Error logging in: " + error.message));
//     });
// }

// // Fetch todos
// function fetchTodos() {
//     fetch(`${API_URL}/todos`, {
//         headers: { Authorization: "Bearer " + authToken },
//     })
//     .then((res) => res.json())
//     .then((todos) => displayTasks(todos))
//     .catch((error) => console.error("Error fetching todos:", error));
// }

// // Add task
// function addTask() {
//     const text = todoInput.value.trim();
//     if (!text) return alert("Task cannot be empty!");

//     fetch(`${API_URL}/todos`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + authToken,
//         },
//         body: JSON.stringify({ text, description: "No description", completed: false }),
//     })
//     .then(res => res.json())
//     .then(() => {
//         fetchTodos();
//         todoInput.value = "";
//     })
//     .catch((error) => alert("Error adding task: " + error.message));
// }

// // Toggle completion
// function toggleTask(id, completed) {
//     fetch(`${API_URL}/todos/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + authToken,
//         },
//         body: JSON.stringify({ completed }),
//     })
//     .then(() => fetchTodos())
//     .catch((error) => alert("Error toggling task: " + error.message));
// }

// // Delete all tasks
// function deleteAllTasks() {
//     fetch(`${API_URL}/todos`, {
//         method: "DELETE",
//         headers: { Authorization: "Bearer " + authToken },
//     })
//     .then(() => fetchTodos())
//     .catch((error) => alert("Error deleting tasks: " + error.message));
// }

// // Edit task inline
// function updateTask(id, newTitle, newDescription, completed) {
//     fetch(`${API_URL}/todos/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + authToken,
//         },
//         body: JSON.stringify({ text: newTitle, description: newDescription, completed }),
//     })
//     .then(() => fetchTodos())
//     .catch((error) => alert("Error updating task: " + error.message));
// }

// // Display tasks with edit functionality
// function displayTasks(todos) {
//     todoList.innerHTML = "";
//     if (!Array.isArray(todos)) {
//         console.error("Invalid todos format:", todos);
//         return;
//     }

//     todos.forEach((item) => {
//         const li = document.createElement("li");

//         const checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.checked = item.completed;
//         checkbox.addEventListener("change", () => toggleTask(item.id, checkbox.checked));

//         const title = document.createElement("input");
//         title.type = "text";
//         title.value = item.text;
//         title.disabled = true;

//         const description = document.createElement("input");
//         description.type = "text";
//         description.value = item.description || "No description";
//         description.disabled = true;

//         const editButton = document.createElement("button");
//         editButton.textContent = "Edit";
//         editButton.addEventListener("click", () => {
//             const isEditing = !title.disabled;
//             if (isEditing) {
//                 updateTask(item.id, title.value, description.value, checkbox.checked);
//             }
//             title.disabled = isEditing;
//             description.disabled = isEditing;
//             editButton.textContent = isEditing ? "Edit" : "Save";
//         });

//         li.appendChild(checkbox);
//         li.appendChild(title);
//         li.appendChild(description);
//         li.appendChild(editButton);
//         todoList.appendChild(li);
//     });

//     todoCount.textContent = todos.length;
// }

// // Logout
// function logout() {
//     document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     authToken = null;
//     updateUI();
// }

// // Event Listeners
// if (addTodoBtn) addTodoBtn.addEventListener("click", addTask);
// if (deleteButton) deleteButton.addEventListener("click", deleteAllTasks);
// if (logoutButton) logoutButton.addEventListener("click", logout);

// // Initial UI update
// updateUI();





const API_URL = "http://localhost:3000";

const authContainer = document.getElementById("auth-container");
const todoContainer = document.getElementById("todo-container");
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const deleteButton = document.getElementById("deleteButton");
const logoutButton = document.getElementById("logout-button");

// Cookie functions
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let cookieName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return "";
}

let authToken = getCookie("authToken");

// UI Update
function updateUI() {
    if (authToken) {
        authContainer.style.display = "none";
        todoContainer.style.display = "block";
        fetchTodos();
    } else {
        authContainer.style.display = "block";
        todoContainer.style.display = "none";
    }
}

// Registration
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("reg-username").value;
        const password = document.getElementById("reg-password").value;

        fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then(res => res.json())
        .then((data) => {
            alert(data.message || "Registration successful!");
            setCookie("authToken", data.token, 7);
            authToken = data.token;
            updateUI();
        })
        .catch((error) => alert("Error registering: " + error.message));
    });
}

// Login
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then(res => res.json())
        .then((data) => {
            alert(data.message || "Login successful!");
            setCookie("authToken", data.token, 7);
            authToken = data.token;
            updateUI();
        })
        .catch((error) => alert("Error logging in: " + error.message));
    });
}

// Fetch todos
function fetchTodos() {
    fetch(`${API_URL}/todos`, {
        headers: { Authorization: "Bearer " + authToken },
    })
    .then((res) => res.json())
    .then((todos) => displayTasks(todos))
    .catch((error) => console.error("Error fetching todos:", error));
}
function addTask() {
    const title = todoInput.value.trim(); // Use input as the title
    const description = ""; // Or get description from another input field if you have one
    if (!title) return alert("Task title cannot be empty!");

    fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
        },
        body: JSON.stringify({ title, description }), // Send title and description
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => {throw new Error(err.error || "Failed to add task")});
        }
        return res.json();
    })
    .then(() => {
        fetchTodos();
        todoInput.value = ""; // Clear the title input
        // If you have a description input, clear that too:
        // document.getElementById("descriptionInput").value = "";
    })
    .catch((error) => {
        console.error("Error adding task:", error);
        alert(error.message || "An unexpected error occurred while adding task.")
    });
}


function editTask(id, currentTitle, currentDescription, currentCompleted) {
  const newTitle = prompt("Enter new title:", currentTitle);
  const newDescription = prompt("Enter new description:", currentDescription);
  const newCompleted = confirm("Is the task completed?", currentCompleted);

  if (newTitle === null || newDescription === null) {
      return; // User cancelled the prompt
  }

  fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
      },
      body: JSON.stringify({ 
          title: newTitle, 
          description: newDescription, 
          completed: newCompleted 
      }),
  })
  .then(res => {
      if (!res.ok) {
          return res.json().then(err => {throw new Error(err.error || "Failed to edit task")});
      }
      return res.json();
  })
  .then(() => fetchTodos())
  .catch((error) => {
      console.error("Error editing task:", error);
      alert(error.message || "An unexpected error occurred while editing task.");
  });
}

function displayTasks(todos) {
    todoList.innerHTML = "";
    if (!Array.isArray(todos)) {
        console.error("Invalid todos format:", todos);
        return;
    }

    todos.forEach((item) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        checkbox.addEventListener("change", () => toggleTask(item.id, checkbox.checked));

        const p = document.createElement("p");
        p.textContent = item.title; // Display the title
        p.style.textDecoration = item.completed ? "line-through" : "none";

        // Add edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editTask(item.id, item.title, item.description, item.completed));


        li.appendChild(checkbox);
        li.appendChild(p);
        li.appendChild(editButton); // Add to the list item
        todoList.appendChild(li);
    });

    todoCount.textContent = todos.length;
}
 // Toggle completion
function toggleTask(id, completed) {
    fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
        },
        body: JSON.stringify({ completed }),
    })
    .then(() => fetchTodos())
    .catch((error) => alert("Error toggling task: " + error.message));
}

// Delete all tasks
function deleteAllTasks() {
    fetch(`${API_URL}/todos`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + authToken },
    })
    .then(() => fetchTodos())
    .catch((error) => alert("Error deleting tasks: " + error.message));
}




// Logout
function logout() {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    authToken = null;
    updateUI();
}

// Event Listeners
if (addTodoBtn) addTodoBtn.addEventListener("click", addTask);
if (deleteButton) deleteButton.addEventListener("click", deleteAllTasks);
if (logoutButton) logoutButton.addEventListener("click", logout);

// Initial UI update
updateUI();


