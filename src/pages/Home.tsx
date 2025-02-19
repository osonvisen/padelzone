import CreateBooking from "../components/CreateBooking";
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

            {/* Viser alle brukere fra db */}
            <h2>Registrerte brukere:</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            {user.name} ({user.email}) - {user.role}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Ingen registrerte brukere.</p>
            )}

            {/* Viser alle registrerte bookinger i db */}
            <h2>Bookinger:</h2>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id}>
                            Bane {booking.courtId}, {booking.date}, kl{" "}
                            {booking.timeslot.join(", ")}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Ingen bookinger funnet.</p>
            )}
            <RegisterUser />
            <p>Test bookingen</p>
            <CreateBooking />
            <p>
                Kundenr: {currentUser._id} - Navn: {currentUser.name}
            </p>
        </div>
    );
};

export default Home;
