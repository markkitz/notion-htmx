import type { Column, Row } from "../schema/dataTable";
import RowMenu from "./RowMenu";
import Cell from "./cells/Cell";
import CellStringEditor from "./cells/CellStringEditor";
import CellTemplate from "./cells/CellTemplate";

export default function TableRow({row, columns, editColumnId, tableId }: {row: Row, columns: Column[], editColumnId?: string, tableId: string}) {
    return(<div class="flex  h-8 text-stone-100 relative" id={`row-${row.id}`}
        _="
        on mouseenter remove .opacity-0 from .row-drag-menu in me  end
        on mouseleave add .opacity-0 to .row-drag-menu in me end
        "
    
    >
        <RowMenu rowId={row.id} tableId={tableId}  />
        {columns.map((column) => {
            const value = row.cellData.find((cell) => cell.columnId === column.id)?.value || null;    
            if(column.id === editColumnId){
                return (<CellStringEditor column={column} rowId={row.id} cellData={value || ""}  />)
            }   
            return (
               <Cell column={column} cellData={value} rowId={row.id}/>
            )
        })}
        <div class="h-full   border-t-stone-700 border-t-1 flex-1 min-w-[30px]" ></div>
    </div>)

}