import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import ModalEdit from "./ModalEdit";
import { removeUser, User } from "../redux/userSlice";
import apiDELETE from "../api/apiDELETE";

const ShowUsers = () => {
    const users = useSelector((state: RootState) => state.users.users);
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const [editingUser, setEditingUser] = useState(null);
    const [serchUser, setSearchUser] = useState("");
    const dispatch = useDispatch();

    if (!currentUser || currentUser.role !== "admin") return null;

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(serchUser.toLowerCase()) ||
            user.email.toLowerCase().includes(serchUser.toLowerCase())
    );

    const handleDeleteUser = async (
        userId: string,
        type: "bookings" | "users"
    ) => {
        console.log("BrukerId til sletting: ", userId);
        await apiDELETE(type, userId);
        dispatch(removeUser(userId));
    };

    return (
        <div>
            <h2>Alle brukere</h2>
            {/* Søkefelt */}
            <div>
                <label>Søk etter bruker: </label>
                <input
                    type="text"
                    placeholder="Skriv navn eller e-post.."
                    value={serchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                />
            </div>
            <ul>
                {filteredUsers.map((user: User, index) => (
                    <div key={user._id || index} className="show-spacing">
                        Navn: {user.name} | E-post: {user.email} | Rolle:{" "}
                        {user.role} | Passord: {user.password}
                        <button onClick={() => setEditingUser(user)}>
                            Rediger
                        </button>
                        <button
                            onClick={() => handleDeleteUser(user._id, "users")}
                        >
                            Slett
                        </button>
                    </div>
                ))}
            </ul>
            {editingUser && (
                <ModalEdit
                    item={editingUser}
                    type="users"
                    onClose={() => setEditingUser(null)}
                />
            )}
        </div>
    );
};

export default ShowUsers;
