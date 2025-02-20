import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import CreateBooking from "../components/CreateBooking";

const MyPage = () => {
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    return (
        <>
            <div className="welcome">Velkommen - Min side!</div>
            {currentUser ? (
                <p>Bruker: {currentUser.name}</p>
            ) : (
                <p>Ingen er logget inn</p>
            )}
        </>
    );
};

export default MyPage;
