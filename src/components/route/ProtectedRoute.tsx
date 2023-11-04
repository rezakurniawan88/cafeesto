import { Outlet, Navigate } from "react-router-dom"
import { useCheckAuth } from "../../hooks/auth/useCheckAuth";
import LoadingPage from "../loading/LoadingPage";

function ProtectedRoute() {
    const { data: isAuth, isLoading } = useCheckAuth();

    if (isLoading) {
        return <LoadingPage />;
    }

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute