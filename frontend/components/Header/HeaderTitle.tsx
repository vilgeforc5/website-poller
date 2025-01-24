import { Text } from "@mantine/core";
import Link from "next/link";

export const HeaderTitle = () => (
    <Text
        size="28"
        fw={800}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        component={Link}
        href={"/dashboard"}
    >
        Anubis | Poller
    </Text>
);
