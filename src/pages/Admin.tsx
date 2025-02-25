import RegisterBooking from "../components/RegisterBooking";
import ShowBookings from "../components/ShowBookings";
import ShowUsers from "../components/ShowUsers";
import "./Styling/Styling.css";
import "./Styling/Admin.css";
import RegisterUser from "../components/RegisterUser";

const Admin = () => {
    return (
        <div className="admin-div">
            <h1>Administrator</h1>
            <div className="admin-register">
                <div className="register-booking">
                    <RegisterBooking />
                </div>
                <div className="register-user">
                    {/* <h1>Registrere bruker</h1> */}
                    <RegisterUser />
                </div>
            </div>

            <div className="admin-show">
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
