import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import RegisterBooking from "../components/RegisterBooking";
import { useNavigate } from "react-router-dom";
import ShowBookings from "../components/ShowBookings";
import "./Styling/Styling.css";
import BookingCalendar from "../components/BookingCalendar";
// import { useState } from "react";
// import { Booking } from "../types/Booking";

const MyPage: React.FC = () => {
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const navigate = useNavigate();
    // const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
    //     null
    // );

    if (!currentUser) {
        navigate("/");
    }

    return (
        <div className="main-container">
            <h2>Min side</h2>
            <div className="my-content">
                <div className="upper-cont">
                    <div className="register-booking">
                        <RegisterBooking />
                    </div>
                    <div className="right-side">
                        <BookingCalendar />
                    </div>
                </div>

                <div className="show-bookings">
                    <ShowBookings />
                </div>
            </div>
        </div>
    );
};

export default MyPage;
