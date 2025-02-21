import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { apiPOST } from "../api/apiPOST";
import InputForm from "./InputForm";
import { RootState } from "../redux/store";

const RegisterUser: React.FC = () => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
    });
    const users = useSelector((state: RootState) => state.users.users);
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Til inputfeltene
    const fields = [
        {
            name: "userName",
            placeholder: "Fullt navn",
            type: "text",
            label: "Navn: ",
        },
        {
            name: "email",
            placeholder: "Din e-post",
            type: "email",
            label: "E-post: ",
        },
    ];

    const handleRegister = async () => {
        if (!formData.userName || !formData.email)
            return alert("Fyll ut alle feltene!");

        const existingUser = users.some(
            (user) =>
                user.email.toLocaleLowerCase() ===
                formData.email.toLocaleLowerCase()
        );
        if (existingUser)
            return alert("Det ser ut til at denne brukeren allerede finnes!");

        const createUser = {
            name: formData.userName,
            email: formData.email,
            role: "user",
        };

        try {
            const newUser = await apiPOST("/users", createUser);
            dispatch(addUser(newUser)); // Oppdaterer redux users
            localStorage.setItem("currentUser", JSON.stringify(newUser)); // lagrer i localStorage
            console.log("Ny bruker bør være opprettet nå!");
        } catch (error) {
            console.error("Feil ved registrering:", error);
        }
    };
    useEffect(() => {
        if (currentUser) {
            navigate("/mypage");
        }
    }, [currentUser, navigate]);

    const handleInput = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <h2>Fyll inn ditt navn og din e-postadresse</h2>

            <InputForm
                fields={fields}
                onChange={handleInput}
                onSubmit={handleRegister}
                buttonLabel="Registrer"
            />

            <p>{formData.userName}</p>
            <p>{formData.email}</p>
        </>
    );
};

export default RegisterUser;
