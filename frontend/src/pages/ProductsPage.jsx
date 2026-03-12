import React from 'react';
import './products.css';
import { useNavigate } from 'react-router-dom';


const categories = [
    
    {
        title: "Crop Care & Protection",
        items: [
            { name: "Fertilizers", image: "https://images.unsplash.com/photo-1505322471958-89c0fe33722e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Pesticides", image: "https://images.unsplash.com/photo-1610408542981-b55979bcdaaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Herbicides", image: "https://images.unsplash.com/photo-1599863261644-8f7ad96e2acc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Fungicides", image: "https://images.unsplash.com/photo-1595183916949-a29d51ccfc43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Soil testing kits", image: "https://images.unsplash.com/photo-1530836369250-ef71a3f5e481?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
        ]
    },
    {
        title: "Heavy Machinery",
        items: [
            { name: "Tractors", image: "https://images.unsplash.com/photo-1592881882046-6b2a472db45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Ploughs", image: "https://images.unsplash.com/photo-1605330366627-c81b95388c3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Cultivators", image: "https://images.unsplash.com/photo-1589708761276-87e35b71db41?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Harvesters", image: "https://images.unsplash.com/photo-1592881882046-6b2a472db45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Farming drones", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
        ]
    },
    {
        title: "Irrigation & Water Management",
        items: [
            { name: "Irrigation pipes", image: "https://images.unsplash.com/photo-1563216899-73dabc017e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Drip irrigation systems", image: "https://images.unsplash.com/photo-1558451842-8c1d5d14df63?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Sprinkler systems", image: "https://images.unsplash.com/photo-1541018671183-42e761f0fc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Water pumps", image: "https://images.unsplash.com/photo-1561081397-9e9000cc55bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
        ]
    },
    {
        title: "Storage & Post-Harvest",
        items: [
            { name: "Crop storage bags", image: "https://images.unsplash.com/photo-1605330366627-c81b95388c3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Grain silos", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Shade nets", image: "https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
        ]
    },
    {
        title: "Livestock & Hand Tools",
        items: [
            { name: "Animal feed", image: "https://images.unsplash.com/photo-1502472918451-f76150ad365b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Dairy equipment", image: "https://images.unsplash.com/photo-1550585640-a3fc4e0d7c71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Farm hand tools (sickle, hoe, shovel)", image: "https://images.unsplash.com/photo-1589708761276-87e35b71db41?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Farm management mobile apps", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
        ]
    }
];

export default function ProductsPage() {
    const navigate = useNavigate();

    return (
        <div className="products-page">
            <nav className="products-nav">
                <button className="back-btn" onClick={() => window.history.back()}>
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span>Back</span>
                </button>
                <div className="nav-title"></div>
                <button className="nav-action-btn" onClick={() => navigate("/auth")}>Get Started</button>
            </nav>

            <header className="products-header">
                <h1>Everything you need to grow better.</h1>
                <p>From seeds to storage, discover top-quality agricultural products directly sourced and verified for farmers.</p>
            </header>

            <main className="products-container">
                {categories.map((category, idx) => (
                    <section key={idx} className="product-category">
                        <h2>{category.title}</h2>
                        <div className="product-grid">
                            {category.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="product-card">
                                    <div className="product-icon-wrap">
                                        <img src={item.image} alt={item.name} className="product-image" />
                                    </div>
                                    <h3>{item.name}</h3>
                                    <button className="view-btn">View Details</button>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </main>

            <footer className="products-footer">
                <p>© 2026 MandiConnect. High quality yields begin with high quality inputs.</p>
            </footer>
        </div>
    );
}