import React, { useState } from "react";
import "./auth.css";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState("Farmer");
    const [isOpen, setIsOpen] = useState(false);

    const roles = ["Farmer", "Buyer", "Delivery Partner"];

    const handleRoleSelect = (selected) => {
        setRole(selected);
        setIsOpen(false);
    };

    return (
        <div className="auth-container">
            <button className="back-btn" onClick={() => window.history.back()}>
                <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Back</span>
            </button>
            <div className="auth-box">
                <header className="auth-header">
                    <h1>MandiConnect</h1>
                    <p>{isLogin ? "Welcome back" : "Create your account"}</p>
                </header>

                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <label>I am a...</label>
                        <div className={`custom-select ${isOpen ? "open" : ""}`}>
                            <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
                                <span>{role}</span>
                                <span className="chevron">▼</span>
                            </div>

                            {isOpen && (
                                <div className="select-options">
                                    {roles.map((r) => (
                                        <div
                                            key={r}
                                            className={`option ${role === r ? "selected" : ""}`}
                                            onClick={() => handleRoleSelect(r)}
                                        >
                                            {r}
                                            {role === r && <span className="check">✓</span>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {!isLogin && (
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="John Doe" />
                        </div>
                    )}

                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="name@example.com" />
                    </div>

                    <button type="submit" className="btn-primary">
                        {isLogin ? "Sign In" : "Get Started"}
                    </button>
                </form>

                <footer className="auth-footer">
                    <p>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <span onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Sign up" : "Log in"}
                        </span>
                    </p>
                </footer>
            </div>
        </div>
    );
}