import type { Color, Column } from "../../schema/dataTable";
import ChipSelected from "../ChipSelected";

export default function ChipEditor({ column, rowId, text, color }: { column: Column, rowId: string, text: string | null, color: Color | null }) {
    return (<div id="chip-editor" class="flex h-8 items-center px-2 border-b-1 border-b-stone-700">
        {(text && color) && <ChipSelected rowId={rowId} color={color} text={text} column={column} />}
        <input type="text" name="value" value={""} autofocus="true"
            class="bg-zinc-800 w-full py-0 px-2 flex items-center text-sm flex-1 border-0 focus:border-0 outline-none"
            hx-post={`/table/${column.tableId}/${rowId}/${column.id}/chip`}
            hx-swap="outerHTML"
            hx-trigger="keyup[keyCode==13]"
            hx-target={`#chip-editor`}
            _="on keyup[keyCode==8] if  me.value.length == 0 then htmx.trigger('#selectedChip', 'remove-chip') end
               on keyup[keyCode==27]  htmx.trigger('#modal-backstop', 'click') end
            "
        />
    </div>)

}