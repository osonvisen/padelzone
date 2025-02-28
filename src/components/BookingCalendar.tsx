import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setBookingData } from "../redux/bookingSlice";
import "./styling/BookingCalendar.css";

const BookingCalendar: React.FC = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const bookings = useSelector((state: RootState) => state.bookings.bookings);
    const bookingData = useSelector(
        (state: RootState) => state.bookings.bookingData
    );
    // if (currentUser) {
    //     dispatch(setBookingData({ ...bookingData, userId: currentUser._id }));
    // }
    const courts = [1, 2, 3, 4, 5, 6, 7, 8]; // 8 baner
    const allTimeslots = Array.from({ length: 14 }, (_, i) => `${8 + i}`); // 14 timeslots fra kl 8-21

    // Lager oversikt over opptatte timeslots
    const bookedTimeslots = bookings.filter(
        (booking) => booking.date === bookingData?.date
    );

    const isSlotBooked = (courtId: number, slot: string) =>
        bookedTimeslots.some(
            (b) => b.courtId === courtId && b.timeslot === slot
        );

    return (
        <div className="calendar-container">
            <input
                className="date-menu"
                type="date"
                value={bookingData?.date}
                onChange={(e) =>
                    dispatch(
                        setBookingData({
                            ...bookingData,
                            date: e.target.value,
                        })
                    )
                }
            />
            <div className="courts-container">
                {courts.map((court) => (
                    <div className="court" key={court}>
                        <h3>Bane {court}</h3>
                        <ul>
                            {allTimeslots.map(
                                (slot) => {
                                    const booked = isSlotBooked(court, slot);
                                    return (
                                        <li
                                            key={slot}
                                            className={`available-slot ${
                                                booked ? "booked" : "available"
                                            }`}
                                            onClick={() => {
                                                if (!booked) {
                                                    dispatch(
                                                        setBookingData({
                                                            ...bookingData,
                                                            userId: currentUser?._id,
                                                            courtId: court,
                                                            timeslot: slot,
                                                        })
                                                    );
                                                }
                                            }}
                                        >
                                            {slot}:00
                                        </li>
                                    );
                                }
                                // (
                                //     <li
                                //         key={time}
                                //         className="available-slot"
                                //         onClick={() =>
                                //             dispatch(
                                //                 setBookingData({
                                //                     ...bookingData,
                                //                     userId: currentUser?._id,
                                //                     courtId: court,
                                //                     timeslot: time,
                                //                 })
                                //             )
                                //         }
                                //     >
                                //         {time}
                                //     </li>
                                //     )
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingCalendar;
