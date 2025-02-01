import { Stack } from "@mantine/core";
import { isUserAdmin } from "@/lib/jwtUtils";
import { serverFetch } from "@/lib/serverFetch";
import { IConfig } from "backend/dist/layers/config/config.types";
import { revalidationKeys } from "@/lib/revalidationKeys";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { revalidateTag } from "next/cache";
import { SettingsForm } from "@/components/Forms/SettingsForm";
import { ChangePasswordForm } from "@/components/Forms/ChangePasswordForm";
import { UsersTable } from "@/components/UsersTable/UsersTable";

export default async function SettingsPage() {
    const isAdmin = await isUserAdmin();

    const { data } = await serverFetch<IConfig>("/config", {
        next: { tags: [revalidationKeys.settings] },
    });

    return (
        <Stack>
            <PageTitle
                title="Настройки"
                refresh={async () => {
                    "use server";

                    revalidateTag(revalidationKeys.settings);
                }}
            />
            {isAdmin && (
                <>
                    <SettingsForm data={data} />
                    <UsersTable />
                </>
            )}
            <ChangePasswordForm />
        </Stack>
    );
}
