import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import bookingReducer from "../redux/bookingSlice";

const store = configureStore({
    reducer: {
        users: userReducer,
        bookings: bookingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
