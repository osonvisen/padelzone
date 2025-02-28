import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import apiPOST from "../api/apiPOST";
import { addBooking, setBookingData } from "../redux/bookingSlice";
import "./styling/Register.css";

const RegisterBooking = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((state: RootState) => state.bookings.bookings);
    const users = useSelector((state: RootState) => state.users.users);
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const bookingData = useSelector(
        (state: RootState) => state.bookings.bookingData
    );

    const availableCourts = !bookingData.date
        ? [...Array(8)].map((_, i) => (i + 1).toString())
        : [...Array(8)]
              .map((_, i) => (i + 1).toString())
              .filter(
                  (courtId) =>
                      bookings.filter(
                          (booking) =>
                              booking.courtId === courtId &&
                              booking.date === bookingData.date
                      ).length < 14
              );

    const bookedTimeslots = bookings
        .filter(
            (booking) =>
                booking.courtId === bookingData.courtId &&
                booking.date === bookingData.date
        )
        .map((booking) => booking.timeslot);

    const availableTimeslots =
        !bookingData.courtId || !bookingData.date
            ? []
            : [...Array(14)]
                  .map((_, i) => (8 + i).toString())
                  .filter((time) => !bookedTimeslots.includes(time));

    // Sorterer bort opptatte tidspunkt for valgt dato og bane
    // Ledige tidspunkt: ------------------------------------------
    // const availableTimeslots = useMemo(() => {
    //     if (!bookingData.courtId || !bookingData.date) return [];

    //     const bookedTimeslots = bookings
    //         .filter(
    //             (booking) =>
    //                 booking.courtId === bookingData.courtId &&
    //                 booking.date === bookingData.date
    //         )
    //         .map((booking) => booking.timeslot);

    //     return Array.from({ length: 14 }, (_, i) => 8 + i).filter(
    //         (time) => !bookedTimeslots.includes(time.toString())
    //     );
    // }, [bookings, bookingData.courtId, bookingData.date]);

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookingData.courtId || !bookingData.date || !bookingData.timeslot)
            return alert("Alle feltene må fylles ut!");

        const newBooking = {
            ...bookingData,
        };
        try {
            const createdBooking = await apiPOST("/bookings", newBooking);
            dispatch(addBooking(createdBooking)); // Sender til api først, og får returnert _id før vi legger til i redux og localStorage
            dispatch(
                setBookingData({
                    userId: currentUser?._id,
                    date: bookingData?.date,
                    players: bookingData?.players,
                    courtId: bookingData?.courtId,
                    timeslot: "",
                })
            );
        } catch (error) {
            console.error("Feil ved booking: ", error);
        }
    };

    return (
        <div>
            <h2>Registrer ny booking</h2>
            {/* Admin kan velge bruker */}
            {currentUser?.role === "admin" && (
                <>
                    <label>Velg bruker: </label>
                    <select
                        value={bookingData.userId}
                        onChange={(e) =>
                            dispatch(
                                setBookingData({
                                    ...bookingData,
                                    userId: e.target.value,
                                })
                            )
                        }
                        className="show-spacing"
                    >
                        <option value="" disabled>
                            Velg bruker
                        </option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <br />
                </>
            )}

            <label>Velg dato:</label>
            <input
                type="date"
                value={bookingData.date}
                onChange={(e) =>
                    dispatch(setBookingData({ date: e.target.value }))
                }
                className="show-spacing"
            />
            <br />

            {/* ------------------------------------------------------- */}

            <label>Velg antall spillere:</label>
            <select
                value={bookingData.players}
                onChange={(e) =>
                    dispatch(setBookingData({ players: e.target.value }))
                }
                className="show-spacing"
            >
                {[2, 4].map((num) => (
                    <option key={num} value={num}>
                        {num} spillere
                    </option>
                ))}
            </select>
            <br />

            {/* ------------------------------------------------------- */}

            <label htmlFor="courtSelect" className="register-label">
                Velg bane:
            </label>
            <select
                value={bookingData.courtId}
                onChange={(e) =>
                    dispatch(
                        setBookingData({
                            ...bookingData,
                            courtId: e.target.value.toString(),
                        })
                    )
                }
                className="show-spacing"
                id="courtSelect"
            >
                <option value="" disabled>
                    nr
                </option>
                {availableCourts.map((courtId) => (
                    <option key={courtId} value={courtId}>
                        Bane {courtId}
                    </option>
                ))}
            </select>
            <br />

            {/* ------------------------------------------------------- */}

            <label>Velg tidspunkt: </label>
            <select
                value={bookingData.timeslot}
                onChange={(e) =>
                    dispatch(
                        setBookingData({
                            ...bookingData,
                            timeslot: e.target.value.toString(),
                        })
                    )
                }
                className="show-spacing"
            >
                <option value="" disabled>
                    Tidspunkt
                </option>
                {availableTimeslots.map((time) => (
                    <option key={time} value={time}>
                        {time}:00
                    </option>
                ))}
            </select>
            <br />

            {/* ------------------------------------------------------- */}

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
