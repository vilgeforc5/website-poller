import { Text } from "@mantine/core";
import { NavLink } from "react-router";

export const HeaderTitle = () => (
    <Text
        size="28"
        fw={800}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        component={NavLink}
        to={"/"}
    >
        Anubis | Poller
    </Text>
);
