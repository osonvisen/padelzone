import RegisterBooking from "../components/RegisterBooking";
import ShowBookings from "../components/ShowBookings";
import ShowUsers from "../components/ShowUsers";
import "./Styling/Styling.css";
import "./Styling/Admin.css";
import RegisterUser from "../components/RegisterUser";

const Admin = () => {
    return (
        <>
            <h1>Administrator</h1>
            <div className="admin-div">
                <div className="admin-register">
                    <div className="register-admin">
                        <RegisterBooking />
                    </div>
                    <div className="admin-bookings">
                        <ShowBookings />
                    </div>
                </div>

                <div className="admin-show">
                    <div className="admin-users">
                        <RegisterUser />
                    </div>
                    <div className="show-admin">
                        <ShowUsers />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
