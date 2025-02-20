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
    const [date, setDate] = useState("");
    const [players, setPlayers] = useState(2);
    const [timeslot, setTimeslot] = useState("");
    const [courtId, setCourtId] = useState<number | null>(null);

    // const availableCourts = players === 2 ? [7, 8] : [1, 2, 3, 4, 5, 6]; // Filtrerer tilgjengelige baner basert på antall spillere
    // ---------------------------
    // Vi må holde orden på bookingene at vi ikke dobbelbooker!
    const [bookingData, setBookingData] = useState({
        courtId: "",
        players: "2",
        date: "",
        timeslot: "",
    });
    // Holder rede på endriner i pre-bookingen
    const handleBookingChange = (name: string, value: string) => {
        setBookingData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // Sorterer bort opptatte tidspunkt og baner
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

    // Sorterer på tidspunkt for valgt dato og bane
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

        return Array.from({ length: 14 }, (_, i) => `${8 + i}`).filter(
            (time) => !bookedTimeslots.includes(time)
        );
    }, [bookings, bookingData.courtId, bookingData.date]);

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!courtId || !date || !timeslot || !players)
            return alert("Alle feltene må fylles ut!");

        const newBooking = {
            userId: currentUser._id,
            courtId,
            players,
            date,
            timeslot: [timeslot],
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <label>Velg antall spillere:</label>
            <select
                value={players}
                onChange={(e) => setPlayers(Number(e.target.value))}
            >
                {[2, 4].map((num) => (
                    <option key={num} value={num}>
                        {num} spillere
                    </option>
                ))}
            </select>

            <label>Velg timeslot:</label>
            <select
                value={timeslot || ""}
                onChange={(e) => setTimeslot(String(e.target.value))}
            >
                <option value="" disabled>
                    Velg tidspunkt
                </option>
                {Array.from({ length: 14 }, (_, i) => 8 + i).map((hour) => (
                    <option key={hour} value={hour}>
                        {hour}:00 - {hour + 1}:00
                    </option>
                ))}
            </select>

            <label>Velg bane:</label>
            <select
                value={courtId || ""}
                onChange={(e) => setCourtId(Number(e.target.value))}
            >
                <option value="" disabled>
                    Velg bane
                </option>
                {availableCourts.map((court) => (
                    <option key={court} value={court}>
                        Bane {court}
                    </option>
                ))}
            </select>

            {currentUser ? (
                <button
                    onClick={handleBooking}
                    disabled={!date || !courtId || !timeslot || !players}
                >
                    Book bane
                </button>
            ) : (
                <>
                    <button>Sjekk tilgjengelighet for valgt tidspunkt</button>
                    <p>Logg inn for å booke bane!</p>
                </>
            )}
        </div>
    );
};

export default RegisterBooking;
