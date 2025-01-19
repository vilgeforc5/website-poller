import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/auth/AuthProvider.tsx";

export const ProtectedRoute = () => {
    const { refresh, access, isPending } = useAuth();

    if (isPending) {
        return <div></div>;
    }

    if (!refresh || !access) {
        return <Navigate to="/sign-in" />;
    }

    return <Outlet />;
};
