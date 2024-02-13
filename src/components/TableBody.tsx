import type { Column, Row } from "../schema/dataTable";
import TableRow from "./TableRow";

export default function TableBody({rows, columns, tableId}: {rows: Row[], columns: Column[], tableId: string}) {
    return (<div class="sortable" data-tableId={tableId} id={`rf-${tableId}`}>
        {rows.map((row) => (<TableRow row={row} columns={columns} tableId={tableId} />))}
        </div>)
}