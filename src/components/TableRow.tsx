import type { Column, Row } from "../schema/dataTable";
import Cell from "./cells/Cell";

export default function TableRow({row, columns}: {row: Row, columns: Column[]}) {
    return(<div class="flex  h-8 text-stone-100 relative">
        {columns.map((column) => {
            const value = row.cellData.find((cell) => cell.columnId === column.id)?.value || "";       
            return (
               <Cell column={column} cellData={value}/>
            )
        })}

    </div>)

}