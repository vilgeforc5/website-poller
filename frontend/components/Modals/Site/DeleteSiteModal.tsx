"use client";

import { deleteSiteAction } from "@/lib/actions/site/deleteSiteAction";
import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";
import { useSiteStore } from "@/store/store/site/site-store-provider";
import { notifications } from "@mantine/notifications";

export const DeleteSiteModal = () => {
    const { setTargetToDeletionId, targetToDeletionId } = useSiteStore(
        (state) => state,
    );

    return (
        <ConfirmationModal
            type="danger"
            isOpen={targetToDeletionId !== undefined}
            onClose={() => setTargetToDeletionId(undefined)}
            onConfirm={async () => {
                if (!targetToDeletionId) {
                    return;
                }

                const ok = await deleteSiteAction(targetToDeletionId);

                if (ok) {
                    notifications.show({
                        title: "Сайт успешно удален",
                        message: "",
                        color: "green",
                    });
                } else {
                    notifications.show({
                        title: "Ошибка при удалении сайта ",
                        message: "",
                        color: "red",
                    });
                }

                setTargetToDeletionId(undefined);
            }}
            description="Вы удалить этот сайт"
        />
    );
};
