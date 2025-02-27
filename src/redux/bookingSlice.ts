import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const todayDate = new Date().toISOString().split("T")[0];
interface Booking {
    _id?: string; // Tildeles av crudcrud
    userId: string;
    date: string;
    courtId: number;
    players: string;
    timeslot: string;
}

interface BookingState {
    bookings: Booking[];
    bookingData: Booking | null;
}

const initialState: BookingState = {
    bookings: JSON.parse(localStorage.getItem("bookings") || "[]"), // Henter bookinger fra localStorage hvis de eksisterer.
    bookingData: { date: todayDate, courtId: "", players: "2", timeslot: "" },
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
            localStorage.setItem("bookings", JSON.stringify(state.bookings));
        },
        removeBooking: (state, action: PayloadAction<string>) => {
            state.bookings = state.bookings.filter(
                (booking) => booking._id !== action.payload
            );
            localStorage.setItem("bookings", JSON.stringify(state.bookings));
        },
        setBookingData: (state, action: PayloadAction<Booking | null>) => {
            state.bookingData = action.payload;
        },
    },
});

export const {
    setBookings,
    addBooking,
    editBooking,
    removeBooking,
    setBookingData,
} = bookingSlice.actions;
export default bookingSlice.reducer;
