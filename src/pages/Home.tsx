import { useEffect, useState } from "react";
import RegisterBooking from "../components/RegisterBooking";
import Login from "../components/Login";
import ModalLogin from "../components/ModalLogin";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const navigate = useNavigate();

    // Vi må holde orden på bookingene at vi ikke dobbelbooker!
    const [bookingData, setBookingData] = useState({
        courtId: "",
        players: "2",
        date: "",
        timeslot: "",
    });
    // Holder rede på endriner i pre-bookingen
    const handleBookingChange = (name: string, value: string) => {
        setBookingData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // Sorterer bort opptatte tidspunkt og baner
    // Ledige baner:
    const availableCourts = () => {};

    useEffect(() => {
        if (currentUser) {
            console.log("ja vi har en innlogget bruker!");
            if (currentUser.role === "user") {
                navigate("/mypage");
            } else {
                navigate("/admin");
            }
        }
    }, [currentUser, navigate]);

    return (
        <div>
            <h1>Velkommen til PadelZone</h1>
            <RegisterBooking />
            {currentUser ? (
                <>
                    <h1>Nothing to see here!</h1>
                    {currentUser.name}
                </>
            ) : (
                <>
                    <button onClick={() => setIsLoginOpen(true)}>
                        Logg inn
                    </button>
                    <ModalLogin
                        isOpen={isLoginOpen}
                        onClose={() => setIsLoginOpen(false)}
                    >
                        <Login onClose={() => setIsLoginOpen(false)} />
                    </ModalLogin>
                </>
            )}
        </div>
    );
};

export default Home;
