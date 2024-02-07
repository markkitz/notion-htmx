import type { Color, Column } from "../../schema/dataTable";
import CellTemplate from "./CellTemplate";
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
                        <div id="chipEditor" class="flex h-8 items-center px-2 border-b-1 border-b-stone-700"
    >
                   <ChipSelected rowId={rowId} color={selectedOption?.color || 'gray'} text={cellData} column={column} />
                   </div>
                </div>
                </div>
        </CellTemplate>

    );
}

export function ChipEditor({ rowId, color, text, column }: { rowId: string, color: Color, text: string | null, column: Column}) {
    return (<div id="chipEditor" class="flex h-8 items-center px-2 border-b-1 border-b-stone-700"
    >
        {text && <ChipSelected rowId={rowId} color={color} text={text} column={column} />}
        <input type="text" name="value" value={""} autofocus="true"
            class="bg-zinc-800 w-full py-0 px-2 flex items-center text-sm flex-1 border-0 focus:border-0 outline-none"
            hx-post="/examples/lotus-notion/cell/chip"
            hx-swap="outerHTML" 
            hx-trigger="keyup[keyCode==13]"
            hx-vals={`js:{rowId: '${rowId}'}`}
            hx-target={`#chipEditor`}
            _="on keyup[keyCode==8] if  me.value.length == 0 then htmx.trigger('#selectedChip', 'remove-chip') end
               on keyup[keyCode==27]  htmx.trigger('#modal-backstop', 'click') end
            "
        />
    </div>)
}
