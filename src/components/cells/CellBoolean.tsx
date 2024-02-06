import type { Column } from "../../schema/dataTable";

export default function CellBoolean({column, checked, rowId}: {column: Column, checked: boolean, rowId: string}) {
    return (<div 
        class="h-full  flex items-center  text-stone-300   border-t-stone-700 border-t-1"   
            hx-patch={`/table/${column.tableId}/rows/${rowId}/cells/${column.id}`}
            hx-vals={`js:{"value": document.getElementById("${rowId}-${column.id}").checked}`} 
        style={{width: `${column.width}px`}}>
            <input 
            id={`${rowId}-${column.id}`}
            name="value"
            type="checkbox" 
            checked={checked}
            
            class="h-4 w-4 rounded accent-indigo-600 focus:ring-indigo-600 cursor-pointer" />
        </div>);
}