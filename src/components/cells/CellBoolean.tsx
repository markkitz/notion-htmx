import type { Column } from "../../schema/dataTable";
import CellTemplate from "./CellTemplate";

export default function CellBoolean({ column, checked, rowId }: { column: Column, checked: boolean, rowId: string }) {
    return (
        <CellTemplate
            column={column}
            hx-patch={`/table/${column.tableId}/${rowId}/${column.id}`}
            hx-vals={`js:{"value": '${!checked}'}`}
            hx-swap="outerHTML"
            hx-trigger="click, keyup[keyCode==13], keyup[keyCode==32]"
            
            
            >
            <input
                tabindex="-1"
                id={`${rowId}-${column.id}`}
                name="value"
                type="checkbox"
                checked={checked}
                class="h-4 w-4 rounded accent-indigo-600 focus:ring-indigo-600 cursor-pointer" />

        </CellTemplate>
    );
}