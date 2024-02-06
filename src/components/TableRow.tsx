import type { Column, Row } from "../schema/dataTable";
import Cell from "./cells/Cell";
import CellTemplate from "./cells/CellTemplate";

export default function TableRow({row, columns}: {row: Row, columns: Column[]}) {
    return(<div class="flex  h-8 text-stone-100 relative">
        {columns.map((column) => {
            const value = row.cellData.find((cell) => cell.columnId === column.id)?.value || "";       
            return (
               <Cell column={column} cellData={value} rowId={row.id}/>
            )
        })}
        <div
        class="h-full   border-t-stone-700 border-t-1 flex-1 min-w-[30px]"
        >

        </div>
    </div>)

}