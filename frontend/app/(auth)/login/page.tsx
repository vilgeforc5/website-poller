import { Flex, Title } from "@mantine/core";
import { LoginForm } from "@/components/Forms/LoginForm";

export default function Login() {
    return (
        <Flex
            justify="center"
            align="center"
            w="100%"
            h="100vh"
            direction="column"
            style={{ flexGrow: 1 }}
        >
            <Title component="div">Логин</Title>
            <LoginForm />
        </Flex>
    );
}
