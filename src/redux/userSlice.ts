import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
}

interface UserState {
    users: User[];
    currentUser: User | null;
}

const adminUser: User = {
    _id: "administrator1",
    name: "admin",
    email: "admin@padelzone.no",
    password: "admin",
    role: "admin",
};

// Henter brukere fra localStorage
const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
const storedCurrentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
);

// Sørger for at admin kun legges til én gang
if (!storedUsers.some((user: User) => user.name === adminUser.name)) {
    console.log("Legger til admin-bruker i localStorage...");
    storedUsers.push(adminUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
}

// Initial state med oppdatert users + admin
const initialState: UserState = {
    users: storedUsers,
    currentUser: storedCurrentUser !== "null" ? storedCurrentUser : null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(
                (user) => user._id !== action.payload
            );
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        editUser: (state, action: PayloadAction<User | null>) => {
            if (!action.payload) return;
            const index = state.users.findIndex(
                (user) => user._id === action.payload._id
            );
            if (index !== -1) {
                state.users[index] = action.payload;
                localStorage.setItem("users", JSON.stringify(state.users));
            }
        },
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
            if (action.payload) {
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(action.payload)
                );
            } else {
                localStorage.removeItem("currentUser");
            }
        },
        removeCurrentUser: (state) => {
            state.currentUser = null;
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
