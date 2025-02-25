import { useEffect, useState } from "react";
import RegisterBooking from "../components/RegisterBooking";
import Login from "../components/Login";
import ModalLogin from "../components/ModalLogin";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Styling/Styling.css";

const Home: React.FC = () => {
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            if (currentUser.role === "admin") {
                navigate("/admin");
            } else if (currentUser.role === "user") {
                navigate("/mypage");
            }
        }
    }, [currentUser, navigate]);

    return (
        <div className="main-container">
            <h1>Velkommen til PadelZone</h1>
            <div className="content-home">
                <div className="left-home"></div>
                <div className="register-booking">
                    <RegisterBooking />
                </div>
            </div>

            {currentUser ? (
                <>
                    <h1>Du er logget inn som {currentUser.name}</h1>
                </>
            ) : (
                <div className="lower">
                    <button
                        className="login-btn"
                        onClick={() => setIsLoginOpen(true)}
                    >
                        Logg inn
                    </button>
                    <ModalLogin
                        isOpen={isLoginOpen}
                        onClose={() => setIsLoginOpen(false)}
                    >
                        <Login onClose={() => setIsLoginOpen(false)} />
                    </ModalLogin>
                </div>
            )}
        </div>
    );
};

export default Home;
