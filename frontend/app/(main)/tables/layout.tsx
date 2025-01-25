import { ReactNode } from "react";
import { TablesStoreProvider } from "@/store/store/table-store-provider";
import { DeleteDataSourceTable } from "@/components/Modals/DataSourceTable/DeleteDataSourceTable";
import { ReparseDataSourceTable } from "@/components/Modals/DataSourceTable/ReparseDataSourceTable";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { revalidateTag } from "next/cache";
import { revalidationKeys } from "@/lib/revalidationKeys";

export default function PagesLayout({ children }: { children: ReactNode }) {
    return (
        <TablesStoreProvider>
            <PageTitle
                mb="xl"
                title="Таблицы для парсинга"
                refresh={async () => {
                    "use server";

                    revalidateTag(revalidationKeys["parsing-tables"]);
                }}
            />
            <DeleteDataSourceTable />
            <ReparseDataSourceTable />
            {children}
        </TablesStoreProvider>
    );
}
