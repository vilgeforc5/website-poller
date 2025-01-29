import { serverFetch } from "@/lib/serverFetch";
import { User } from "backend/dist/layers/users/users.types";
import { Grid, GridCol, Paper, Title } from "@mantine/core";
import { getTokenValues } from "@/lib/serverJwtValues";
import { UserTableControls } from "@/components/UsersTable/Controls";

export const UsersTable = async () => {
    const { data } = await serverFetch<User[]>("/users/all");
    const parsed = await getTokenValues();

    return (
        <Paper component={Grid} p="md">
            <Title order={4}>Все пользователи</Title>
            {data.map((user) => (
                <GridCol
                    key={user.email}
                    span={12}
                    component={Grid}
                    style={{
                        borderBottom: "1px solid var(--mantine-color-gray-4)",
                    }}
                >
                    <GridCol span={1}>
                        <UserTableControls
                            //@ts-ignore
                            isDisabled={parsed?.sub === user.id}
                            userId={user.id}
                        />
                    </GridCol>
                    <GridCol span={3}>{user.email}</GridCol>
                    <GridCol span={3}>{user.role}</GridCol>
                </GridCol>
            ))}
        </Paper>
    );
};
