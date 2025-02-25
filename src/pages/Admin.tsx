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
                    <div className="register-booking">
                        <RegisterBooking />
                    </div>
                    <div className="show-bookings">
                        {/* <h1>Registrere bruker</h1> */}

                        <ShowBookings />
                    </div>
                </div>

                <div className="admin-show">
                    <div className="register-users">
                        <RegisterUser />
                    </div>
                    <div className="show-users">
                        <ShowUsers />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
