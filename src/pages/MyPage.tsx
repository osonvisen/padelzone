import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import RegisterBooking from "../components/RegisterBooking";
import { useNavigate } from "react-router-dom";
import ShowBookings from "../components/ShowBookings";
import "./Styling/Styling.css";
import "./Styling/MyPage.css";

const MyPage = () => {
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const navigate = useNavigate();

    if (!currentUser) {
        navigate("/");
    }

    return (
        <div className="main-container">
            <h2>Min side</h2>
            <div className="my-content">
                <div className="register-booking">
                    <RegisterBooking />
                </div>
                <div className="show-bookings">
                    <ShowBookings />
                </div>
            </div>
        </div>
    );
};

export default MyPage;
