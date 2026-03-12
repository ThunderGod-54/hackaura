import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './dashboards.css';

// Connect to the backend
const socket = io("http://localhost:5000");

export default function BuyerMarketplace() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 1. Initial fetch of existing products
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));

    // 2. Listen for real-time updates from the server
    socket.on('product_added', (newProduct) => {
      setProducts((prev) => [newProduct, ...prev]);
    });

    return () => socket.off('product_added'); // Cleanup
  }, []);

  return (
    <div className="dashboard-container buyer-theme">
      <main className="dashboard-content">
        <h2 className="section-title">Live Marketplace ⚡</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card buyer-card">
              <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                <div className="price-tag">₹{product.price}/kg</div>
              </div>
              <div className="product-details">
                <h4>{product.name}</h4>
                <p className="farmer-info">👨‍🌾 Sold by: {product.farmerName}</p>
                <button className="btn-buy">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}