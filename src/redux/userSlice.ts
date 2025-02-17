import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id?: string;
    name: string;
    email: string;
    role: "admin" | "user";
}

interface UserState {
    users: User[];
}

//

const initialState: UserState = {
    users: JSON.parse(localStorage.getItem("users") || "[]"),
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
    },
});

export const { setUsers, addUser } = userSlice.actions;
export default userSlice.reducer;
