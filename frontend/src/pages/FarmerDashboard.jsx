import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboards.css';
import './FarmerDashboard.css';
import { auth } from '../firebase';
import {
  IconWheat, IconLeaf, IconSprout,
  IconPackage, IconTrendingUp, IconCalendar, IconUser,
  IconEdit, IconTrash, IconRocket, IconPlus, IconX
} from './Icons';
import { GoogleGenerativeAI } from "@google/generative-ai";
export default function FarmerDashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Farmer';
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  // 1. Inside your component, add this new state
  const [selectedFile, setSelectedFile] = useState(null);

  // 2. Update your handleAddProduct function
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.harvestDate) return;

    // Create FormData to handle the file upload
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('harvestDate', newProduct.harvestDate);
    formData.append('farmerName', userName);
    formData.append('category', newProduct.category);
    // Attach the physical file if selected, otherwise fallback to the URL string
    if (selectedFile) {
      formData.append('imageFile', selectedFile);
    } else {
      formData.append('image', newProduct.image || "https://images.unsplash.com/photo-1595856720815-cc96f7c9ebdf?w=500&q=80");
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        // IMPORTANT: Do not set 'Content-Type' headers; the browser does it automatically for FormData
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setProducts([data, ...products]);
        setNewProduct({ name: '', price: '', harvestDate: '', image: '' });
        setSelectedFile(null); // Clear the file after success
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    harvestDate: '',
    image: '',
    category: 'Vegetables' // Set a default
  });

  const handleLogout = () => {
    auth.signOut().then(() => {
      localStorage.clear();
      navigate('/auth');
    });
  };

  // const handleAddProduct = async (e) => {
  //   e.preventDefault();
  //   if (!newProduct.name || !newProduct.price || !newProduct.harvestDate) return;

  //   const fallbackImage = "https://images.unsplash.com/photo-1595856720815-cc96f7c9ebdf?w=500&q=80";
  //   const productPayload = {
  //     ...newProduct,
  //     image: newProduct.image || fallbackImage,
  //     farmerName: userName
  //   };

  //   try {
  //     const response = await fetch("http://localhost:5000/api/products", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(productPayload)
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       setProducts([data, ...products]);
  //       setNewProduct({ name: '', price: '', harvestDate: '', image: '' });
  //       setShowAddForm(false);
  //     }
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //   }
  // };

  const handleDeleteProduct = async (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '';
    e.target.style.display = 'none';
    e.target.parentElement.classList.add('img-fallback');
  };
  // --- CHATBOT STATES & REFS ---
  const chatEndRef = useRef(null);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your MandiConnect AI Assistant. How can I help with your harvest today?' }
  ]);

  // Auto-scroll logic: Keeps the latest message in view [cite: 31]
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', text: chatInput };
    // Add user message to UI immediately
    setMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    try {
      const genAI = new GoogleGenerativeAI("geminikey");
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: "You are the MandiConnect AI Assistant. You help farmers with crop health, market prices, and farming advice. Keep responses concise and professional."
      });

      // FIX: Filter out the initial 'bot' greeting so history starts with 'user'
      const apiHistory = messages
        .filter((m, index) => !(index === 0 && m.role === 'bot'))
        .map(m => ({
          role: m.role === 'bot' ? 'model' : 'user',
          parts: [{ text: m.text }],
        }));

      const chat = model.startChat({ history: apiHistory });
      const result = await chat.sendMessage(chatInput);
      const response = await result.response;
      const botText = response.text();

      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };
  
  return (
    <div className="dashboard-container farmer-theme">
      {/* Navigation */}
      <nav className="premium-navbar farmer-nav">
        <div className="nav-brand">
          <IconWheat size={26} />
          MandiConnect Farmer
        </div>
        <div className="nav-profile-container"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}>
          <div className="nav-profile">
            {userName.charAt(0).toUpperCase()}
          </div>
          {dropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={handleLogout} className="dropdown-item">Log Out</button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Header */}
        <div className="farmer-header">
          <div className="farmer-header-text">
            <h1>Welcome back, {userName}</h1>
            <p>Manage your farm produce and reach more buyers.</p>
          </div>
          <button
            className={`farmer-btn-add ${showAddForm ? 'cancel' : ''}`}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? (
              <><IconX size={18} /> Cancel</>
            ) : (
              <><IconPlus size={18} /> Add Harvest</>
            )}
          </button>
        </div>

        {/* Stats Strip */}
        <div className="farmer-stats">
          <div className="stat-card">
            <span className="stat-icon"><IconPackage size={24} /></span>
            <div>
              <div className="stat-value">{products.length}</div>
              <div className="stat-label">Listed Products</div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon"><IconTrendingUp size={24} /></span>
            <div>
              <div className="stat-value">&#8377;{products.reduce((s, p) => s + Number(p.price || 0), 0)}</div>
              <div className="stat-label">Total Value</div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon"><IconSprout size={24} /></span>
            <div>
              <div className="stat-value">Active</div>
              <div className="stat-label">Farm Status</div>
            </div>
          </div>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="farmer-add-card slide-down">
            <h3><IconLeaf size={22} /> List a New Harvest</h3>
            <form onSubmit={handleAddProduct} className="farmer-form">
              <div className="farmer-form-grid">
                <div className="farmer-field">
                  <label>Product Name</label>
                  <input type="text" placeholder="e.g. Organic Carrots" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required />
                </div>
                <div className="farmer-field">
                  <label>Price (&#8377;/kg)</label>
                  <input type="number" placeholder="Enter price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
                </div>
                <div className="farmer-field">
                  <label>Harvest Date</label>
                  <input type="date" value={newProduct.harvestDate} onChange={e => setNewProduct({ ...newProduct, harvestDate: e.target.value })} required />
                </div>
              </div>
              <div className="farmer-field">
                <label>Crop Category</label>
                <select
                  value={newProduct.category}
                  onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="farmer-input-select"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>
              <div className="farmer-field">
                  <label>Product Image</label>
                  {/* File input for local device uploads */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    style={{ marginBottom: '10px' }}
                  />

                  <p style={{ fontSize: '0.8rem', color: '#666' }}>OR paste an image URL</p>
                <label>Image URL (Optional)</label>
                <input type="url" placeholder="Paste an image URL of your crop" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
              </div>
              {newProduct.image && (
                <div className="farmer-img-preview">
                  <img src={newProduct.image} alt="Preview" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
              )}
              <button type="submit" className="farmer-btn-submit">
                <IconRocket size={18} /> Publish Product
              </button>
            </form>
          </div>
        )}

        {/* Products Grid */}
        <div className="farmer-listings">
          <h2 className="farmer-section-title">Your Current Listings</h2>

          {products.length === 0 ? (
            <div className="farmer-empty">
              <span className="farmer-empty-icon"><IconWheat size={56} /></span>
              <h3>No products listed yet</h3>
              <p>Add your first harvest to start reaching buyers!</p>
            </div>
          ) : (
            <div className="farmer-grid">
              {products.map((product, index) => (
                <div key={product.id || index} className="farmer-product-card" style={{ animationDelay: `${index * 0.06}s` }}>
                  {/* Image */}
                  <div className="farmer-card-img-wrap">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="farmer-card-img" onError={handleImageError} loading="lazy" />
                    ) : (
                      <div className="farmer-card-img-placeholder">
                        <IconLeaf size={48} />
                      </div>
                    )}
                    <div className="farmer-card-price">&#8377;{product.price}/kg</div>
                  </div>

                  {/* Body */}
                  <div className="farmer-card-body">
                    <h4>{product.name}</h4>
                    {product.harvestDate && (
                      <p className="farmer-card-date">
                        <IconCalendar size={15} /> Harvest: {new Date(product.harvestDate).toLocaleDateString()}
                      </p>
                    )}
                    {product.farmerName && (
                      <p className="farmer-card-by">
                        <IconUser size={15} /> By: {product.farmerName}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="farmer-card-actions">
                    <button className="farmer-btn-edit"><IconEdit size={15} /> Edit</button>
                    <button className="farmer-btn-delete" onClick={() => handleDeleteProduct(product.id)}>
                      <IconTrash size={15} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <section className="integrated-ai-section">
          <div className="ai-container-header">
            <div className="ai-branding">
              <div className="ai-glow-dot"></div>
              <h3>MandiConnect AI Assistant</h3>
            </div>
            <p>Ask about crop diseases, market trends, or weather impacts.</p>
          </div>

          <div className="ai-chat-window">
            <div className="ai-chat-messages">
              {/* The '&&' checks if messages exists before trying to show them */}
              {messages && messages.map((msg, i) => (
                <div key={i} className={`ai-bubble-wrap ${msg.role}`}>
                  <div className="ai-bubble">
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form className="ai-chat-input-area" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type your farming query here..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="ai-send-btn">
                <IconRocket size={20} />
              </button>
            </form>
          </div>
        </section>
     </main>
    </div>
    
  );
}