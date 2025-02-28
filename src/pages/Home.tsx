import { useEffect, useState } from "react";
import RegisterBooking from "../components/RegisterBooking";
import Login from "../components/Login";
import ModalLogin from "../components/ModalLogin";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Styling/Styling.css";
import BookingCalendar from "../components/BookingCalendar";

const Home: React.FC = () => {
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) return;

        const timeout = setTimeout(() => {
            if (
                currentUser.role === "admin" &&
                window.location.pathname !== "/admin"
            ) {
                navigate("/admin");
            } else if (
                currentUser.role === "user" &&
                window.location.pathname !== "/mypage"
            ) {
                navigate("/mypage");
            }
        }, 50); // 50ms forsinkelse

        return () => clearTimeout(timeout); // Rydder opp timeout hvis komponenten unmountes
    }, [currentUser, navigate]);

    return (
        <div className="main-container">
            <h1>Velkommen til PadelZone</h1>
            <div className="content-home">
                <div className="left-home"></div>
                <div className="register-booking">
                    <BookingCalendar />
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
