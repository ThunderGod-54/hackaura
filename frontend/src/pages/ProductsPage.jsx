import React from 'react';
import './products.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES_DATA = [
    {
        id: "cropCare",
        items: [
            { id: "fertilizers", image: "https://images.unsplash.com/photo-1505322471958-89c0fe33722e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "pesticides", image: "https://images.unsplash.com/photo-1610408542981-b55979bcdaaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "herbicides", image: "https://images.unsplash.com/photo-1599863261644-8f7ad96e2acc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "fungicides", image: "https://images.unsplash.com/photo-1595183916949-a29d51ccfc43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "soilKits", image: "https://images.unsplash.com/photo-1530836369250-ef71a3f5e481?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
        ]
    },
    {
        id: "machinery",
        items: [
            { id: "tractors", image: "https://images.unsplash.com/photo-1592881882046-6b2a472db45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "ploughs", image: "https://images.unsplash.com/photo-1605330366627-c81b95388c3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "cultivators", image: "https://images.unsplash.com/photo-1589708761276-87e35b71db41?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "harvesters", image: "https://images.unsplash.com/photo-1592881882046-6b2a472db45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "drones", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
        ]
    },
    {
        id: "irrigation",
        items: [
            { id: "pipes", image: "https://images.unsplash.com/photo-1563216899-73dabc017e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "drip", image: "https://images.unsplash.com/photo-1558451842-8c1d5d14df63?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "sprinklers", image: "https://images.unsplash.com/photo-1541018671183-42e761f0fc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "pumps", image: "https://images.unsplash.com/photo-1561081397-9e9000cc55bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
        ]
    },
    {
        id: "storage",
        items: [
            { id: "bags", image: "https://images.unsplash.com/photo-1605330366627-c81b95388c3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "silos", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "nets", image: "https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
        ]
    },
    {
        id: "livestock",
        items: [
            { id: "feed", image: "https://images.unsplash.com/photo-1502472918451-f76150ad365b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "dairy", image: "https://images.unsplash.com/photo-1550585640-a3fc4e0d7c71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "handTools", image: "https://images.unsplash.com/photo-1589708761276-87e35b71db41?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { id: "apps", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
        ]
    }
];

export default function ProductsPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const translatedCategories = t('products.categoriesArr');

    // Merge translated text with original image data
    const finalCategories = translatedCategories.map((cat, i) => ({
        ...cat,
        items: cat.items.map((item, j) => ({
            ...item,
            image: CATEGORIES_DATA[i]?.items[j]?.image || ""
        }))
    }));

    return (
        <div className="products-page">
            <nav className="products-nav">
                <button className="back-btn" onClick={() => window.history.back()}>
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span>{t('common.back')}</span>
                </button>
                <div className="nav-title"></div>
                <button className="nav-action-btn" onClick={() => navigate("/auth")}>{t('common.getStarted')}</button>
            </nav>

            <header className="products-header">
                <h1>{t('products.growBetter')}</h1>
                <p>{t('products.growDesc')}</p>
            </header>

            <main className="products-container">
                {finalCategories.map((category, idx) => (
                    <section key={idx} className="product-category">
                        <h2>{category.title}</h2>
                        <div className="product-grid">
                            {category.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="product-card">
                                    <div className="product-icon-wrap">
                                        <img src={item.image} alt={item.name} className="product-image" />
                                    </div>
                                    <h3>{item.name}</h3>
                                    <button className="view-btn">{t('products.viewDetails')}</button>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </main>

            <footer className="products-footer">
                <p>{t('products.footer')}</p>
            </footer>
        </div>
    );
}