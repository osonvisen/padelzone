import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import RegisterBooking from "../components/RegisterBooking";
import { useNavigate } from "react-router-dom";
import ShowBookings from "../components/ShowBookings";

const MyPage = () => {
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const navigate = useNavigate();

    if (!currentUser) {
        navigate("/");
    }

    return (
        <>
            <div className="welcome">
                <h2>Min side</h2>
            </div>
            <RegisterBooking />
            <p></p>
            <ShowBookings />
        </>
    );
};

export default MyPage;
