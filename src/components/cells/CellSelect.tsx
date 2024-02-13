import type { Color, Column } from "../../schema/dataTable";
import CellTemplate from "./CellTemplate";
import Chip from "./Chip";

export default function CellSelect({ column, option,   rowId }: { column: Column, option: {text:string, color:Color},  rowId: string }) {
    return (
        <CellTemplate
            hx-get={`/table/${column.tableId}/${rowId}/${column.id}/edit`}
            hx-swap="outerHTML"
            hx-trigger="click, keyup[keyCode==13]"
            column={column}>
            <Chip text={option.text} color={option.color} />
        </CellTemplate>
    );
}

