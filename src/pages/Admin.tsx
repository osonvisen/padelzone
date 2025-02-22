import RegisterBooking from "../components/RegisterBooking";
import ShowBookings from "../components/ShowBookings";
import ShowUsers from "../components/ShowUsers";
import "./Styling/Styling.css";
import "./Styling/Admin.css";

const Admin = () => {
    return (
        <div className="admin-div">
            <h1>Administrator</h1>
            <div className="register-booking">
                <RegisterBooking />
            </div>

            <div className="admin-main">
                <div className="show-users">
                    <ShowUsers />
                </div>
                <div className="show-bookings">
                    <ShowBookings />
                </div>
            </div>
        </div>
    );
};

export default Admin;
