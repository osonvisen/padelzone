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

    if (!currentUser || currentUser.role !== "admin") return null;

    return (
        <div>
            <h2>Alle brukere</h2>
            <ul>
                {users.map((user) => (
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
