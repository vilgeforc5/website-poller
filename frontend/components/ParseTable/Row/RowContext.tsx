"use client";

import { createContext, ReactNode, useContext } from "react";
import { useDisclosure } from "@mantine/hooks";

const RowContext = createContext<{
    dropDownOpen: boolean;
    toggleDropDown: () => void;
    shouldBeDisabled: boolean;
}>({
    dropDownOpen: false,
    toggleDropDown: () => {},
    shouldBeDisabled: false,
});

export const WithRowContext = ({
    children,
    shouldBeDisabled = false,
}: {
    children: ReactNode;
    shouldBeDisabled: boolean;
}) => {
    const [dropDownOpen, { toggle }] = useDisclosure();

    return (
        <RowContext.Provider
            value={{
                toggleDropDown: toggle,
                dropDownOpen: dropDownOpen,
                shouldBeDisabled,
            }}
        >
            {children}
        </RowContext.Provider>
    );
};

export const useParseTableRowContext = () => {
    return useContext(RowContext);
};
