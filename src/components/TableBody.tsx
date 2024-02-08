import type { Column, Row } from "../schema/dataTable";
import TableRow from "./TableRow";

export function TableBody({rows, columns, tableId}: {rows: Row[], columns: Column[], tableId: string}) {
    return (<>
        {rows.map((row) => (<TableRow row={row} columns={columns} tableId={tableId}/>))}
    </>);
}