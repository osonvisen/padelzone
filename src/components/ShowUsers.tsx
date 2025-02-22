import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import ModalEdit from "./ModalEdit";

const ShowUsers = () => {
    const users = useSelector((state: RootState) => state.users.users);
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const [editingUser, setEditingUser] = useState(null);
    const [serchUser, setSearchUser] = useState("");

    if (!currentUser || currentUser.role !== "admin") return null;

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(serchUser.toLowerCase()) ||
            user.email.toLowerCase().includes(serchUser.toLowerCase())
    );

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
                {filteredUsers.map((user) => (
                    <li key={user._id}>
                        Navn: {user.name} | E-post: {user.email} | Rolle:{" "}
                        {user.role}
                        <button onClick={() => setEditingUser(user)}>
                            Rediger
                        </button>
                        <button>Slett</button>
                    </li>
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
