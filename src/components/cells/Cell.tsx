import type { Column } from "../../schema/dataTable";
import CellBoolean from "./CellBoolean";

export default function Cell({column, cellData, rowId}: {column: Column, cellData: string, rowId: string}) {
    if(column.type === 'boolean'){
        return (<CellBoolean column={column} checked={cellData === 'true'} rowId={rowId} />);
    }

    return (<div 
    class="h-full  flex items-center  text-stone-300  cursor-pointer select-none border-t-stone-700 border-t-1"    
    style={{width: `${column.width}px`}}>
        {cellData}
    </div>);
}