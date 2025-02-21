import ShowBookings from "../components/ShowBookings";
import ShowUsers from "../components/ShowUsers";

const Admin = () => {
    return (
        <div>
            <h1>Administrator</h1>
            <ShowBookings />
            <ShowUsers />
        </div>
    );
};

export default Admin;
