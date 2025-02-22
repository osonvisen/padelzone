import RegisterBooking from "../components/RegisterBooking";
import ShowBookings from "../components/ShowBookings";
import ShowUsers from "../components/ShowUsers";
import "./Styling/Admin.css";

const Admin = () => {
    return (
        <div className="admin-div">
            <h1>Administrator</h1>
            <div className="admin-reg">
                <RegisterBooking />
            </div>

            <div className="admin-main">
                <div className="admin-users">
                    <ShowUsers />
                </div>
                <div className="admin-bookings">
                    <ShowBookings />
                </div>
            </div>
        </div>
    );
};

export default Admin;
