import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import logo from "../assets/padelzone-logo.png";
import "./styling/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { delCurrentUser } from "../redux/userSlice";
import { useState } from "react";
import ModalLogin from "./ModalLogin";
import Login from "./Login";

const Navbar: React.FC = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(delCurrentUser(null));
        navigate("/");
    };

    return (
        <nav className="navbar">
            <Link to="/">
                <img src={logo} alt="PadelZone Logo" className="logo" />
            </Link>
            {currentUser ? (
                <h3>Velkommen {currentUser.name}!</h3>
            ) : (
                <h3>Logg inn, eller registrer deg!</h3>
            )}
            <ul>
                <li>
                    <Link to="/">Hjem</Link>
                </li>
                {currentUser ? (
                    <>
                        <li>
                            <Link to="/mypage">Min Side</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={handleLogout}>
                                Logg ut
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link
                                to="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsLoginOpen(true);
                                }}
                            >
                                Logg inn
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">Registrer deg</Link>
                        </li>
                    </>
                )}
            </ul>
            <ModalLogin
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            >
                <Login onClose={() => setIsLoginOpen(false)} />
            </ModalLogin>
        </nav>
    );
};

export default Navbar;
