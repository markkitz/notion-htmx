import type { Column, Row } from "../schema/dataTable";
import RowMenu from "./RowMenu";
import Cell from "./cells/Cell";
import CellStringEditor from "./cells/CellStringEditor";

export default function TableRow({ row, columns, tableId, editColumnId }: { row: Row, columns: Column[], tableId: string, editColumnId?: string}) {
    return (
        <div class="flex  h-8 text-stone-100 relative" id={`row-${row.id}`} data-row-id={row.id}
        _="
        on mouseenter remove .opacity-0 from .row-drag-menu in me  end
        on mouseleave add .opacity-0 to .row-drag-menu in me end
        "
        
        >
            <RowMenu rowId={row.id} tableId={tableId}/>
            {columns.map((column) => {
                const cellData = row.cellData.find((cellData) => cellData.columnId === column.id);
                if (!cellData) {
                    throw new Error(`No cell data found for column ${column.id}`);
                }
                if(column.id === editColumnId){
                    return (<CellStringEditor column={column} rowId={row.id} value={cellData.value || ""}  />)
                }
                return (
                    <Cell cellData={cellData} column={column} rowId={row.id}/>
                );
            })}
            <div class="h-full   border-t-stone-700 border-t-1 flex-1 min-w-[30px]" > </div>
        </div>)
}