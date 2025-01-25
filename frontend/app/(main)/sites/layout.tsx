import { ReactNode } from "react";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { revalidateTag } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";

export default function SitesLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <PageTitle
                mb="xl"
                title="Cайты"
                refresh={async () => {
                    "use server";

                    revalidateTag(revalidationKeys["sites"]);
                }}
            />
            {children}
        </>
    );
}
