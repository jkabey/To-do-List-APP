
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

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;HttpOnly;Secure";
}

function getCookie(name) {
    let cookieName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return "";
}

let authToken = getCookie("authToken");

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
        .then(res => {
            if (!res.ok) {
              return res.json().then(err => {throw new Error(err.error || "Registration failed")});
            }
            return res.json();
        })
        .then((data) => {
            alert(data.message || "Registration successful!");
            setCookie("authToken", data.token, 7);
            authToken = data.token;
            updateUI();
        })
        .catch((error) => {
            console.error("Error registering:", error);
            alert(error.message || "An unexpected error occurred during registration.");
        });
    });
}

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
        .then(res => {
            if (!res.ok) {
              return res.json().then(err => {throw new Error(err.error || "Login failed")});
            }
            return res.json();
        })
        .then((data) => {
            alert(data.message || "Login successful!");
            setCookie("authToken", data.token, 7);
            authToken = data.token;
            updateUI();
        })
        .catch((error) => {
            console.error("Error logging in:", error);
            alert(error.message || "An unexpected error occurred during login.");
        });
    });
}

function fetchTodos() {
    fetch(`${API_URL}/todos`, {
        headers: { Authorization: "Bearer " + authToken },
    })
        .then((res) => res.json())
        .then((todos) => {
            displayTasks(todos);
        })
        .catch((error) => console.error("Error fetching todos:", error));
}

function addTask() {
    const text = todoInput.value.trim();
    if (!text) return alert("Task cannot be empty!");

    fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
        },
        body: JSON.stringify({ text }),
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => {throw new Error(err.error || "Failed to add task")});
            }
            return res.json();
        })
        .then(() => {
            fetchTodos();
            todoInput.value = "";
        })
        .catch((error) => {
            console.error("Error adding task:", error);
            alert(error.message || "An unexpected error occurred while adding task.")
        });
}

function toggleTask(id, completed) {
    fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
        },
        body: JSON.stringify({ completed }),
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => {throw new Error(err.error || "Failed to toggle task")});
        }
        return res.json();
    })
        .then(() => fetchTodos())
        .catch((error) => {
            console.error("Error toggling task:", error);
            alert(error.message || "An unexpected error occurred while toggling task.")
        });
}

function deleteAllTasks() {
    fetch(`${API_URL}/todos`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + authToken,
        },
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => { throw new Error(err.error || "Failed to delete tasks") });
            }
            return res;
        })
        .then(() => {
            fetchTodos();
        })
        .catch((error) => {
            console.error("Error deleting tasks:", error);
            alert(error.message || "Failed to delete tasks");
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
        p.textContent = item.text;
        p.style.textDecoration = item.completed ? "line-through" : "none";

        li.appendChild(checkbox);
        li.appendChild(p);
        todoList.appendChild(li);
    });

    todoCount.textContent = todos.length;
}

function logout() {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    authToken = null;
    updateUI();
}

if (addTodoBtn) addTodoBtn.addEventListener("click", addTask);
if (deleteButton) deleteButton.addEventListener("click", deleteAllTasks);
if (logoutButton) logoutButton.addEventListener("click", logout);

updateUI();