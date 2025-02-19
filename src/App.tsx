import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsers } from "./redux/userSlice";
import { setBookings } from "./redux/bookingSlice";
import { apiGET } from "./api/apiGET";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            console.log("Sjekker localStorage...");

            try {
                // Hente brukere fra localStorage eller API
                const storedUsers = localStorage.getItem("users");
                if (storedUsers) {
                    console.log("Laster brukere fra localStorage");
                    dispatch(setUsers(JSON.parse(storedUsers)));
                } else {
                    console.log("Henter brukere fra API...");
                    const usersFromAPI = await apiGET("users");
                    if (usersFromAPI.length > 0) {
                        dispatch(setUsers(usersFromAPI));
                        localStorage.setItem(
                            "users",
                            JSON.stringify(usersFromAPI)
                        );
                    }
                }

                // Hente bookinger fra localStorage eller API
                const storedBookings = localStorage.getItem("bookings");
                if (storedBookings) {
                    console.log("Laster bookinger fra localStorage");
                    dispatch(setBookings(JSON.parse(storedBookings)));
                } else {
                    console.log("Henter bookinger fra API...");
                    const bookingsFromAPI = await apiGET("bookings");
                    if (bookingsFromAPI.length > 0) {
                        dispatch(setBookings(bookingsFromAPI));
                        localStorage.setItem(
                            "bookings",
                            JSON.stringify(bookingsFromAPI)
                        );
                    }
                }
            } catch (error) {
                console.error("Feil ved lasting av data:", error);
            }
        };

        loadData(); // Kjøres kun én gang ved oppstart
    }, [dispatch]); // Ingen avhengigheter som kan trigge loop

    return <AppRoutes />;
};

export default App;
