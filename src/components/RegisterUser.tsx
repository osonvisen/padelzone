import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
// import { createUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { apiPOST } from "../api/apiPOST";

const RegisterUser: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) return alert("Vennligst fyll ut alle feltene");

        const newUser = { name, email, role: "user" };

        try {
            const createdUser = await apiPOST("/users", newUser);
            dispatch(addUser(createdUser)); // Oppdaterer redux users[]
            localStorage.setItem("currentUser", JSON.stringify(createdUser)); // lagrer i localStorage
            navigate("/mypage");
        } catch (error) {
            console.error("Feil ved registrering:", error);
        }
    };

    return (
        <form onSubmit={handleRegister} className="register-form">
            <input
                type="text"
                placeholder="Navn"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="E-post"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Registrer</button>
        </form>
    );
};

export default RegisterUser;
