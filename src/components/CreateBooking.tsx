import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { apiPOST } from "../api/apiPOST";
import { addBooking } from "../redux/bookingSlice";

const CreateBooking: React.FC = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const [date, setDate] = useState("");
    const [players, setPlayers] = useState(2);
    const [timeslot, setTimeslot] = useState<number | null>(null);
    const [courtId, setCourtId] = useState<number | null>(null);

    const availableCourts = players === 2 ? [7, 8] : [1, 2, 3, 4, 5, 6]; // Filtrerer tilgjengelige baner basert på antall spillere

    if (!currentUser) {
        return <p>Vennligst logg inn for å registrere en booking.</p>;
    }

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
                {[2, 4, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>
                        {num} spillere
                    </option>
                ))}
            </select>

            <label>Velg timeslot:</label>
            <select
                value={timeslot || ""}
                onChange={(e) => setTimeslot(Number(e.target.value))}
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

            <button
                onClick={handleBooking}
                disabled={!date || !courtId || !timeslot || !players}
            >
                Book bane
            </button>
        </div>
    );
};

export default CreateBooking;
