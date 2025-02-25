import { Navigate, Outlet } from "react-router-dom";
import { rolePermissions } from "./roles";
import { User } from "../redux/userSlice";

interface ProtectedRouteProps {
    currentUser: User | null;
    requiredRole: "user" | "admin";
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({
    currentUser,
    requiredRole,
}) => {
    if (!currentUser) {
        return <Navigate to={"/"} replace />;
    }

    if (!rolePermissions[currentUser.role]?.includes(requiredRole)) {
        return <Navigate to={"/404"} replace />;
    }

    return <Outlet />;
};
export default ProtectedRoutes;
