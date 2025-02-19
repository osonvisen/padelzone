import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id?: string;
    name: string;
    email: string;
    role: "user" | "admin";
}

interface UserState {
    users: User[];
    currentUser: User | null;
}

const initialState: UserState = {
    users: JSON.parse(localStorage.getItem("users") || "[]"), // Henter brukere fra localStorage
    currentUser: JSON.parse(localStorage.getItem("currentUser") || "[]"),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            localStorage.setItem("users", JSON.stringify(state.users)); // Lagre i localStorage
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
            localStorage.setItem("users", JSON.stringify(state.users)); // Oppdater localStorage
        },
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        },
    },
});

export const { setUsers, addUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
