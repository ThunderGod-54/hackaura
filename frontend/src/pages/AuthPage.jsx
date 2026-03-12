import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
export default function AuthPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState("Farmer");
    const [isOpen, setIsOpen] = useState(false);

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [notification, setNotification] = useState(null);
    const roles = ["Farmer", "Buyer", "Delivery Partner"];

    const handleRoleSelect = (selected) => {
        setRole(selected);
        setIsOpen(false);
    };

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };
    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                    size: "invisible"
                }
            );

            window.recaptchaVerifier.render();
        }
    };

    const sendOTP = async () => {
        if (!phone) {
            showNotification("Please enter your phone number.", "error");
            return;
        }

        let formattedPhone = phone.replace(/[^\d+]/g, "");
        if (formattedPhone.length === 10 && !formattedPhone.startsWith("+")) {
            formattedPhone = "+91" + formattedPhone;
        } else if (!formattedPhone.startsWith("+")) {
            formattedPhone = "+" + formattedPhone;
        }

        try {
            setupRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
            window.confirmationResult = confirmationResult;
            setOtpSent(true);
            showNotification("OTP sent successfully");
        } catch (error) {
            console.error("Error sending OTP:", error);
            showNotification("Failed to send OTP", "error");
        }
    };

    const handleLoginSuccess = (user) => {
        showNotification("Login successful");
        localStorage.setItem("role", role);
        if (user) {
            localStorage.setItem("userName", user.displayName || phone || "User");
            localStorage.setItem("userPhoto", user.photoURL || "");
        }
        setTimeout(() => {
            if (role === "Farmer") {
                navigate("/farmer-dashboard");
            } else if (role === "Buyer") {
                navigate("/buyer-marketplace");
            } else if (role === "Delivery Partner") {
                navigate("/delivery-dashboard");
            }
        }, 1000);
    };

    const verifyOTP = async () => {
        if (!otp) {
            showNotification("Please enter the OTP.", "error");
            return;
        }

        try {
            const result = await window.confirmationResult.confirm(otp);
            console.log(result.user);
            handleLoginSuccess(result.user);
        } catch (error) {
            console.error("Error verifying OTP:", error);
            showNotification("Invalid OTP", "error");
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user);
            handleLoginSuccess(result.user);
        } catch (error) {
            console.error("Error signing in with Google:", error);
            showNotification("Failed to sign in with Google", "error");
        }
    };

    return (
        <div className="auth-container">
            <button className="back-btn" onClick={() => window.history.back()}>
                ← Back
            </button>

            <div className="auth-box">
                <header className="auth-header">
                    <h1>MandiConnect</h1>
                    <p>{isLogin ? "Welcome back" : "Create your account"}</p>
                </header>

                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>

                    {/* ROLE SELECT */}
                    <div className="input-group">
                        <label>I am a...</label>

                        <div className={`custom-select ${isOpen ? "open" : ""}`}>
                            <div
                                className="select-trigger"
                                onClick={() => setIsOpen(!isOpen)}
                            >
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

                    {/* NAME */}
                    {!isLogin && (
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="John Doe" />
                        </div>
                    )}

                    {/* PHONE NUMBER */}
                    <div className="input-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+91 9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div id="recaptcha-container"></div>

                    {/* SEND OTP / GOOGLE OR DIVIDER */}
                    {!otpSent && (
                        <div className="auth-btn-group">
                            <button type="button" className="btn-primary" onClick={sendOTP} style={{ width: '100%', marginBottom: '15px' }}>
                                Send OTP
                            </button>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#666', fontSize: '0.9rem' }}>
                                <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ddd' }} />
                                <span style={{ padding: '0 10px' }}>or</span>
                                <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ddd' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button type="button" className="google-icon-btn" onClick={signInWithGoogle} title="Continue with Google" style={{ 
                                    background: 'white', border: '1px solid #ddd', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', transition: 'transform 0.2s, box-shadow 0.2s' 
                                }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)' }} onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)' }}>
                                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.799 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.679 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* OTP INPUT */}
                    {otpSent && (
                        <>
                            <div className="input-group">
                                <label>Enter OTP</label>
                                <input
                                    type="text"
                                    placeholder="6 digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>

                            <button type="button" className="btn-primary" onClick={verifyOTP}>
                                Verify OTP
                            </button>
                        </>
                    )}

                </form>

                <footer className="auth-footer">
                    <p>
                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}{" "}
                        <span onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Sign up" : "Log in"}
                        </span>
                    </p>
                </footer>
            </div>

            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
}