"use client";

import { Paper, PaperProps } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { TPollCodeInfo } from "backend/dist/layers/poll/poll.types";
import { useIsHydrated } from "@/components/useHydrated";

const paperProps: PaperProps = {
    p: "md",
    shadow: "md",
    radius: "md",
};

type CodesChartProps = { data: TPollCodeInfo } & PaperProps;

export const CodesChart = ({ data, ...others }: CodesChartProps) => {
    const hydrated = useIsHydrated();

    const props = { ...paperProps, ...others };

    return (
        <Paper {...props}>
            {hydrated && (
                <BarChart
                    h={350}
                    data={data.map((data) => {
                        return {
                            ...data,
                            date: new Date(data.date).toLocaleString(),
                        };
                    })}
                    dataKey="date"
                    series={[
                        { name: "200", color: "green.5" },
                        { name: "300", color: "yellow.3" },
                        { name: "400", color: "orange.5" },
                        { name: "500", color: "red.5" },
                    ]}
                    tickLine="y"
                />
            )}
        </Paper>
    );
};
