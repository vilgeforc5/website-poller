import { Badge, BadgeProps } from "@mantine/core";

interface ICodeStatusBadgeProps extends BadgeProps {
    code: number;
}

export const CodeStatusBadge = ({ code, ...other }: ICodeStatusBadgeProps) => {
    return (
        <Badge
            color={
                code >= 200 && code <= 299
                    ? "green"
                    : code >= 300 && code <= 399
                      ? "yellow"
                      : code >= 400 && code <= 499
                        ? "orange"
                        : "red"
            }
            size="lg"
            w="100px"
            {...other}
        >
            {code}
        </Badge>
    );
};
