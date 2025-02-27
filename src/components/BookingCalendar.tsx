import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setBookingData } from "../redux/bookingSlice";
import "./styling/BookingCalendar.css";

const BookingCalendar = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const bookings = useSelector((state: RootState) => state.bookings.bookings);
    const bookingData = useSelector(
        (state: RootState) => state.bookings.bookingData
    );
    const courts = [1, 2, 3, 4, 5, 6, 7, 8]; // 8 baner
    const allTimeslots = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`); // 14 timeslots fra kl 8-21

    // Lager oversikt over opptatte timeslots
    const bookedTimeslots = bookings.filter(
        (slot) => slot.date === bookingData?.date
    );

    // Må ha en egen funksjon for å håndtere endring av dato
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setBookingData({ ...bookingData, date: event.target.value }));
    };

    // Funksjon for å sjekke ledige timeslots for hver bane
    const availableTimeslots = (courtId: number) => {
        const bookedSlots = bookedTimeslots
            .filter((slot) => slot.courtId === courtId)
            .map((slot) => slot.timeslot);

        return allTimeslots.filter((slot) => !bookedSlots.includes(slot));
    };

    return (
        <div className="calendar-container">
            <input
                className="date-menu"
                type="date"
                value={bookingData?.date}
                onChange={handleDateChange}
            />
            <div className="courts-container">
                {courts.map((court) => (
                    <div className="court" key={court}>
                        <h3>Bane {court}</h3>
                        <ul>
                            {availableTimeslots(court).map((time) => (
                                <li
                                    key={time}
                                    className="available-slot"
                                    onClick={() =>
                                        dispatch(
                                            setBookingData({
                                                ...bookingData,
                                                date: bookingData?.date,
                                                userId: currentUser?._id,
                                                courtId: court,
                                                timeslot: time,
                                            })
                                        )
                                    }
                                >
                                    {time}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingCalendar;
