import type { DataTable } from "../schema/dataTable";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

export default function DataTable({dataTable}: {dataTable: DataTable}) {
    return (<div class="min-w-1/2">
        <TableHeader columns={dataTable.columns} />
        <TableBody rows={dataTable.rows} columns={dataTable.columns}/>
    </div>);
}