import { useAuth } from "@/auth/AuthProvider.tsx";
import { jwtDecode } from "jwt-decode";

export const useAuthData = () => {
    const { access } = useAuth();
    const { role, email } = jwtDecode<{ email: string; role: string }>(access || "");

    return { role, email };
};
