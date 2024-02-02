import type { DataTable } from "../schema/dataTable";
import { generateFakeTableData, type DbDataTable, type DbColumn, type DbRowData, type DbCellData } from "./dataTables";

const _dbTables: DbDataTable[] = [];
const _dbColumns: DbColumn[] = [];
const _dbRows: DbRowData[] = [];
const _dbCells: DbCellData[] = [];
export function db() {    

    return {
        getDataTable : (id:string):DataTable => {
            let dbDt = _dbTables.find(dt => dt.id === id);
            if (!dbDt){
                const {tables, columns, rows, cells} = generateFakeTableData(id);
                _dbTables.push(...tables);
                _dbColumns.push(...columns);
                _dbRows.push(...rows);
                _dbCells.push(...cells);           
            }
            return {
                id,
                columns: _dbColumns.filter(c => c.tableId === id),
                rows: _dbRows.filter(r => r.tableId === id).map(r => {
                    return {
                        id: r.id,
                        cellData: _dbCells.filter(c => c.rowId === r.id && c.tableId === id).map(c => {
                            return {
                                columnId: c.columnId,
                                value: c.value
                            }
                        })
                    }
                }
                )
            };
        }
    }
}