"use client";
import { AddUrlListForm } from "@/components/Forms/AddUrlListForm";

interface IAddParsingTableFormProps {
    onSubmitAction: (data: string[]) => Promise<boolean>;
}

export const AddParsingTableForm = ({
    onSubmitAction,
}: IAddParsingTableFormProps) => {
    return (
        <AddUrlListForm
            onSubmitAction={onSubmitAction}
            label="Добавить Google таблицу"
            description="По кнопке справа или нажатию Enter"
            placeholder="https://docs.google.com/spreadsheets/"
        />
    );
};
