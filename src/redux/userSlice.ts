import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    _id?: string;
    name: string;
    email: string;
    role: "user" | "admin";
}

interface UserState {
    users: User[];
    currentUser: User | null;
}

const adminUser: User = {
    _id: "administrator",
    name: "admin",
    email: "admin@padelzone.no",
    role: "admin",
};

const initialState: UserState = {
    users: JSON.parse(localStorage.getItem("users") || "[]"), // Henter brukere fra localStorage
    currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
};

if (!initialState.users.some((user) => user.email === adminUser.email)) {
    initialState.users.push(adminUser);
    localStorage.setItem("users", JSON.stringify(initialState.users));
}

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
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(
                (user) => user._id !== action.payload
            );
        },
        editUser: (state, action: PayloadAction<User | null>) => {
            const index = state.users.findIndex(
                (user) => user._id === action.payload?._id
            );
            if (index !== -1) {
                state.users[index] = action.payload;
            }
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        },
        removeCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
            localStorage.removeItem("currentUser");
        },
    },
});

export const {
    setUsers,
    addUser,
    setCurrentUser,
    editUser,
    removeCurrentUser,
    removeUser,
} = userSlice.actions;
export default userSlice.reducer;
