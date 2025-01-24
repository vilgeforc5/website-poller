import { Badge, Group, Paper, PaperProps, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";

import classes from "./StatsCard.module.scss";

type StatsCardProps = {
    data: {
        title: string;
        value: string | number;
        diff?: number;
        period?: string;
        description?: string;
    };
} & PaperProps;

const paperProps: PaperProps = {
    p: "md",
    shadow: "sm",
    radius: "md",
    style: { height: "100%" },
};

const StatsCard = ({ data, ...others }: StatsCardProps) => {
    const { title, value, period, diff, description } = data;
    const DiffIcon = diff && diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    const props = { ...paperProps, ...others };

    return (
        <Paper {...props}>
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

            <Group align="flex-end" gap="xs" mt={25}>
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
        </Paper>
    );
};

export default StatsCard;
