// Skal vise brukerens, eller alle brukeres, bookinger

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ShowBookingsProps {
    isAdmin?: Boolean;
}

const ShowBookings: React.FC<ShowBookingsProps> = ({ isAdmin = false }) => {
    const bookings = useSelector((state: RootState) => state.bookings.bookings);
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );

    // Er bruker admin?
    const filteredBookings = isAdmin
        ? bookings // admin ser alle bookinger
        : bookings.filter((booking) => booking.userId === currentUser?._id); // kun brukerens bookinger

    return (
        <div>
            <h2>{isAdmin ? "Alle bookinger" : "Mine bookinger"}</h2>
            {filteredBookings.length > 0 ? (
                <ul>
                    {filteredBookings.map((booking, index) => (
                        <li key={index}>
                            Dato: {booking.date} - Bane: {booking.courtId} -
                            Tid: {booking.timeslot}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    {isAdmin
                        ? "Ingen bookinger registrert"
                        : "Du har ingen aktive bookinger"}
                </p>
            )}
        </div>
    );
};
export default ShowBookings;
