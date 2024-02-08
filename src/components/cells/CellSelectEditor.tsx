import type { Color, Column } from "../../schema/dataTable";
import CellTemplate from "./CellTemplate";
import Chip from "./Chip";
import { ChipSelected } from "./ChipSelected";

export default function CellSelectEditor({ column, cellData, rowId }: { column: Column, cellData: string, rowId: string }) {

    const selectedOption = column.options?.find((option) => option.text === cellData);
    return (

        <CellTemplate column={column} noPadding id="open-select">
            <div class="h-full w-full relative">
                <div
                    id="modal-backstop"
                    class="fixed inset-0  z-50"
                    hx-get={`/table/${column.tableId}/${rowId}/${column.id}`}
                    hx-swap="outerHTML"
                    hx-trigger="click"
                    hx-target="#open-select"
                ></div>
                <div
                    class="absolute x-100 left-0 z-60   w-[250px] origin-top-right  bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <ChipEditor column={column} text={selectedOption?.text || null} color={selectedOption?.color || "gray"} rowId={rowId} />
                    <div class="text-stone-400 p-2">Select an option or create a new one</div>
                    {column.options?.map((option) => (<div class="block px-2 py-1  hover:bg-stone-700 " role="menuitem" tabindex="0"
                        hx-patch={`/table/${column.tableId}/${rowId}/${column.id}`}
                        hx-swap="outerHTML"
                        hx-trigger="click"
                        hx-target="#open-select"
                        hx-vals={`js:{value: '${option.text}'}`}
                        onkeyup="if(event.keyCode==13) this.click()"
                    ><Chip text={option.text} color={option.color} /></div>))}
                </div>
            </div>

        </CellTemplate>

    );
}

export function ChipEditor({ rowId, color, text, column }: { rowId: string, color: Color | null, text: string | null, column: Column }) {
    return (<div id="chip-editor" class="flex h-8 items-center px-2 border-b-1 border-b-stone-700"
    >
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
