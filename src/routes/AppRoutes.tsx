import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";
import Admin from "../pages/Admin";
import Layout from "../components/Layout";
import ProtectedRoutes from "./ProtectedRoutes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import RegisterUser from "../components/RegisterUser";

const AppRoutes = () => {
    const currentUser = useSelector(
        (state: RootState) => state.users.currentUser
    );

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Layout>
                    <Home />
                </Layout>
            ),
        },
        {
            path: "/register",
            element: (
                <Layout>
                    <RegisterUser />
                </Layout>
            ),
        },
        {
            path: "/mypage",
            element: (
                <Layout>
                    <ProtectedRoutes
                        currentUser={currentUser}
                        requiredRole="user"
                    />
                </Layout>
            ),
            children: [
                {
                    path: "",
                    element: <MyPage />,
                },
            ],
        },
        {
            path: "/admin",
            element: (
                <Layout>
                    <ProtectedRoutes
                        currentUser={currentUser}
                        requiredRole="admin"
                    />
                </Layout>
            ),
            children: [
                {
                    path: "",
                    element: <Admin />,
                },
            ],
        },
        {
            path: "/404",
            element: <h2>Ingen tilgang!</h2>,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRoutes;
