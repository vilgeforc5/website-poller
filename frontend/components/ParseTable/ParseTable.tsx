import { IDataSourceTableInfo } from "backend/src/layers/data-source-table/data-source-table.types";
import { Grid } from "@mantine/core";
import { ParseTableHeader } from "@/components/ParseTable/ParseTableHeader";
import { Row } from "@/components/ParseTable/Row/Row";

interface IParseTableProps {
    tables: IDataSourceTableInfo[];
}

export const ParseTable = ({ tables }: IParseTableProps) => {
    return (
        <Grid>
            <ParseTableHeader />
            {tables.map((table) => (
                <Row key={table.url} row={table} />
            ))}
        </Grid>
    );
};
