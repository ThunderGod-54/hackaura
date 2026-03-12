import "./landing.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate();

    return (
        <div className="landing">

            {/* NAVBAR */}
            <nav className="nav">
                <div className="logo">MandiConnect</div>

                <div className="nav-links">
                    <a href="#">Features</a>
                    <a href="#">How it Works</a>
                    <a href="#">About</a>
                </div>

                <button className="nav-btn" onClick={() => navigate("/auth")}>
                    Get Started
                </button>
            </nav>

            {/* HERO */}
            <section className="hero">
                <h1>
                    Direct Farm <span>to Retail</span> Marketplace
                </h1>

                <p>
                    Connect farmers directly with retailers.
                    Sell harvests faster, eliminate middlemen, and grow profits.
                </p>

                <div className="hero-buttons">
                               
                </div>
            </section>

            {/* FEATURES */}
            <section className="features">

                <div className="feature">
                    <h3>Offline First</h3>
                    <p>List harvest even without internet. Sync automatically later.</p>
                </div>

                <div className="feature">
                    <h3>Direct Orders</h3>
                    <p>Retailers place bulk orders directly from farmers.</p>
                </div>

                <div className="feature">
                    <h3>UPI Payments</h3>
                    <p>Fast and secure payments directly to farmers.</p>
                </div>

            </section>

            {/* CTA */}
            <section className="cta">
                <h2>Empowering Farmers. Simplifying Supply Chains.</h2>

                <button
                    className="primary-btn"
                    onClick={() => navigate("/auth")}
                >
                    Join MandiConnect
                </button>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <p>© 2026 MandiConnect</p>
            </footer>

        </div>
    );
}