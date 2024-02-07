import type { Column } from "../../schema/dataTable";
import CellBoolean from "./CellBoolean";
import CellTemplate from "./CellTemplate";

export default function Cell({column, cellData, rowId}: {column: Column, cellData: string, rowId: string}) {
    if(column.type === 'boolean'){
        return (<CellBoolean column={column} checked={cellData === 'true'} rowId={rowId} />);
    }
    return (<CellTemplate column={column}
        hx-get={`/table/${column.tableId}/${rowId}/${column.id}/edit`}
        hx-swap="outerHTML"
    
    > {cellData}</CellTemplate>);
}