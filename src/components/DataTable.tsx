import type { DataTable } from "../schema/dataTable";
import { AddItemRow } from "./AddItemRow";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function DataTable({dataTable}: {dataTable: DataTable}) {
    return (
        <div class="min-w-1/2" id={`dt-${dataTable.id}`}>
            <TableHeader columns={dataTable.columns}/>
            <TableBody tableId={dataTable.id} rows={dataTable.rows} columns={dataTable.columns} />
            <AddItemRow tableId={dataTable.id} />
            <input type="hidden" 
            id={`hdn-rowsort-${dataTable.id}`}       
            hx-post={`/table/${dataTable.id}/sort`}  
            hx-target={`#rf-${dataTable.id}`} 
            hx-vals={`js:{item: getAllChildrenIds('rf-${dataTable.id}')}` }
            hx-trigger="click"
            />
            <input type="hidden" 
            id={`hdn-columns-${dataTable.id}`} 
            hx-post={`/table/${dataTable.id}/column-change`} 
            hx-target={`#dt-${dataTable.id}`} 
            hx-vals={`js:{columns: getColumnData('${dataTable.id}')}`}
            hx-trigger="click" 
            />
        </div>
    );
}