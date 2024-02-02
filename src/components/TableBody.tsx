import type { Column, Row } from "../schema/dataTable";
import TableRow from "./TableRow";

export function TableBody({rows, columns}: {rows: Row[], columns: Column[]}) {
    return (<>
        {rows.map((row) => (<TableRow row={row} columns={columns}/>))}
    </>);
}