import type { CellData,  Column } from "../../schema/dataTable";
import BooleanCell from "./BooleanCell";
import CellSelect from "./CellSelect";
import CellTemplate from "./CellTemplate";

export default function Cell({ cellData, column, rowId }: { cellData: CellData, column: Column, rowId:string}) {
    if(column.type === "boolean") {
        return (<BooleanCell checked={cellData.value === "true"} column={column} rowId={rowId} />);
    }
    if(cellData.value && column.type === "select") {
        return(<CellSelect option={column.options?.find((option) => option.text === cellData.value) || {text: cellData.value || "", color: "gray"}} column={column} rowId={rowId} />)
    }
    return(<CellTemplate column={column} rowId={rowId}
        hx-get={`/table/${column.tableId}/${rowId}/${column.id}/edit`}
        hx-swap="outerHTML"
        hx-trigger="click, focus"
    
    >
        {cellData.value || ""}
    </CellTemplate>);
}

