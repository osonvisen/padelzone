import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "../redux/userSlice";
// import { createUser } from "../services/apiService";
// import { useNavigate } from "react-router-dom";
// import { apiPOST } from "../api/apiPOST";
import InputForm from "./InputForm";

const RegisterUser: React.FC = () => {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
    });

    // const dispatch = useDispatch();
    // const navigate = useNavigate();

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
        console.log(formData.userName, formData.email);

        // try {
        //     const createdUser = await apiPOST("/users", newUser);
        //     dispatch(addUser(createdUser)); // Oppdaterer redux users[]
        //     localStorage.setItem("currentUser", JSON.stringify(createdUser)); // lagrer i localStorage
        //     navigate("/mypage");
        // } catch (error) {
        //     console.error("Feil ved registrering:", error);
        // }
    };

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
