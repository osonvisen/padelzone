import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCurrentUser } from "../redux/userSlice";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const users = useSelector((state: RootState) => state.users.users);
    const dispatch = useDispatch();

    const handleLogin = () => {
        const existingUser = users.find((user) => user.email === email); // Finner bruker basert på e-post
        if (existingUser) {
            dispatch(setCurrentUser(existingUser));
            console.log("Logget inn som ", existingUser.name);
        } else {
            alert("Fant ingen bruker!");
        }
    };
    return (
        <div>
            <h2>Logg inn</h2>
            <input
                type="email"
                placeholder="Din epostadresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleLogin}>Logg inn</button>
        </div>
    );
};

export default Login;
