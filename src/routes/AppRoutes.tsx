import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";
import Admin from "../pages/Admin";
import Navbar from "../components/Navbar";
import RegisterUser from "../components/RegisterUser";
import Footer from "../components/Footer";
// import ProtectedRoute from "./ProtectedRoutes";
// import Navbar from "../components/Navbar";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRoutes;
