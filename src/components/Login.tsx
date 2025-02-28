import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCurrentUser } from "../redux/userSlice";
import InputForm from "./InputForm";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
    const users = useSelector((state: RootState) => state.users.users);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });
    const navigate = useNavigate();

    const fields = [
        {
            name: "name",
            placeholder: "Ditt brukernavn",
            type: "text",
            label: "Brukernavn: ",
            value: formData.name,
        },
        {
            name: "password",
            placeholder: "Ditt passord",
            type: "password",
            label: "Passord: ",
            value: formData.password,
        },
    ];

    const handleLogin = () => {
        const existingUser = users.find(
            (user) =>
                user.name === formData.name &&
                user.password === formData.password
        );

        if (existingUser) {
            console.log("Logger inn bruker:", existingUser.name);
            dispatch(setCurrentUser(existingUser));

            setTimeout(() => {
                // Forsinkelse for å unngå race condition
                if (existingUser.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/mypage");
                }
                onClose();
            }, 100);
        } else {
            alert("Brukernavn eller passord er feil!");
        }
    };

    const handleInput = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <h2>Logg inn</h2>
            <InputForm
                fields={fields}
                onChange={handleInput}
                onSubmit={handleLogin}
                buttonLabel="Login"
            />
            <button onClick={onClose}>✖ Lukk</button>
        </div>
    );
};

export default Login;
