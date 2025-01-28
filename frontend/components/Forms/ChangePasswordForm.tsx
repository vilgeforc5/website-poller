"use client";

import { Form, useForm } from "@mantine/form";
import { Button, Paper, PasswordInput, Stack, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { changePasswordAction } from "@/lib/actions/settings/changePasswordAction";

export const ChangePasswordForm = () => {
    const form = useForm({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
        },
        validate: (values) => {
            const newPasswordMatch =
                values.newPassword === values.newPasswordConfirm;

            return {
                oldPassword: null,
                newPassword:
                    values.newPassword.length < 8
                        ? "Недостаточная длина пароя"
                        : null,
                newPasswordConfirm: !newPasswordMatch
                    ? "Пароли не совпадают"
                    : null,
            };
        },
    });

    return (
        <Form
            form={form}
            onSubmit={async (values) => {
                form.setSubmitting(true);

                const res = await changePasswordAction(values);
                if (res) {
                    notifications.show({
                        title: "Пароль успешно изменен",
                        message: "",
                        color: "green",
                    });
                } else {
                    notifications.show({
                        title: "Ошибка при изменении пароля",
                        message: "",
                        color: "red",
                    });
                }

                form.setSubmitting(false);
            }}
        >
            <Paper component={Stack} p="md" w="max-content" miw="400px">
                <Title mb="xs" order={4}>
                    Смена пароля
                </Title>

                <PasswordInput
                    label={"Старый пароль"}
                    key={form.key("oldPassword")}
                    {...form.getInputProps("oldPassword")}
                />
                <PasswordInput
                    label={"Новый пароль"}
                    key={form.key("newPassword")}
                    {...form.getInputProps("newPassword")}
                />
                <PasswordInput
                    label={"Подтвердите новый пароль"}
                    key={form.key("newPasswordConfirm")}
                    {...form.getInputProps("newPasswordConfirm")}
                />
                <Button w="fit-content" type="submit">
                    Изменить пароль
                </Button>
            </Paper>
        </Form>
    );
};
