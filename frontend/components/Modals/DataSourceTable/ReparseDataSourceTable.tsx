"use client";

import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";
import { useTablesStore } from "@/store/store/table-store-provider";
import { notifications } from "@mantine/notifications";
import { reparseDataSourceTableAction } from "@/lib/actions/data-source-table/refreshDataSourceTableAction";

export const ReparseDataSourceTable = () => {
    const state = useTablesStore((state) => state);

    return (
        <ConfirmationModal
            type="warning"
            isOpen={state.action === "reparse"}
            onClose={state.resetTableAction}
            description="Это действие запустит парсинг таблицы прямо сейчас"
            onConfirm={async () => {
                const tableId = state.tableId;
                if (!tableId) {
                    return;
                }

                const ok = await reparseDataSourceTableAction(tableId);

                if (ok) {
                    notifications.show({
                        title: "Парсинг начался",
                        message: "",
                        color: "green",
                    });
                } else {
                    notifications.show({
                        title: "Ошибка при начале парсинга",
                        message: "",
                        color: "red",
                    });
                }

                state.resetTableAction();
            }}
        />
    );
};
