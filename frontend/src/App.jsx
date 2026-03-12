import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerMarketplace from "./pages/BuyerMarketplace";
import DeliveryDashboard from "./pages/DeliveryDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
      <Route path="/buyer-marketplace" element={<BuyerMarketplace />} />
      <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
    </Routes>
  );
}

export default App;