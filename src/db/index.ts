import { customAlphabet } from "nanoid";
import type { Color, Column, DataTable, Row } from "../schema/dataTable";
import { selectColors } from "../components/cells/Chip";


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
        addColumnOption: (tableId: string, columnId: string, value: string): {text:string, color:Color} => {
            const table = _dbTables.find((t) => t.id === tableId);
            if (!table) {
                throw new Error(`Table with id ${tableId} not found`);
            }
            const column = table.columns.find((c) => c.id === columnId);
            if (!column) {
                throw new Error(`Column with id ${columnId} not found`);
            }
            if (!column.options) {
                column.options = [];
            }
            // check if value already exists
            const option = column.options.find((option) => option.text === value);
            if (!option) {
                const randomColor = Object.keys(selectColors)[Math.floor(Math.random() * Object.keys(selectColors).length)] as keyof(typeof selectColors);               

                column.options.push({ text: value, color: randomColor });
                return {text: value, color: randomColor};

            }
            return option;
        },
        addRow: (tableId: string): Row => {
            const table = _dbTables.find((t) => t.id === tableId);
            if (!table) {
                throw new Error(`Table with id ${tableId} not found`);
            }
            const nanoid = customAlphabet('1234567890abcdef', 10);
            const rowId = nanoid();
            const newRow: Row = {
                id: rowId,
                cellData: table.columns.map((c) => {
                    return {
                        columnId: c.id,
                        value: null,
                    };
                }),
            };            
            table.rows.push(newRow);
            return newRow;
        },
        deleteRow: (tableId: string, rowId: string): void => {
            const table = _dbTables.find((t) => t.id === tableId);
            if (!table) {
                throw new Error(`Table with id ${tableId} not found`);
            }
            const rowIdx = table.rows.findIndex((r) => r.id === rowId);
            if (rowIdx === -1) {
                throw new Error(`Row with id ${rowId} not found`);
            }
            table.rows.splice(rowIdx, 1);
        },
        duplicateRow: (tableId: string, rowId: string): Row => {
            const table = _dbTables.find((t) => t.id === tableId);
            if (!table) {
                throw new Error(`Table with id ${tableId} not found`);
            }
            const row = table.rows.find((r) => r.id === rowId);
            if (!row) {
                throw new Error(`Row with id ${rowId} not found`);
            }
            const nanoid = customAlphabet('1234567890abcdef', 10);
            const newRowId = nanoid();
            const newRow: Row = {
                id: newRowId,
                cellData: row.cellData.map((c) => {
                    return {
                        columnId: c.columnId,
                        value: c.value,
                    };
                }),
            };
            table.rows.push(newRow);
            return newRow;
        }
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

