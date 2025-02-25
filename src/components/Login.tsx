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
        email: "",
    });
    const navigate = useNavigate();

    const fields = [
        {
            name: "email",
            placeholder: "Din epostadresse",
            type: "email",
            label: "E-post: ",
            value: formData.email,
        },
    ];

    const handleLogin = () => {
        const existingUser = users.find(
            (user) => user.email === formData.email
        ); // Finner bruker basert på e-post
        if (existingUser) {
            dispatch(setCurrentUser(existingUser));
            if (existingUser.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/mypage");
            }
        } else {
            alert("Fant ingen bruker!");
        }
        onClose(); // Lukker Modalen etter innloggingen er vellykket
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
