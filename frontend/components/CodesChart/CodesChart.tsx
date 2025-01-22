"use client";

import { Paper, PaperProps } from "@mantine/core";
import { BarChart } from "@mantine/charts";

// const [menuVariant, setMenuVariant] = useState<"today" | "week">("today");
// const theme = useMantineTheme();

// const series = [
//     {
//         name: "200-299",
//         data: [44, 55, 41, 67, 22, 43, 34],
//     },
//     {
//         name: "Другие",
//         data: [13, 23, 20, 8, 13, 27, 10],
//     },
// ];
//
// const options: any = {
//     chart: {
//         type: "bar",
//         height: 300,
//         stacked: true,
//         toolbar: {
//             show: true,
//         },
//         zoom: {
//             enabled: true,
//         },
//         fontFamily: "Open Sans, sans-serif",
//     },
//     dataLabels: {
//         enabled: false,
//     },
//     plotOptions: {
//         bar: {
//             horizontal: false,
//             borderRadius: 4,
//             columnWidth: "25%",
//             dataLabels: {
//                 total: {
//                     enabled: false,
//                     style: {
//                         fontSize: "13px",
//                         fontWeight: 900,
//                     },
//                 },
//             },
//         },
//     },
//     xaxis: {
//         categories: ["13:00", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//     },
//     yaxis: {},
//     colors: [
//         theme.colors[theme.primaryColor][8],
//         theme.colors[theme.primaryColor][2],
//     ],
// };
//
// const props = { ...paperProps, ...others };
//
// return (
//     <Paper {...props}>
//         <Group justify="space-between" mb="md">
//             <Text size="lg" fw={600}>
//                 Статистика статус кодов
//             </Text>
//             <SelectDropDown
//                 items={[
//                     { value: "today", label: "За сегодня" },
//                     { value: "week", label: "За неделю" },
//                 ]}
//                 selected={menuVariant}
//                 onSelect={(value) =>
//                     setMenuVariant(value as "today" | "week")
//                 }
//             >
//                 <ActionIcon variant="subtle">
//                     <IconDotsVertical size={16} />
//                 </ActionIcon>
//             </SelectDropDown>
//         </Group>
//         <Chart
//             options={options}
//             series={series}
//             type="bar"
//             height={300}
//             width={"100%"}
//         />
//     </Paper>
// );

const paperProps: PaperProps = {
    p: "md",
    shadow: "md",
    radius: "md",
};

type CodesChartProps = PaperProps;

const CodesChart = ({ ...others }: CodesChartProps) => {
    const props = { ...paperProps, ...others };

    return (
        <Paper {...props}>
            <BarChart
                h={350}
                data={[
                    {
                        date: "January",
                        200: 1200,
                        300: 900,
                        400: 200,
                        500: 100,
                    },
                    {
                        date: "February",
                        200: 1200,
                        300: 900,
                        400: 200,
                        500: 100,
                    },
                    {
                        date: "March",
                        200: 1200,
                        300: 900,
                        400: 200,
                        500: 100,
                    },
                    {
                        date: "April",
                        200: 1200,
                        300: 900,
                        400: 200,
                        500: 100,
                    },
                    {
                        date: "May",
                        200: 1200,
                        300: 900,
                        400: 200,
                        500: 100,
                    },
                    {
                        date: "June",
                        200: 1200,
                        300: 900,
                        400: 200,
                        500: 100,
                    },
                ]}
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

export default CodesChart;
