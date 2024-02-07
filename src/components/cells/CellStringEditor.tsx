import type { Column } from "../../schema/dataTable";
import CellTemplate from "./CellTemplate";

export default function CellStringEditor({ column, cellData, rowId }: { column: Column, cellData: string, rowId: string }) {
    return (

        <CellTemplate column={column} noPadding>
            <form
                hx-patch={`/table/${column.tableId}/${rowId}/${column.id}`}
                hx-swap="outerHTML"
                hx-trigger="inputblur"
                hx-target="closest div"
                class="w-full h-full"
            >
                <input
                    id={`${rowId}-${column.id}`}
                    name="value"
                    type="text"
                    value={cellData}
                    autofocus="true"
                    onfocus="this.setSelectionRange(this.value.length, this.value.length);"
                    class="bg-zinc-700 w-full py-0 px-2 h-full flex items-center text-sm"
                    _="on blur trigger inputblur"
                />
            </form>
        </CellTemplate>

    );
}