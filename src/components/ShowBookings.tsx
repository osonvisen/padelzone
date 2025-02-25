// Skal vise brukerens, eller alle brukeres, bookinger

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import apiDELETE from "../api/apiDELETE";
import { removeBooking } from "../redux/bookingSlice";
import ModalEdit from "./ModalEdit";
import { useState } from "react";

const ShowBookings: React.FC = () => {
    const bookings = useSelector((state: RootState) => state.bookings.bookings);
    const users = useSelector((state: RootState) => state.users.users);
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const [editingBooking, setEditingBooking] = useState(null);
    const [filterDate, setFilterDate] = useState("");
    const [filterUser, setFilterUser] = useState("");

    const dispatch = useDispatch();

    // Filtrering på dato eller brukernavn
    const filteredBookings = bookings.filter((booking) => {
        const filterOnDate = filterDate ? booking.date === filterDate : true;
        const filterOnUser = filterUser
            ? users
                  .find((user) => user._id === booking.userId)
                  ?.name.toLowerCase()
                  .includes(filterUser.toLowerCase())
            : true;
        return (
            (currentUser?.role === "admin" ||
                booking.userId === currentUser?._id) &&
            filterOnDate &&
            filterOnUser
        );
    });

    const getUserName = (userId: string) => {
        const user = users.find((u) => u._id === userId);
        return user ? user.name : "Finner ingen navn!";
    };

    const handleDelete = async (
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
            <div>
                <label>Filtrer på dato: </label>
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />

                {/* Admin kan også filtrere på navn */}
                {currentUser?.role === "admin" && (
                    <>
                        <label>Filtrer på navn: </label>
                        <input
                            type="text"
                            placeholder="Søk etter navn.."
                            value={filterUser}
                            onChange={(e) => setFilterUser(e.target.value)}
                        />
                    </>
                )}
            </div>
            {filteredBookings.length > 0 ? (
                <ul>
                    {filteredBookings.map((booking, index) => (
                        <div key={index} className="show-spacing">
                            Navn: {getUserName(booking.userId)} - Dato:{" "}
                            {booking.date} - Bane: {booking.courtId} - Tid:{" "}
                            {booking.timeslot}:00 |{" "}
                            <button onClick={() => setEditingBooking(booking)}>
                                Rediger
                            </button>
                            <button
                                onClick={() =>
                                    handleDelete(booking._id, "bookings")
                                }
                            >
                                Slett
                            </button>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>
                    {currentUser?.role === "admin"
                        ? "Ingen bookinger registrert"
                        : "Du har ingen aktive bookinger"}
                </p>
            )}
            {editingBooking && (
                <ModalEdit
                    item={editingBooking}
                    type="bookings"
                    onClose={() => setEditingBooking(null)}
                />
            )}
        </div>
    );
};
export default ShowBookings;
