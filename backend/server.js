const express = require('express');
const cors = require('cors');
const http = require('http'); // [Added for Socket]
const { Server } = require('socket.io'); // [Added for Socket]
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app); // [Wrap the express app]
const io = new Server(server, {
    cors: { origin: "http://localhost:3000" } // [Allow your React frontend]
});
app.use(cors());
app.use(express.json());
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

// In-memory products db
const products = [
    { id: 1, name: "Organic Tomatoes", price: "45", harvestDate: "2026-03-20", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80", farmerName: "Demo Farmer" },
    { id: 2, name: "Fresh Broccoli", price: "60", harvestDate: "2026-03-18", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&q=80", farmerName: "Demo Farmer" }
];

app.get('/api/products', (req, res) => {
    res.status(200).json(products);
});

app.post('/api/products', (req, res) => {
    const { name, price, harvestDate, image, farmerName } = req.body;
    const newProduct = {
        id: Date.now(),
        name,
        price,
        harvestDate,
        image,
        farmerName
    };
    products.unshift(newProduct);
    res.status(201).json(newProduct);
});
app.post('/api/products', (req, res) => {
    const { name, price, harvestDate, image, farmerName } = req.body;
    const newProduct = {
        id: Date.now(),
        name,
        price,
        harvestDate,
        image,
        farmerName
    };

    products.unshift(newProduct);

    // REAL-TIME TRIGGER: This sends the new product to every connected Buyer
    io.emit('product_added', newProduct);

    res.status(201).json(newProduct);
});
server.listen(PORT, () => {
    console.log(`Real-time server is running on port ${PORT}`);
});