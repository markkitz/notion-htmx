import type { Column } from "../../schema/dataTable";
import CellBoolean from "./CellBoolean";
import CellSelect from "./CellSelect";
import CellTemplate from "./CellTemplate";

export default function Cell({column, cellData, rowId}: {column: Column, cellData: string | null, rowId: string}) {
    if(column.type === 'boolean'){
        return (<CellBoolean column={column} checked={cellData === 'true'} rowId={rowId} />);
    }
    if(!!cellData && column.type === 'select'){
        
        return (<CellSelect column={column} option={column.options?.find((option) => option.text === cellData) || {text: cellData, color: 'gray'}} rowId={rowId} />);
    }
    return (<CellTemplate column={column}
        hx-get={`/table/${column.tableId}/${rowId}/${column.id}/edit`}
        hx-swap="outerHTML"
    
    > {cellData || ""}</CellTemplate>);
}