// import RegisterUser from "../components/RegisterUser";

import { Link } from "react-router-dom";
// import React from "react";
// import { RootState } from "../redux/store";

const Home = () => {
    return (
        <>
            <h2>Home sweet home</h2>
            <Link to="/mypage">Min Side</Link>
        </>
    );
};

export default Home;
