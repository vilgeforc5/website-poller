import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/auth/AuthProvider.tsx";

export const ProtectedRoute = () => {
    const { refresh, access, isReady } = useAuth();

    if (!isReady) {
        return null;
    }

    if (!refresh || !access) {
        return <Navigate to="/sign-in" />;
    }

    return <Outlet />;
};
