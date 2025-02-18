// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { rolePermissions, UserRole } from "./roles";

// interface ProtectedRouteProps {
//     requiredRole: UserRole;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
//     const userRole = useSelector((state: RootState) => state.user.role);

//     return rolePermissions[userRole].includes(window.location.pathname) ? (
//         <Outlet />
//     ) : (
//         <Navigate to="/" />
//     );
// };

// export default ProtectedRoute;
