"use client";
import { AddUrlListForm } from "@/components/Forms/AddUrlListForm";

interface AddSiteFormProps {
    onSubmitAction: (data: string[]) => Promise<boolean>;
}

export const AddSiteForm = ({ onSubmitAction }: AddSiteFormProps) => {
    return (
        <AddUrlListForm
            onSubmitAction={onSubmitAction}
            label="Добавить сайт"
            description="По кнопке справа или нажатию Enter"
            placeholder="https://google.com/"
        />
    );
};
