import { Form, TransformedValues, useForm } from "@mantine/form";
import { Button, TextInput } from "@mantine/core";
import { useCallback } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/auth/AuthProvider.tsx";

export const LoginForm = () => {
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

    const { setTokens } = useAuth();

    const onSubmit = useCallback(
        async (data: TransformedValues<typeof form>) => {
            form.setSubmitting(true);
            axios
                .post("api/auth/signin", data)
                .then((res) => {
                    const accessToken = res.data["access_token"];
                    const refreshToken = res.data["refresh_token"];

                    if (accessToken && refreshToken) {
                        setTokens(accessToken, refreshToken);
                    }
                })
                .catch((e: AxiosError) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    const message = e.response?.data?.message;

                    notifications.show({
                        title: "Ошибка логина",
                        message: e.message + " | " + message,
                        color: "red",
                    });
                })
                .finally(() => {
                    form.setSubmitting(false);
                });
        },
        [form, setTokens],
    );

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
