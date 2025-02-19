import CreateBooking from "../components/CreateBooking";
import Login from "../components/Login";
import RegisterUser from "../components/RegisterUser";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
// import { setCurrentUser } from "../redux/userSlice";

const Home: React.FC = () => {
    const users = useSelector((state: RootState) => state.users.users) || [];
    const bookings =
        useSelector((state: RootState) => state.bookings.bookings) || [];
    const currentUser =
        useSelector((state: RootState) => state.users.currentUser) || [];

    console.log("Users:", users);
    console.log("Bookings:", bookings);
    console.log("currentUser:", currentUser);

    return (
        <div>
            <h1>Velkommen til PadelZone</h1>
            <CreateBooking />
        </div>
    );
};

export default Home;
