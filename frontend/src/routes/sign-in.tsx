import { useAuth } from "@/auth/AuthProvider.tsx";
import { Navigate } from "react-router";
import { LoginForm } from "@/components/forms/login/LoginForm.tsx";
import { Flex, Title } from "@mantine/core";

export default function SignIn() {
    const { refresh, access } = useAuth();

    if (refresh && access) {
        return <Navigate to={"/"} replace />;
    }

    return (
        <Flex justify="center" align="center" w="100%" h="100vh" direction="column">
            <Title component="div">Логин</Title>
            <LoginForm />
        </Flex>
    );
}
