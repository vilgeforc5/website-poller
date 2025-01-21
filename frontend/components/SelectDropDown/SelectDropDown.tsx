import { ReactNode } from "react";
import { Menu } from "@mantine/core";

export const SelectDropDown = ({
    children,
    onSelect,
    items,
    selected,
}: SelectDropDownProps) => {
    return (
        <Menu
            trigger="click-hover"
            width={300}
            position="bottom"
            withArrow
            shadow="md"
        >
            <Menu.Target>{children}</Menu.Target>
            <Menu.Dropdown>
                {items.map((item) => (
                    <Menu.Item
                        key={item.value}
                        color={selected === item.value ? "blue" : "inherit"}
                        onClick={() => onSelect(item.value)}
                    >
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};

interface SelectDropDownProps {
    children: ReactNode;
    onSelect: (value: string) => void;
    selected: string;
    items: { label: string; value: string }[];
}
