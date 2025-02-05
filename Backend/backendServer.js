
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');

// const app = express();
// const PORT = process.env.PORT || 3000; 
// const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// app.use(cors());
// app.use(bodyParser.json());

// let users = {};
// let todos = {};

// function authenticateUser(req, res, next) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, SECRET_KEY, (err, user) => {
//         if (err) return res.status(403).json({ error: 'Forbidden', details: err.message }); 
//         req.user = user;
//         if (!todos[user.username]) todos[user.username] = [];
//         next();
//     });
// }

// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ error: "Username and password are required" });
//     }

//     if (users[username]) {
//         return res.status(400).json({ error: 'User already exists' });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         users[username] = hashedPassword;
//         todos[username] = [];

//         const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
//         res.json({ token, message: "User registered successfully" }); // Send success message
//     } catch (error) {
//         console.error("Error during registration:", error);
//         res.status(500).json({ error: 'Registration failed', details: error.message }); // Send error message
//     }
// });

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = users[username];

//     if (!user) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     try {
//         const passwordMatch = await bcrypt.compare(password, user);
//         if (!passwordMatch) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
//         res.json({ token, message: "User logged in successfully" }); // Send success message
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({ error: 'Login failed', details: error.message });
//     }
// });

// app.get('/todos', authenticateUser, (req, res) => {
//     res.json(todos[req.user.username] || []);
// });

// app.post('/todos', authenticateUser, (req, res) => {
//     const { text } = req.body;

//     if (!text || text.trim().length === 0) {
//         return res.status(400).json({ error: "Task text is required" });
//     }

//     const newTask = { id: crypto.randomUUID(), text: text.trim(), completed: false };
//     todos[req.user.username].push(newTask);
//     res.json(newTask);
// });

// app.put('/todos/:id', authenticateUser, (req, res) => {
//     const { id } = req.params;
//     const taskList = todos[req.user.username];

//     const task = taskList.find(t => t.id === id);
//     if (!task) return res.status(404).json({ error: 'Task not found' });

//     task.completed = req.body.completed;
//     res.json(task);
// });

// app.delete('/todos', authenticateUser, (req, res) => {
//     try {
//         todos[req.user.username] = [];
//         res.status(204).end();
//     } catch (error) {
//         console.error("Error deleting tasks:", error);
//         res.status(500).json({ error: "Failed to delete tasks", details: error.message });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });





const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

app.use(cors());
app.use(bodyParser.json());

let users = {};
let todos = {};

function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden', details: err.message });
        req.user = user;
        if (!todos[user.username]) todos[user.username] = [];
        next();
    });
}

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    if (users[username]) {
        return res.status(400).json({ error: 'User already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users[username] = hashedPassword;
        todos[username] = [];

        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, message: "User registered successfully" }); // Send success message
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: 'Registration failed', details: error.message }); // Send error message
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users[username];

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    try {
        const passwordMatch = await bcrypt.compare(password, user);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, message: "User logged in successfully" }); // Send success message
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});

app.get('/todos', authenticateUser, (req, res) => {
    res.json(todos[req.user.username] || []);
});

app.post('/todos', authenticateUser, (req, res) => {
    const { title, description } = req.body;

    if (!title || title.trim().length === 0) {
        return res.status(400).json({ error: "Task title is required" });
    }

    const newTask = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description ? description.trim() : "",
        completed: false
    };
    todos[req.user.username].push(newTask);
    res.json(newTask);
});

app.put('/todos/:id', authenticateUser, (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const taskList = todos[req.user.username];
    const task = taskList.find(t => t.id === id);

    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description ? description.trim() : "";
    if (completed !== undefined) task.completed = completed;

    res.json(task);
});

app.delete('/todos', authenticateUser, (req, res) => {
    try {
        todos[req.user.username] = [];
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting tasks:", error);
        res.status(500).json({ error: "Failed to delete tasks", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});