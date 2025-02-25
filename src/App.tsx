import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setUsers } from "./redux/userSlice";
import apiGET from "./api/apiGET";
import AppRoutes from "./routes/AppRoutes";
import { RootState } from "./redux/store";
import { setBookings } from "./redux/bookingSlice";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            dispatch(setCurrentUser(JSON.parse(storedUser)));
        }
    }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Henter brukere fra localStorage eller API
                // Henter fra LS
                const usersFromLocal = localStorage.getItem("users");
                const storedUsers = usersFromLocal
                    ? JSON.parse(usersFromLocal)
                    : [];
                // Henter fra API
                const usersFromAPI = await apiGET("/users");
                // Henter frem admin-brukeren som vi får bruk for
                const adminUser = storedUsers.find(
                    (user) => user.role === "admin"
                );

                // Sjekker at vi har riktig antall begge steder, ellers bruker vi data fra api
                // +1 admin i LS!
                if (storedUsers.length === usersFromAPI.length + 1) {
                    dispatch(setUsers(storedUsers));
                } else {
                    const updatedUsers = adminUser
                        ? [...usersFromAPI, adminUser]
                        : usersFromAPI;
                    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Update LS
                }
                // ---------------------
                // Henter bookinger fra localStorage eller API
                const bookingsFromLocal = localStorage.getItem("bookings");
                const storedBookings = bookingsFromLocal
                    ? JSON.parse(bookingsFromLocal)
                    : [];
                // Henter fra API
                const bookingsFromAPI = await apiGET("/bookings");

                // Sjekker at vi har likt antall begge steder, ellers bruker vi data fra api
                if (storedBookings.length === bookingsFromAPI.length) {
                    dispatch(setBookings(storedBookings));
                } else {
                    dispatch(setBookings(bookingsFromAPI));
                    localStorage.setItem(
                        "bookings",
                        JSON.stringify(bookingsFromAPI)
                    ); // Update LS
                }
            } catch (error) {
                console.error("Feil ved lasting av data:", error);
            }
        };
        loadData(); // Kjøres kun én gang ved oppstart
    }, [dispatch]); // Ingen avhengigheter som kan trigge loop

    return <AppRoutes currentUser={currentUser} />;
};

export default App;
