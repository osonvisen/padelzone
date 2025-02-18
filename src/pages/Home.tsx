// import RegisterUser from "../components/RegisterUser";

import { Link } from "react-router-dom";
// import React from "react";
// import { RootState } from "../redux/store";
import { apiPOST } from "../api/apiPOST";

const Home = () => {
    const name = "Ola";
    const email = "Ola@Giæver.no";
    const role = "user";

    const newUser = { name, email, role };
    apiPOST("/users", newUser);
    return (
        <>
            <h2>Home sweet home</h2>
            <Link to="/mypage">Min Side</Link>
        </>
    );
};

export default Home;
