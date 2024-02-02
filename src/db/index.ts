import { customAlphabet } from "nanoid";
import type { Column, DataTable, Row } from "../schema/dataTable";


const _dbTables: DataTable[] = [];
export function db() {

    return {
        getDataTable: (id: string): DataTable => {
            let dbDt = _dbTables.find(dt => dt.id === id);
            if (!dbDt) {
                dbDt = generateFakeTableData(id);
                _dbTables.push(dbDt);
            }
            return dbDt;

        }
    }
}

export function generateFakeTableData(tableId: string): DataTable {

    const nanoid = customAlphabet('1234567890abcdef', 10)

    const columns: Column[] = [
        { id: `${tableId}_done`, width: 100, title: "Done", type: "boolean", tableId },
        { id: `${tableId}_todo`, width: 200, isMain: true, title: "Todo", type: "string", tableId },
        { id: `${tableId}_project`, width: 100, title: "Project", type: "string", tableId },
        { id: `${tableId}_status`, width: 100, title: "Status", type: "string", tableId },
    ];
    const cellValues: Record<string, string[]> = {
        [`${tableId}_done`]: ["true", "false", "true", "false", "true"],
        [`${tableId}_todo`]: ["Buy milk", "Buy eggs", "Buy bread", "Buy cheese", "Buy wine"],
        [`${tableId}_project`]: ["Grocery", "Grocery", "Grocery", "Grocery", "Grocery"],
        [`${tableId}_status`]: ["Done", "Todo", "Todo", "Todo", "Done"],
    };
    const rowIds = Array.from({ length: 5 }, () => nanoid());
    const rows: Row[] = rowIds.map((id) => {
        return {
            id,
            tableId,
            cellData: columns.map((c) => {
                return {
                    columnId: c.id,
                    value: cellValues[c.id][rowIds.indexOf(id)],
                };
            }),
        };
    });

    return { id: tableId, columns, rows };

}

