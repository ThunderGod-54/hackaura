const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory db for demonstration
const users = [];

app.post('/api/signup', (req, res) => {
    const { role, name, phone, gender, address, aadhar } = req.body;

    // Check if user exists
    if (users.find(u => u.phone === phone)) {
        return res.status(409).json({ message: "User already exists" });
    }

    const newUser = { role, name, phone, gender, address, aadhar, createdAt: new Date() };
    users.push(newUser);

    console.log("New user registered:", newUser);
    res.status(201).json({ message: "Registration successful" });
});

app.post('/api/signin', (req, res) => {
    const { phone } = req.body;
    const user = users.find(u => u.phone === phone);
    if (user) {
        console.log("User signed in:", user);
        return res.status(200).json({ message: "Sign in successful", user });
    } else {
        return res.status(404).json({ message: "You haven't registered so please register" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});