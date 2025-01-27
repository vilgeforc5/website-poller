import {
    Badge,
    Box,
    Flex,
    Group,
    NavLink,
    Paper,
    PaperProps,
    Stack,
    Text,
} from "@mantine/core";
import {
    IconArrowDownRight,
    IconArrowUpRight,
    IconChevronRight,
} from "@tabler/icons-react";

import classes from "./StatsCard.module.scss";
import Link from "next/link";
import { ReactNode } from "react";

type StatsCardProps = {
    title: string;
    value: string | number;
    diff?: number;
    period?: string;
    description?: ReactNode;
    link?: string;
};

const paperProps: PaperProps = {
    p: "md",
    shadow: "sm",
    radius: "md",
    style: { height: "100%" },
};

const StatsCard = ({
    title,
    value,
    period,
    diff,
    description,
    link,
}: StatsCardProps) => {
    const DiffIcon = diff && diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
        <Paper {...paperProps}>
            <Flex direction="column" h="100%">
                <Group justify="space-between">
                    <Text size="xs" c="dimmed" className={classes.title}>
                        {title}
                    </Text>
                    {period && (
                        <Badge variant="filled" radius="sm">
                            {period}
                        </Badge>
                    )}
                </Group>
                <Stack
                    m="auto 0"
                    align="flex-start"
                    gap="0"
                    style={{ justifySelf: "center" }}
                >
                    <Group gap="sm" justify="center">
                        <Text className={classes.value}>{value}</Text>
                        {diff && (
                            <Text
                                c={diff > 0 ? "teal" : "red"}
                                fz="sm"
                                fw={500}
                                className={classes.diff}
                            >
                                <span>{diff.toFixed(2)}</span>
                                <DiffIcon size="1rem" stroke={1.5} />
                            </Text>
                        )}
                    </Group>
                    <Text fz="xs" c="dimmed" mt={7}>
                        {description}
                    </Text>
                </Stack>
                <Box h="xl">
                    {link && (
                        <NavLink
                            label="смотреть больше"
                            href={link}
                            p={0}
                            component={Link}
                            variant="subtle"
                            active={true}
                            rightSection={
                                <IconChevronRight
                                    size={12}
                                    stroke={1.5}
                                    className="mantine-rotate-rtl"
                                />
                            }
                        />
                    )}
                </Box>
            </Flex>
        </Paper>
    );
};

export default StatsCard;
