import { useState } from "react";
import CreateBooking from "../components/CreateBooking";
import Login from "../components/Login";
import Modal from "../components/Modal";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <div>
            <h1>Velkommen til PadelZone</h1>
            <CreateBooking />
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
                    <Modal
                        isOpen={isLoginOpen}
                        onClose={() => setIsLoginOpen(false)}
                    >
                        <Login onClose={() => setIsLoginOpen(false)} />
                    </Modal>
                </>
            )}
        </div>
    );
};

export default Home;
