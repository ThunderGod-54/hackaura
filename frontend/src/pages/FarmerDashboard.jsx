import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboards.css';
import { auth } from '../firebase';

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Farmer';
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      // Filter products only added by this farmer if we had user IDs, for now show all to them
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [newProduct, setNewProduct] = useState({ name: '', price: '', harvestDate: '', image: '' });

  const handleLogout = () => {
    auth.signOut().then(() => {
      localStorage.clear();
      navigate('/auth');
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.harvestDate) return;

    const fallbackImage = "https://images.unsplash.com/photo-1595856720815-cc96f7c9ebdf?w=500&q=80"; // Generic veggies
    const productPayload = {
      ...newProduct,
      image: newProduct.image || fallbackImage,
      farmerName: userName
    };

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productPayload)
      });
      const data = await response.json();
      if (response.ok) {
        setProducts([data, ...products]);
        setNewProduct({ name: '', price: '', harvestDate: '', image: '' });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="dashboard-container farmer-theme">
      {/* Navigation */}
      <nav className="premium-navbar farmer-nav">
        <div className="nav-brand">
          <span style={{ fontSize: '1.8rem' }}>🌾</span>
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
        <div className="dashboard-header">
          <div>
            <h1 className="welcome-text">Welcome back, {userName}</h1>
            <p className="subtitle">Manage your farm's harvest and reach more buyers.</p>
          </div>
          <button className="btn-add-product" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : '+ Add Harvest'}
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="addProduct-card slide-down">
            <h3>List a New Harvest</h3>
            <form onSubmit={handleAddProduct} className="upload-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" placeholder="e.g. Organic Carrots" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Expected Price (₹/kg)</label>
                  <input type="number" placeholder="Enter custom price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Expected Harvest Date</label>
                  <input type="date" value={newProduct.harvestDate} onChange={e => setNewProduct({ ...newProduct, harvestDate: e.target.value })} required />
                </div>
              </div>
              <div className="form-group full-width">
                <label>Image URL (Optional)</label>
                <input type="url" placeholder="Paste an image URL of your crop" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
              </div>
              <button type="submit" className="btn-submit">Publish Product</button>
            </form>
          </div>
        )}

        {/* Products Grid */}
        <div className="products-container">
          <h2 className="section-title">Your Current Listings</h2>
          {products.length === 0 ? (
            <div className="empty-state">No products listed yet. Add your first harvest!</div>
          ) : (
            <div className="product-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                    <div className="price-tag">₹{product.price}/kg</div>
                  </div>
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p className="harvest-date">
                      <span className="icon">📅</span> Harvest: {new Date(product.harvestDate).toLocaleDateString()}
                    </p>
                    <div className="card-actions">
                      <button className="btn-edit">Edit</button>
                      <button className="btn-delete" onClick={() => setProducts(products.filter(p => p.id !== product.id))}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}