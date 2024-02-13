import type { Column } from "../schema/dataTable";

export default function TableHeader({ columns }: { columns: Column[] }) {
    return (
        <div
        class="flex relative h-8  text-stone-400 border-t-stone-700 border-t-1   font-bold items-center ml-6"

        id={`th-${columns[0].tableId}`} data-tableId={columns[0].tableId}
        >{columns.map((column) => (
            <div
            id={column.id} class="absolute flex  cursor-grab  h-full select-none items-center px-2 text-sm font-bold border-r-stone-700 border-r-1  hover:bg-stone-800 hover:opacity-80 hover:z-10"          
            onmousedown="columnMouseDown(event)"
            style={`transform: translateX(${column.x}px);width:${column.width}px`}
            data-column={column.id}
            data-column-width={column.width}
        >
            <ColumnExpanderHandle columnId={column.id} tableId={column.tableId} />
            {column.title}</div>))}</div>
    );
} 


function ColumnExpanderHandle({ columnId, tableId }: { columnId: string, tableId: string}) {
    return (<div class="hover:bg-blue-700 w-[5px] h-full absolute top-0 right-0 -mr-[3px]  cursor-col-resize z-10"
        onmousedown={`expanderMouseDown(event, '${columnId}', '${tableId}')`}
    ></div>)
}