"use client";

import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";
import { useTablesStore } from "@/store/store/table-store-provider";
import { deleteDataSourceTableAction } from "@/lib/actions/data-source-table/deleteDataSourceTableAction";
import { notifications } from "@mantine/notifications";

export const DeleteDataSourceTable = () => {
    const state = useTablesStore((state) => state);

    return (
        <ConfirmationModal
            isOpen={state.action === "delete"}
            onClose={state.resetTableAction}
            description="Это действие безвозвратно удалит таблицу"
            onConfirm={async () => {
                const tableId = state.tableId;
                if (!tableId) {
                    return;
                }

                const ok = await deleteDataSourceTableAction(tableId);

                if (ok) {
                    notifications.show({
                        title: "Таблица успешно удалена",
                        message: "",
                        color: "green",
                    });
                } else {
                    notifications.show({
                        title: "Ошибка при удалении таблицы",
                        message: "",
                        color: "red",
                    });
                }

                state.resetTableAction();
            }}
        />
    );
};
