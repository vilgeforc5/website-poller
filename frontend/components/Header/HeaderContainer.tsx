import { Header } from "@/components/Header/Header";
import { getTokenValues } from "@/lib/serverJwtValues";

export const HeaderContainer = async () => {
    const encrypted = await getTokenValues();

    return <Header email={encrypted?.email} role={encrypted?.role} />;
};
