"use client";
import { Form, useForm } from "@mantine/form";
import { Button, PinInput, Stack, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
    const router = useRouter();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: { email: "", password: "", signUpKey: "" },
        onSubmitPreventDefault: "always",
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Невалидный email",
            password: (value) => (value.length > 8 ? null : "Cлабый пароль"),
        },
    });

    async function onSubmit({
        password,
        email,
        signUpKey,
    }: {
        password: string;
        email: string;
        signUpKey: string;
    }) {
        const response = await fetch("api/signup", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                signUpKey,
            }),
        });
        const data = await response.json();

        if (!data) {
            notifications.show({
                title: "Неизвестная ошибка",
                message: "",
                color: "red",
            });
        }

        if (!response.ok) {
            notifications.show({
                title: data.message,
                message: data.data,
                color: "red",
            });
        }

        if (
            data &&
            data.hasOwnProperty("refresh_token") &&
            data.hasOwnProperty("access_token")
        ) {
            notifications.clean();
            router.replace("/dashboard");
        }
    }

    return (
        <Form form={form} onSubmit={onSubmit} style={{ minWidth: "400px" }}>
            <TextInput
                label="Почта"
                placeholder="Email"
                key={form.key("email")}
                type="email"
                {...form.getInputProps("email")}
            />
            <TextInput
                mt="sm"
                label="Пароль"
                placeholder="********"
                key={form.key("password")}
                type="password"
                {...form.getInputProps("password")}
            />
            <Stack align="center">
                <PinInput
                    type="alphanumeric"
                    key={form.key("signUpKey")}
                    style={(theme) => ({ marginTop: theme.spacing.md })}
                    length={7}
                    {...form.getInputProps("signUpKey")}
                />
                <Button disabled={form.submitting} type="submit" mt="sm">
                    Зарегистрироваться
                </Button>
            </Stack>
        </Form>
    );
};
