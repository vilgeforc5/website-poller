// import { SiteWithPolls } from "backend/src/prisma/prisma.types";
// import { DataTable } from "mantine-datatable";
// import { Table } from "@mantine/core";
// import { useMemo } from "react";
//
// export const SiteTable = ({ sites }: TSiteTableProps) => {
//     const sitesFormated = useMemo(
//         () =>
//             sites.map((site) => ({
//                 address: site.address,
//                 id: site.id,
//                 lastCode: site.pollData
//                     ? site.pollData[site.pollData.length - 1]?.statusCode || "-"
//                     : "-",
//                 lastRequestMethod: site.pollData
//                     ? site.pollData[site.pollData.length - 1]?.requestMethod ||
//                     "-"
//                     : "-",
//                 polls: site.pollData,
//             })),
//         [sites],
//     );
//
//     return (
//         <DataTable
//             columns={[
//                 { accessor: "address", title: "Адрес" },
//                 { accessor: "id", title: "Id" },
//                 { accessor: "lastCode", title: "Последний код" },
//                 {
//                     accessor: "lastRequestMethod",
//                     title: "Последний метод запроса",
//                 },
//             ]}
//             records={sitesFormated}
//             emptyState={<></>}
//             rowExpansion={{
//                 initiallyExpanded: ({ index }) => index === 3,
//                 content: ({ record }) =>
//                     record.polls &&
//                     record.polls?.length > 0 && (
//                         <Table>
//                             <Table.Thead>
//                                 <Table.Tr>
//                                     <Table.Td>Статус</Table.Td>
//                                     <Table.Td>Метод</Table.Td>
//                                     <Table.Td>Время</Table.Td>
//                                     <Table.Td>
//                                         Кол-во повторных попыток
//                                     </Table.Td>
//                                 </Table.Tr>
//                             </Table.Thead>//                             <Table.Tbody>
//                                 {record.polls.map((poll) => (
//                                     <Table.Tr key={poll.id}>
//                                         <Table.Td>{poll.statusCode}</Table.Td>
//                                         <Table.Td>
//                                             {poll.requestMethod}
//                                         </Table.Td>
//                                         <Table.Td>
//                                             {new Date(
//                                                 poll.createdAt,
//                                             ).toLocaleString()}
//                                         </Table.Td>
//                                         <Table.Td>{poll.retryCount}</Table.Td>
//                                     </Table.Tr>
//                                 ))}
//                             </Table.Tbody>
//                         </Table>
//                     ),
//                 expandable: ({ record }) =>
//                     Boolean(record.polls && record.polls?.length > 0),
//             }}
//         />
//     );
// };
//
// type TSiteTableProps = {
//     sites: SiteWithPolls[];
// };
