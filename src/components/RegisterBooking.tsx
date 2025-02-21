import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { apiPOST } from "../api/apiPOST";
import { addBooking } from "../redux/bookingSlice";

const RegisterBooking: React.FC = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((state: RootState) => state.bookings.bookings);
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );

    // ---------------------------
    // Vi må holde orden på bookingene at vi ikke dobbelbooker!
    const [bookingData, setBookingData] = useState({
        date: "",
        courtId: "",
        players: "2",
        timeslot: "",
    });
    // Holder rede på endriner i pre-bookingen
    const handleBookingChange = (name: string, value: string) => {
        setBookingData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // Sorterer bort opptatte baner
    // Ledige baner: --------------------------------------------
    const availableCourts = useMemo(() => {
        if (!bookingData.date)
            return Array.from({ length: 8 }, (_, i) => (i + 1).toString());

        return Array.from({ length: 8 }, (_, i) => (i + 1).toString()).filter(
            (courtId) => {
                const courtBookings = bookings.filter(
                    (booking) =>
                        booking.courtId.toString() == courtId &&
                        booking.date === bookingData.date
                );
                return courtBookings.length < 14; // Fjerner banen hvis alle tidspunktene er opptatte
            }
        );
    }, [bookings, bookingData.date]);

    // Sorterer bort opptatte tidspunkt for valgt dato og bane
    // Ledige tidspunkt: ------------------------------------------
    const availableTimeslots = useMemo(() => {
        if (!bookingData.courtId || !bookingData.date) return [];

        const bookedTimeslots = bookings
            .filter(
                (booking) =>
                    booking.courtId.toString() === bookingData.courtId &&
                    booking.date === bookingData.date
            )
            .map((booking) => booking.timeslot);

        return Array.from({ length: 14 }, (_, i) => 8 + i).filter(
            (time) => !bookedTimeslots.includes(time.toString())
        );
    }, [bookings, bookingData.courtId, bookingData.date]);

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookingData.courtId || !bookingData.date || !bookingData.timeslot)
            return alert("Alle feltene må fylles ut!");

        const newBooking = {
            userId: currentUser._id,
            ...bookingData,
        };
        try {
            const createdBooking = await apiPOST("/bookings", newBooking);
            dispatch(addBooking(createdBooking)); // Sender til api først, og får returnert _id før vi legger til i redux og localStorage
        } catch (error) {
            console.error("Feil ved booking: ", error);
        }
    };

    return (
        <div>
            <h2>Registrer Booking</h2>

            <label>Velg dato:</label>
            <input
                type="date"
                value={bookingData.date}
                onChange={(e) => handleBookingChange("date", e.target.value)}
            />

            {/* ------------------------------------------------------- */}

            <label>Velg antall spillere:</label>
            <select
                value={bookingData.players}
                onChange={(e) => handleBookingChange("players", e.target.value)}
            >
                {[2, 4].map((num) => (
                    <option key={num} value={num}>
                        {num} spillere
                    </option>
                ))}
            </select>

            {/* ------------------------------------------------------- */}

            <label>Velg bane:</label>
            <select
                value={bookingData.courtId}
                onChange={(e) => handleBookingChange("courtId", e.target.value)}
            >
                <option value="" disabled>
                    Velg bane
                </option>
                {availableCourts.map((courtId) => (
                    <option key={courtId} value={courtId}>
                        Bane {courtId}
                    </option>
                ))}
            </select>

            {/* ------------------------------------------------------- */}

            <label>Velg tidspunkt: </label>
            <select
                value={bookingData.timeslot}
                onChange={(e) =>
                    handleBookingChange("timeslot", e.target.value)
                }
            >
                <option value="" disabled>
                    Velg bane først!
                </option>
                {availableTimeslots.map((time) => (
                    <option key={time} value={time}>
                        {time}:00
                    </option>
                ))}
            </select>

            {/* ------------------------------------------------------- */}

            <p>
                {bookingData.date} - {bookingData.courtId} -{" "}
                {bookingData.timeslot}
            </p>
            {currentUser ? (
                <button
                    onClick={handleBooking}
                    disabled={
                        !bookingData.date ||
                        !bookingData.courtId ||
                        !bookingData.timeslot
                    }
                >
                    Book bane
                </button>
            ) : (
                <>
                    <p>Logg inn, eller registrer deg, for å booke bane!</p>
                </>
            )}
        </div>
    );
};

export default RegisterBooking;
