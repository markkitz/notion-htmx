import type { Color, Column } from "../../schema/dataTable";
import Chip from "./Chip";

export function ChipSelected({ rowId, color, text, column }: { rowId: string, color: Color, text: string | null, column: Column}) {
    return (<div id="selectedChip"
        hx-trigger="remove-chip"
        hx-patch={`/table/${column.tableId}/${rowId}/${column.id}`}
        hx-vals={`{"value": null}`}
        hx-target={`#open-select`}
        hx-swap="outerHTML"
    >
        {text && <Chip color={color} text={text} onclick={`htmx.trigger("#selectedChip", "remove-chip")`} />}
    </div>)
}