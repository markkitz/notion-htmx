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

        },
        setCellData: (tableId: string, rowId: string, columnId: string, value: string | null): void => {
            const table = _dbTables.find((t) => t.id === tableId);
            if (!table) {
                throw new Error(`Table with id ${tableId} not found`);
            }
            const row = table.rows.find((r) => r.id === rowId);
            if (!row) {
                throw new Error(`Row with id ${rowId} not found`);
            }
            const cell = row.cellData.find((c) => c.columnId === columnId);
            if (!cell) {
                throw new Error(`Column with id ${columnId} not found`);
            }
            cell.value = value;
        },
    }
}

export function generateFakeTableData(tableId: string): DataTable {

    const nanoid = customAlphabet('1234567890abcdef', 10)

    const columns: Column[] = [
        { id: `${tableId}_done`, width: 100, title: "Done", type: "boolean", tableId },
        { id: `${tableId}_todo`, width: 200, isMain: true, title: "Todo", type: "string", tableId },
        { id: `${tableId}_project`, width: 100, title: "Project", type: "select", tableId, options: [{ text: "Grocery", color: "yellow" }, { text: "Family", color: "green" }, { text: "Health", color: "blue" }]},
        { id: `${tableId}_status`, width: 100, title: "Status", type: "select", tableId, options: [{ text: "Today", color: "green" }, { text: "Tomorrow", color: "blue" }, { text: "Later", color: "gray" }]}
    ];
    const cellValues: Record<string, (string | null)[]> = {
        [`${tableId}_done`]: ["true", "false", "true", "false", "false", "false"],
        [`${tableId}_todo`]: ["Buy milk", "Buy eggs", "Buy bread", "Buy cheese", "Visit Mom", "Workout"],
        [`${tableId}_project`]: ["Grocery", "Grocery", "Grocery", "Grocery", "Family", "Health"],
        [`${tableId}_status`]: ["Today", "Today", "Today", null, "Tomorrow", "Tomorrow"],
    };
    const rowIds = Array.from({ length: 6 }, () => nanoid());
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

