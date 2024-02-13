import type { Color, Column } from "../../schema/dataTable";
import Chip from "./Chip";

export function ChipSelected({ rowId, color, text, column }: { rowId: string, color: Color, text: string | null, column: Column}) {
    return (<div id="selectedChip"
        hx-trigger="remove-chip"
        hx-delete={`/table/${column.tableId}/${rowId}/${column.id}/chip`}
        hx-vals={`{"value": null}`}
        hx-target={`#chip-editor`}
        hx-swap="outerHTML"
    >
        {text && <Chip color={color} text={text} onclick={`htmx.trigger("#selectedChip", "remove-chip")`} />}
    </div>)
}