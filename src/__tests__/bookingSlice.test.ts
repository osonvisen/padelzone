import { configureStore } from "@reduxjs/toolkit";
import bookingReducer, {
    setBookings,
    addBooking,
    removeBooking,
} from "../redux/bookingSlice";

describe("BookingSlice", () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({ reducer: { bookings: bookingReducer } });
    });
    // Testene:
    // setBooking
    test("setter bookinger (henter fra API)", () => {
        const bookings = [
            {
                id: "1",
                userId: "123",
                courtId: "3",
                date: "2024-03-15",
                timeslot: "10:00",
            },
            {
                id: "2",
                userId: "456",
                courtId: "4",
                date: "2024-03-16",
                timeslot: "12:00",
            },
        ];

        store.dispatch(setBookings(bookings));

        const state = store.getState().bookings;
        expect(state.bookings).toHaveLength(2);
    });

    // addBooking
    test("legg til en booking", () => {
        const newBooking = {
            id: "1",
            userId: "123",
            courtId: "3",
            date: "2025-03-15",
            timeslot: "10",
        };

        store.dispatch(addBooking(newBooking));

        const state = store.getState().bookings;
        expect(state.bookings).toHaveLength(1);
        expect(state.bookings[0]).toEqual(newBooking);
    });

    removeBooking;
    test("sletter en booking", () => {
        const newBooking = {
            _id: "1",
            userId: "123",
            courtId: "3",
            date: "2024-03-15",
            timeslot: "10:00",
        };
        store.dispatch(addBooking(newBooking));

        store.dispatch(removeBooking("1"));

        const state = store.getState().bookings;
        expect(state.bookings).toHaveLength(0);
    });
});
