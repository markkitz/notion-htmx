import type { Column } from "../../schema/dataTable";

export default function Cell({column, cellData}: {column: Column, cellData: string}) {
    return (<div 
    class="h-full  flex items-center  text-stone-300  cursor-pointer select-none border-t-stone-700 border-t-1"    
    style={{width: `${column.width}px`}}>
        {cellData}
    </div>);
}