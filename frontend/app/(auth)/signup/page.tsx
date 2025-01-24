import { Flex, Title } from "@mantine/core";
import { SignUpForm } from "@/app/(auth)/signup/form";

export default function Signup() {
    return (
        <Flex
            justify="center"
            align="center"
            w="100%"
            h="100vh"
            direction="column"
            style={{ flexGrow: 1 }}
        >
            <Title component="div">Регистрация</Title>
            <SignUpForm />
        </Flex>
    );
}
