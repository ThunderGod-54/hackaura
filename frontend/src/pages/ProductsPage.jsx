import React from 'react';
import './products.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES_DATA = [
    {
        id: "cropCare",
        items: [
            { id: "fertilizers", image: "https://fl-i.thgim.com/public/incoming/5o3uzt/article68914150.ece/alternates/FREE_1200/Haryana%20farmer%20" },
            { id: "pesticides", image: "https://bestbeebrothers.com/cdn/shop/articles/bbb-pesticides.jpg?v=1524752687&width=2048" },
            { id: "herbicides", image: "https://static.scientificamerican.com/sciam/cache/file/F6C02647-4B66-41FD-978DF41814785D05_source.jpg?w=600" },
            { id: "fungicides", image: "https://tiimg.tistatic.com/fp/1/009/346/organic-fungicides-387.jpg" },
            { id: "soilKits", image: "https://roestore.com/wp-content/uploads/2019/10/Soil-Test-Kit.jpg" }
        ]
    },
    {
        id: "machinery",
        items: [
            { id: "tractors", image: "https://www.deere.co.in/assets/images/region-1/products/tractors/john-deere-e-series-cab.jpg" },
            { id: "ploughs", image: "https://www.patelagroindustries.com/public/images/blog/jt8wc33oxWhkXesZZkoblUlxItMlZmlnGKhQMe5b.webp" },
            { id: "cultivators", image: "https://www.rataequipment.com/hubfs/Cultivation/812/812%20FT%20MaxitTill%20Working.jpg" },
            { id: "harvesters", image: "https://www.deere.africa/assets/images/region-4/products/harvesting/tseries-combine-r2C001197-1024x576.jpg" },
            { id: "drones", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
        ]
    },
    {
        id: "irrigation",
        items: [
            { id: "pipes", image: "https://hesupipe.com/wp-content/uploads/2025/09/irrigation-pipes.jpg" },
            { id: "drip", image: "https://www.aquahubkenya.co.ke/wp-content/uploads/2022/11/IMG_1290-scaled-e1708613513560.jpg" },
            { id: "sprinklers", image: "https://simmonslandscape.com/wp-content/uploads/2024/01/Automatic-Garden-Sprinkler.webp" },
            { id: "pumps", image: "https://tomahawk-power.com/cdn/shop/articles/wide_angle.jpg?v=1623716961" }
        ]
    },
    {
        id: "storage",
        items: [
            { id: "bags", image: "https://i0.wp.com/sesitechnologies.com/wp-content/uploads/2020/08/zerofly4.jpg?fit=1280%2C640&ssl=1" },
            { id: "silos", image: "https://images.unsplash.com/photo-1556114846-f753bec8a9f5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhaW4lMjBzaWxvfGVufDB8fDB8fHww" },
            { id: "nets", image: "https://sunsafenets.com/wp-content/uploads/2021/08/agro-shade-net-1588923291-5417547.jpeg" }
        ]
    },
    {
        id: "livestock",
        items: [
            { id: "feed", image: "https://prodigyfoods.in/wp-content/uploads/2024/09/Top-10-Benefits-of-Balanced-Nutrition-in-Cattle-Feed.jpeg2_.jpg" },
            { id: "dairy", image: "https://kimd.org/wp-content/uploads/2025/02/milk-eqp.jpg" },
            { id: "handTools", image: "https://thumbs.dreamstime.com/b/garden-tool-display-set-up-chicago-botanical-gardens-45184352.jpg" },
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