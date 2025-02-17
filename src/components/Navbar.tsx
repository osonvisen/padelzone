import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
import logo from "../assets/padelzone-logo.png";
import "./styling/Navbar.css";

const Navbar: React.FC = () => {
    // const user = useSelector((state: RootState) => state.user);

    return (
        <nav className="navbar">
            <Link to="/">
                <img src={logo} alt="PadelZone Logo" className="logo" />
            </Link>
            <ul>
                <li>
                    <Link to="/">Hjem</Link>
                </li>
                <li>
                    <Link to="/mypage">Min Side</Link>
                </li>
                <li>
                    <Link to="/admin">Admin</Link>
                </li>
            </ul>
            {/* <div className="auth">
                {user.name ? (
                    <p>Velkommen, {user.name}!</p>
                ) : (
                    <Link to="/login" className="login-btn">
                        Logg inn
                    </Link>
                )}
            </div> */}
        </nav>
    );
};

export default Navbar;
