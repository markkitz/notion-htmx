import type { Color, Column } from "../schema/dataTable";
import Chip from "./Chip";

export default function ChipSelected({ color, text, column, rowId }: { color: Color, text: string, column: Column, rowId: string }) {
    return (<div
        id="selectedChip"
        hx-delete={`/table/${column.tableId}/${rowId}/${column.id}/chip`}
        hx-swap="outerHTML"
        hx-trigger="remove-chip"
   
    
    >
        <Chip color={color} text={text} onclick={`htmx.trigger("#selectedChip", "remove-chip")`} />
    </div>)
}