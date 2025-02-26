import { useState } from "react";

const BookingCalendar = () => {
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );

    return <div>BookingCalendar</div>;
};

export default BookingCalendar;
