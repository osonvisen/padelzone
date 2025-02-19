import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";
import Admin from "../pages/Admin";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
// import ProtectedRoute from "./ProtectedRoutes";
// import Navbar from "../components/Navbar";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
