import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id?: string;
    name: string;
    email: string;
    role: "user" | "admin";
}

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: JSON.parse(localStorage.getItem("users") || "[]"), // Henter brukere fra localStorage
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
    },
});

export const { setUsers, addUser } = userSlice.actions;
export default userSlice.reducer;
