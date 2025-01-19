import { useAddSiteModal } from "@/components/modals/AddSiteModalState.ts";
import {
    Button,
    Flex,
    List,
    Modal,
    Text,
    TextInput,
    ThemeIcon,
} from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { getHotkeyHandler } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useSitesAddMutation } from "@/api/useSitesMutation.ts";

function validURL(str: string) {
    const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
        "i",
    ); // fragment locator
    return !!pattern.test(str);
}

function normalizeUrl(url: string) {
    if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url + "/";
    }
    return url;
}

export const AddSiteModal = () => {
    const { isOpen, toggle } = useAddSiteModal();
    const [sites, setSites] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const mutate = useSitesAddMutation(
        sites,
        () => {
            setSites([]);
            toggle();
            notifications.show({
                title: "Сайты добавлены",
                message: "",
                color: "green",
            });
        },
        () => {
            notifications.show({
                title: "Ошибка при добавлении сайтов",
                message: "",
                color: "red",
            });
        },
        () => {
            setIsSubmitting(false);
        },
    );

    const form = useForm({
        initialValues: { site: "" },
        mode: "controlled",
        onSubmitPreventDefault: "always",
        validate: {
            site: (value) => (validURL(value) ? null : "Невалидный адрес"),
        },
    });

    const addSite = () => {
        form.validate();

        if (form.values.site && form.isValid()) {
            setSites((prev) => [...prev, normalizeUrl(form.values.site)]);
            form.setValues({ site: "" });
        }
    };

    const onSend = () => {
        setIsSubmitting(true);
        mutate();
    };

    const onSiteDelete = (idx: number) => {
        const arr = [...sites];
        arr.splice(idx, 1);

        setSites(arr);
    };

    return (
        <Modal
            size="lg"
            title="Нажмите Enter чтобы быстро добавить несколько сайтов"
            centered
            opened={isOpen}
            onClose={toggle}
            onKeyDown={getHotkeyHandler([["Enter", addSite]])}
            keepMounted={true}
        >
            <List center spacing="sm" pb="sm">
                {sites.map((site, idx) => (
                    <List.Item
                        icon={
                            <ThemeIcon
                                color="gray"
                                size={24}
                                onClick={() => onSiteDelete(idx)}
                            >
                                <IconTrash size={16} />
                            </ThemeIcon>
                        }
                        key={idx}
                    >
                        <Text>{site}</Text>
                    </List.Item>
                ))}
            </List>
            <Form form={form}>
                <Flex>
                    <TextInput
                        key={form.key("site")}
                        type="url"
                        mt="sm"
                        {...form.getInputProps("site")}
                        w="100%"
                        placeholder="https://google.com/"
                        rightSection={
                            <ThemeIcon
                                size={36}
                                onClick={addSite}
                                color={form.values.site ? "blue" : "gray"}
                                component={Button}
                            >
                                <IconPlus />
                            </ThemeIcon>
                        }
                    />
                </Flex>
            </Form>
            <Button
                onClick={onSend}
                disabled={sites.length === 0 || isSubmitting}
                mt="md"
            >
                Загрузить сайты
            </Button>
        </Modal>
    );
};
