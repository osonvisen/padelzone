// Skal vise brukerens, eller alle brukeres, bookinger

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import apiDELETE from "../api/apiDELETE";
import { removeBooking } from "../redux/bookingSlice";

const ShowBookings: React.FC = () => {
    const bookings = useSelector((state: RootState) => state.bookings.bookings);
    const users = useSelector((state: RootState) => state.users.users);
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const dispatch = useDispatch();

    // Er bruker admin?
    const filteredBookings =
        currentUser?.role === "admin"
            ? bookings // admin ser alle bookinger
            : bookings.filter((booking) => booking.userId === currentUser?._id); // kun brukerens bookinger

    const getUserName = (userId: string) => {
        const user = users.find((u) => u._id === userId);
        return user ? user.name : "Finner ingen navn!";
    };

    const handleDeleteBtn = async (
        bookingId: string,
        type: "bookings" | "users"
    ) => {
        await apiDELETE(type, bookingId);
        dispatch(removeBooking(bookingId));
    };

    return (
        <div>
            <h2>
                {currentUser?.role === "admin"
                    ? "Alle bookinger"
                    : "Mine bookinger"}
            </h2>
            {filteredBookings.length > 0 ? (
                <ul>
                    {filteredBookings.map((booking, index) => (
                        <li key={index}>
                            Navn: {getUserName(booking.userId)} - Dato:{" "}
                            {booking.date} - Bane: {booking.courtId} - Tid:{" "}
                            {booking.timeslot} | <button>Rediger</button>
                            <button
                                onClick={() =>
                                    handleDeleteBtn(booking._id, "bookings")
                                }
                            >
                                Slett
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    {currentUser?.role === "admin"
                        ? "Ingen bookinger registrert"
                        : "Du har ingen aktive bookinger"}
                </p>
            )}
        </div>
    );
};
export default ShowBookings;
