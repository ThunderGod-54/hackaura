import "./landing.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing">
            {/* SIDE DOCKER / SIDEBAR */}
            <nav className="sidebar">
                <div className="sidebar-top">
                    <div className="sidebar-logo">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <span className="logo-text">MandiConnect</span>
                    </div>

                    <div className="sidebar-links">
                        <a href="#features" className="sidebar-link">
                            <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                            <span className="link-text">Features</span>
                        </a>
                        <button onClick={() => navigate("/products")} className="sidebar-link" style={{ border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}>
                            <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            <span className="link-text">Our Products</span>
                        </button>
                        <a href="#how-it-works" className="sidebar-link">
                            <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <span className="link-text">How it Works</span>
                        </a>
                        <a href="#about" className="sidebar-link">
                            <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            <span className="link-text">About</span>
                        </a>
                    </div>
                </div>

                <div className="sidebar-bottom">
                    <button className="sidebar-btn pulse-glow-small" onClick={() => navigate("/auth")}>
                        <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                        <span className="link-text">Get Started</span>
                    </button>
                </div>
            </nav>

            <main className="main-content">
                {/* HERO */}
                <section className="hero">
                    <div className="hero-content">
                        <div className="hero-badge">Empowering Farmers</div>
                        <h1>
                            Direct Farm <span>to Retail</span> Marketplace
                        </h1>
                        <p>
                            Connect farmers directly with retailers.
                            Sell harvests faster, eliminate middlemen, and grow profits with an easy-to-use platform.
                        </p>
                        <div className="hero-buttons">
                            <button className="primary-btn pulse-glow" onClick={() => navigate("/auth")}>
                                Start Selling Now
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </button>
                            <button className="secondary-btn" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
                                Explore Features
                            </button>
                        </div>
                    </div>
                </section>

                {/* FEATURES */}
                <section id="features" className="features-section">
                    <div className="section-head">
                        <h2>Why Choose MandiConnect?</h2>
                        <p>Designed specifically to make trading simple and profitable.</p>
                    </div>

                    <div className="features">
                        <div className="feature-card">
                            <div className="feature-icon bg-green">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4M2 2l20 20" /></svg>
                            </div>
                            <h3>Offline First</h3>
                            <p>List your harvest even without internet. We will automatically sync when you're back online.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon bg-yellow">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                            </div>
                            <h3>Direct Orders</h3>
                            <p>Retailers place bulk orders directly from farmers, cutting out the unpredictable middlemen.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon bg-blue">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                            </div>
                            <h3>Fast Payments</h3>
                            <p>Get paid quickly and securely directly to your bank account via UPI integration.</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="cta">
                    <div className="cta-container">
                        <h2>Ready to grow your profits?</h2>
                        <p>Join thousands of farmers tracking better prices and wider reach.</p>
                        <button className="cta-btn" onClick={() => navigate("/auth")}>
                            Join MandiConnect Today
                        </button>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="footer">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <span>MandiConnect</span>
                        </div>
                        <div className="footer-links">
                            <a href="#features">Features</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Support</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2026 MandiConnect. Empowering roots.</p>
                    </div>
                </footer>
            </main>
        </div>
    );
}