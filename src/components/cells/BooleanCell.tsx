import type { CellData, Column } from "../../schema/dataTable";
import CellTemplate from "./CellTemplate";

export default function BooleanCell({ checked, column, rowId }: { checked: boolean, column: Column, rowId: string }) {
    return (
        <CellTemplate 
            column={column} 
            rowId={rowId}
            hx-patch={`/table/${column.tableId}/${rowId}/${column.id}`}
            hx-vals={`js:{"value":${!checked}}`}
            hx-swap="outerHTML"
            hx-trigger="click, keyup[keyCode==13], keyup[keyCode==32]"
        >
            <input
                tabindex="-1"
                name={column.id}
                type="checkbox"
                checked={checked}
                class="h-4 w-4 rounded accent-indigo-600 focus:ring-indigo-600 cursor-pointer" />

        </CellTemplate>
    );
}