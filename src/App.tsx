import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser, setUsers } from "./redux/userSlice";
import apiGET from "./api/apiGET";
import AppRoutes from "./routes/AppRoutes";
import { setBookings } from "./redux/bookingSlice";

const App = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const storedUser = localStorage.getItem("currentUser");
    //     if (storedUser) {
    //         dispatch(setCurrentUser(JSON.parse(storedUser)));
    //     }
    // }, [dispatch]);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Henter brukere fra localStorage eller API
                // Henter fra LS
                const usersFromLocal = JSON.parse(
                    localStorage.getItem("users") || []
                );
                // Henter fra API
                const usersFromAPI = await apiGET("/users");
                // Henter frem admin-brukeren som bør finnes i localStorage
                const adminUser = usersFromLocal.find(
                    (user) => user.role === "admin"
                );
                // Sjekker at vi har riktig antall begge steder, ellers bruker vi data fra api
                // +1 admin i LS!
                if (usersFromLocal.length === usersFromAPI.length + 1) {
                    dispatch(setUsers(usersFromLocal));
                } else {
                    const updatedUsers = adminUser
                        ? [...usersFromAPI, adminUser]
                        : usersFromAPI;
                    dispatch(setUsers(updatedUsers));
                    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Update LS
                }
                // ---------------------
                // Henter bookinger fra localStorage eller API
                const bookingsFromLocal = JSON.parse(
                    localStorage.getItem("bookings")
                );
                // Henter fra API
                const bookingsFromAPI = await apiGET("/bookings");

                // Sjekker at vi har likt antall begge steder, ellers bruker vi data fra api
                if (bookingsFromLocal.length === bookingsFromAPI.length) {
                    dispatch(setBookings(bookingsFromLocal));
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

    return <AppRoutes />;
};

export default App;
