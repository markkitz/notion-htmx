import type {  Column } from "../../schema/dataTable";
import Chip from "../Chip";
import ChipSelected from "../ChipSelected";
import CellTemplate from "./CellTemplate";
import ChipEditor from "./ChipEditor";

export default function CellSelectEditor({ value, column, rowId }: { value: string, column: Column, rowId: string }) {
    const selectedOption = column.options?.find((option) => option.text === value) || { text: value || "", color: "gray" };
    return (<CellTemplate
        column={column}
        rowId={rowId}
        noPadding
        id="open-select"
       
    >
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
                    id="cell-select-editor"
                    class="absolute x-100 left-0 z-60   w-[250px] origin-top-right  bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                 >
                    <ChipEditor column={column} rowId={rowId} text={selectedOption.text} color={selectedOption.color} />
                    <div class="text-stone-400 p-2">Select an option or create a new one</div>
                    {column.options?.map((option) => (<div 
                    class="block px-2 py-1  hover:bg-stone-700 " role="menuitem" tabindex="0"
                        
                        hx-patch={`/table/${column.tableId}/${rowId}/${column.id}`}
                        hx-swap="outerHTML"
                        hx-trigger="click"
                        hx-target="#open-select"
                        hx-vals={`js:{value: '${option.text}'}`}
                        onkeyup="if(event.keyCode==13) this.click()"
                    ><Chip text={option.text} color={option.color} /></div>))}
                </div>
                 
        </div>
       


    </CellTemplate>)
}