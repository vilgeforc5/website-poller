import { Flex, Title } from "@mantine/core";
import { SignUpForm } from "@/components/Forms/SignUpForm";

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
