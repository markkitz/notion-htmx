import type { DataTable } from "../schema/dataTable";

export default function DataTable({dataTable}: {dataTable: DataTable}) {
    return (<div>hello from Data Table {dataTable.rows.length}</div>);
}