"use client";

import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";
import { useSiteStore } from "@/store/store/site/site-store-provider";
import { notifications } from "@mantine/notifications";
import { startPollAction } from "@/lib/actions/site/startPollAction";

export const StartPollModal = () => {
    const { closeStartPollModal, startPollModalOpen } = useSiteStore(
        (state) => state,
    );

    return (
        <ConfirmationModal
            type="warning"
            isOpen={startPollModalOpen}
            onClose={closeStartPollModal}
            onConfirm={async () => {
                const ok = await startPollAction();

                if (ok) {
                    notifications.show({
                        title: "Опрос успешно начат",
                        message: "",
                        color: "green",
                    });
                } else {
                    notifications.show({
                        title: "Ошибка при начале опроса",
                        message: "",
                        color: "red",
                    });
                }

                closeStartPollModal();
            }}
            description="Вы собираетесь запустить опрос всех текущих сайтов"
        />
    );
};
