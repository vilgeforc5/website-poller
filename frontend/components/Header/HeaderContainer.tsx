import { Header } from "@/components/Header/Header";
import { cookies } from "next/headers";
import { parseJwt } from "@/lib/auth";

export const HeaderContainer = async () => {
    const headersList = await cookies();
    const token = headersList.get("token");
    const encrypted = parseJwt(token?.value || "");

    return <Header email={encrypted?.email} role={encrypted?.role} />;
};
