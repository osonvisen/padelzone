import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const BookingCalendar = () => {
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );
    // Vi skal velge dato og få opp oversikten over ledige tidspunkter pr bane
    // Vi trenger alle bookingene, banene og tidspunktene:
    const bookings = useSelector((state: RootState) => state.bookings.bookings);
    const courts = [1, 2, 3, 4, 5, 6, 7, 8]; // 8 baner
    const allTimeslots = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`); // 14 timeslots fra kl 8-21

    // Lager oversikt over opptatte timeslots
    const bookedTimeslots = bookings.filter(
        (time) => time.date === selectedDate
    );

    // Funksjon for å sjekke ledige timeslots for hver bane
    const availableTimeslots = (courtId: number) => {
        const bookedTimes = bookedTimeslots
            .filter((time) => time.courtId)
            .map((time) => time.timeslot);

        return allTimeslots.filter((time) => !bookedTimes.includes(time));
    };

    return <div>BookingCalendar</div>;
};

export default BookingCalendar;
