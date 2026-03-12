const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const path = require('path'); 
const fs = require('fs');     

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const users = [];
const products = [
    { id: 1, name: "Organic Tomatoes", price: "45", harvestDate: "2026-03-20", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80", farmerName: "Demo Farmer" }
];

app.post('/api/signup', (req, res) => {
    const { role, name, phone, gender, address, aadhar } = req.body;
    if (users.find(u => u.phone === phone)) return res.status(409).json({ message: "User already exists" });
    const newUser = { role, name, phone, gender, address, aadhar, createdAt: new Date() };
    users.push(newUser);
    res.status(201).json({ message: "Registration successful" });
});

app.post('/api/signin', (req, res) => {
    const { phone } = req.body;
    const user = users.find(u => u.phone === phone);
    if (user) return res.status(200).json({ message: "Sign in successful", user });
    res.status(404).json({ message: "User not found" });
});

app.get('/api/products', (req, res) => {
    res.status(200).json(products);
});

app.post('/api/products', upload.single('imageFile'), (req, res) => {
    const { name, price, harvestDate, farmerName, image, category } = req.body;

    const imageUrl = req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : image;

    const newProduct = {
        id: Date.now(),
        name,
        price,
        harvestDate,
        image: imageUrl,
        farmerName,
        category: category || 'General' 
    };

    products.unshift(newProduct);
    io.emit('product_added', newProduct); 
    res.status(201).json(newProduct);
});
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
app.post('/api/generate-invoice', async (req, res) => {
    const { cart, total, paymentMethod, orderId } = req.body;

    try {
        const doc = new PDFDocument({ margin: 50 });
        const filename = `invoice_${orderId}.pdf`;

        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/json');

        doc.pipe(res);
        doc.fontSize(20).text('MandiConnect Invoice', { align: 'center' }).moveDown();
        doc.fontSize(10).text(`Order ID: ${orderId}`, { align: 'right' });
        doc.text(`Date: ${new Date().toLocaleString()}`, { align: 'right' }).moveDown();
        doc.fontSize(12).text('Item', 50, 150);
        doc.text('Farmer', 200, 150);
        doc.text('Qty', 350, 150);
        doc.text('Price', 450, 150);
        doc.moveTo(50, 165).lineTo(550, 165).stroke();
        let y = 175;
        cart.forEach(item => {
            doc.fontSize(10).text(item.name, 50, y);
            doc.text(item.farmerName || 'Local Farmer', 200, y);
            doc.text(item.qty.toString(), 350, y);
            doc.text(`₹${(item.price * item.qty).toFixed(2)}`, 450, y);
            y += 20;
        });
        doc.moveTo(50, y).lineTo(550, y).stroke();
        doc.fontSize(12).text(`Total Amount: ₹${total.toFixed(2)}`, 350, y + 15, { bold: true });
        doc.text(`Payment Method: ${paymentMethod.toUpperCase()}`, 50, y + 15);
        const qrText = `Order: ${orderId}\nTotal: Rupees${total}\nVerified by MandiConnect`;
        const qrDataURL = await QRCode.toDataURL(qrText);
        
        doc.moveDown(4);
        doc.fontSize(10).text('Scan to verify order:', 50, y + 60);
        doc.image(qrDataURL, 50, y + 75, { width: 100 });
        doc.end();
    } catch (error) {
        console.error("PDF Error:", error);
        res.status(500).send("Error generating invoice");
    }
});
server.listen(PORT, () => {
    console.log(`Real-time server is running on port ${PORT}`);
});