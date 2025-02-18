import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "./redux/userSlice";
// import { setBookings } from "./redux/bookingSlice";
import AppRoutes from "./routes/AppRoutes";
import { RootState } from "./redux/store";
import { apiGET } from "./api/apiGET";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);

    useEffect(() => {
        const loadUsers = async () => {
            if (users.length === 0) {
                const fetchedUsers = await apiGET("/users");
                dispatch(setUsers(fetchedUsers));
            }
        };
        loadUsers();
    }, [dispatch, users]);

    return <AppRoutes />;
};

export default App;
