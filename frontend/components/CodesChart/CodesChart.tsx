"use client";

import { Paper, PaperProps } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { TPollCodeInfo } from "backend/dist/layers/poll/poll.types";

const paperProps: PaperProps = {
    p: "md",
    shadow: "md",
    radius: "md",
};

type CodesChartProps = { data: TPollCodeInfo } & PaperProps;

export const CodesChart = ({ data, ...others }: CodesChartProps) => {
    const props = { ...paperProps, ...others };

    return (
        <Paper {...props}>
            <BarChart
                h={350}
                data={data}
                dataKey="date"
                series={[
                    { name: "200", color: "green.5" },
                    { name: "300", color: "green.3" },
                    { name: "400", color: "yellow.5" },
                    { name: "500", color: "red.5" },
                ]}
                tickLine="y"
            />
        </Paper>
    );
};
