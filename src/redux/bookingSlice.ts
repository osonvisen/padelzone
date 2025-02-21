import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Booking {
    _id?: string; // Tildeles av crudcrud
    userId: string;
    courtId: number;
    date: string;
    timeslot: string;
}

interface BookingState {
    bookings: Booking[];
}

const initialState: BookingState = {
    bookings: JSON.parse(localStorage.getItem("bookings") || "[]"), // Henter bookinger fra localStorage hvis de eksisterer.
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
        editBooking: (state, action: PayloadAction<Booking>) => {
            const index = state.bookings.findIndex(
                (booking) => booking._id === action.payload._id
            );
            if (index !== -1) {
                state.bookings[index] = action.payload;
            }
        },
        removeBooking: (state, action: PayloadAction<string>) => {
            state.bookings = state.bookings.filter(
                (booking) => booking._id !== action.payload
            );
            localStorage.setItem("bookings", JSON.stringify(state.bookings));
        },
    },
});

export const { setBookings, addBooking, editBooking, removeBooking } =
    bookingSlice.actions;
export default bookingSlice.reducer;
