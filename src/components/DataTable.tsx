import type { DataTable } from "../schema/dataTable";
import { AddItemRow } from "./AddItemRow";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

export default function DataTable({dataTable}: {dataTable: DataTable}) {
    return (<div class="min-w-1/2" id={`dt-${dataTable.id}`}>
        <TableHeader columns={dataTable.columns} />
        <div id={`rf-${dataTable.id}`} class="sortable" data-tableId={dataTable.id}
             hx-post={`/table/${dataTable.id}/sort`} 
             hx-trigger={`sort-${dataTable.id}`}
             hx-vals={`js:{item: getAllChildrenIds('rf-${dataTable.id}')}` }
        >
        <TableBody rows={dataTable.rows} columns={dataTable.columns} tableId={dataTable.id}/>
        </div>
        <AddItemRow tableId={dataTable.id} />
    </div>);
}