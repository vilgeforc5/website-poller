"use client";
import { Form, useForm } from "@mantine/form";
import { Button, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
    const router = useRouter();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: { email: "", password: "" },
        onSubmitPreventDefault: "always",
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Невалидный email",
            password: (value) =>
                value.length > 8 ? null : "Невалидный пароль",
        },
    });

    async function onSubmit({
        password,
        email,
    }: {
        password: string;
        email: string;
    }) {
        const response = await fetch("api/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
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
            await router.replace("/");
        }
    }

    return (
        <Form form={form} onSubmit={onSubmit}>
            <TextInput
                w={{ base: "300px", md: "500px" }}
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
            <Button disabled={form.submitting} type="submit" mt="sm">
                Зайти
            </Button>
        </Form>
    );
};
