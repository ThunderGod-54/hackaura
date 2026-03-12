import "./auth.css";

export default function AuthPage() {
    const selectRole = (role) => {
        console.log("Selected role:", role);

        // later you can redirect to OTP login
        // navigate(`/login/${role}`)
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <h1>MandiConnect</h1>
                <p>Select how you want to use the platform</p>

                <div className="roles">

                    <div className="role-card" onClick={() => selectRole("farmer")}>
                        <div className="role-icon">🌾</div>
                        <h3>Farmer</h3>
                        <p>List harvests and sell directly to retailers</p>
                    </div>

                    <div className="role-card" onClick={() => selectRole("buyer")}>
                        <div className="role-icon">🛒</div>
                        <h3>Buyer</h3>
                        <p>Browse produce and place bulk orders</p>
                    </div>

                    <div className="role-card" onClick={() => selectRole("delivery")}>
                        <div className="role-icon">🚚</div>
                        <h3>Delivery Partner</h3>
                        <p>Transport goods between farms and retailers</p>
                    </div>

                </div>

            </div>

        </div>
    );
}