import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Booking {
    id?: string;
    userId: string;
    courtId: number;
    date: string;
    timeslot: number[];
}

interface BookingState {
    bookings: Booking[];
}

const initialState: BookingState = {
    bookings: JSON.parse(localStorage.getItem("bookings") || "[]"), // Henter bookinger fra localStorage
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBookings: (state, action: PayloadAction<Booking[]>) => {
            state.bookings = action.payload;
            localStorage.setItem("bookings", JSON.stringify(state.bookings));
        },
        addBooking: (state, action: PayloadAction<Booking>) => {
            state.bookings.push(action.payload);
            localStorage.setItem("bookings", JSON.stringify(state.bookings));
        },
    },
});

export const { setBookings, addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
