import { Box } from "@mantine/core";
import { isUserAdmin } from "@/lib/serverJwtValues";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
    const isAdmin = await isUserAdmin();
    if (!isAdmin) {
        redirect("/dashboard");
    }

    return <Box>settings</Box>;
}
