import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import RegisterBooking from "../components/RegisterBooking";
// import CreateBooking from "../components/CreateBooking";

const MyPage = () => {
    let currentBookings = [];
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const bookings = useSelector((state: RootState) => state.bookings.bookings);

    const currentUserBookings = () => {
        return bookings.filter(
            (booking) => booking.userId === currentUser?._id
        );
    };
    currentBookings = currentUserBookings();

    console.log("Brukers bookinger: ", currentBookings);

    return (
        <>
            <div className="welcome">
                <h2>Min side</h2>
            </div>
            <h2>Dine bookinger: </h2>
            {!currentBookings ? (
                <p>Du har foreløpig ingen bookinger!</p>
            ) : (
                <>
                    {currentBookings.map((booking, index) => (
                        <li key={booking._id}>
                            Booking {index + 1}: Dato: {booking.date} - Bane{" "}
                            {booking.courtId} - tid: {booking.timeslot}
                        </li>
                    ))}
                </>
            )}

            <p></p>
            <RegisterBooking />
        </>
    );
};

export default MyPage;
