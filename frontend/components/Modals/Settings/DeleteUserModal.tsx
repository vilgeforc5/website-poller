"use client";

import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";
import { useSettingsStore } from "@/store/store/settings/settings-store-provider";
import { deleteUserAction } from "@/lib/actions/settings/deleteUserAction";
import { notifications } from "@mantine/notifications";

export const DeleteUserModal = () => {
    const state = useSettingsStore((state) => state);

    return (
        <ConfirmationModal
            isOpen={state.deleteUserModalOpen}
            description="Это действие безвозвратно удалит пользователя"
            onClose={state.closeDeleteUserModal}
            onConfirm={async () => {
                if (state.targetUserId) {
                    const ok = await deleteUserAction(state.targetUserId);

                    if (ok) {
                        notifications.show({
                            title: "Пользователь удален",
                            message: "",
                            color: "green",
                        });
                    } else {
                        notifications.show({
                            title: "Ошибка при удалении пользователя",
                            message: "",
                            color: "red",
                        });
                    }
                }

                state.closeDeleteUserModal();
            }}
        />
    );
};
