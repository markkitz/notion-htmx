

export type DbDataTable = {
    id: string;
}
export type DbColumn = {
    id: string;
    width: number;
    isMain?: boolean;
    title: string;
    type: "string"  | "dropdown" | "date" | "number" | "boolean";
    tableId: string;
};

export type DbRowData = {
    id: string;
    tableId: string;
    ordinal: number;
}
export type DbCellData = {
    columnId: string;
    rowId: string;
    value: string;
    tableId: string;
}

export function generateFakeTableData(tableId:string) : {tables: DbDataTable[], columns:DbColumn[], rows:DbRowData[], cells:DbCellData[]} {
    const tables: DbDataTable[] = [{id:tableId}];
    const columns: DbColumn[] = [
        { id: `${tableId}_done`, width: 100, title: "Done", type: "boolean", tableId },
        { id: `${tableId}_todo`, width: 200, isMain: true, title: "Todo",  type: "string", tableId },
        { id: `${tableId}_project`, width: 100, title: "Project",  type: "string", tableId },
        { id: `${tableId}_status`, width: 100, title: "Status", type: "string", tableId },
    ];
    const rows: DbRowData[] = [
        { id: `${tableId}_1`, tableId, ordinal: 1 },
        { id: `${tableId}_2`, tableId, ordinal: 2 },
        { id: `${tableId}_3`, tableId, ordinal: 3 },
    ];
    const cells: DbCellData[] = [
        { columnId: `${tableId}_done`, rowId: `${tableId}_1`, value: "true", tableId },
        { columnId: `${tableId}_todo`, rowId: `${tableId}_1`, value: "Learn React", tableId },
        { columnId: `${tableId}_project`, rowId: `${tableId}_1`, value: "Personal", tableId },
        { columnId: `${tableId}_status`, rowId: `${tableId}_1`, value: "Active", tableId },
        { columnId: `${tableId}_done`, rowId: `${tableId}_2`, value: "false", tableId },
        { columnId: `${tableId}_todo`, rowId: `${tableId}_2`, value: "Write a blog post", tableId },
        { columnId: `${tableId}_project`, rowId: `${tableId}_2`, value: "Work", tableId },
        { columnId: `${tableId}_status`, rowId: `${tableId}_2`, value: "Active", tableId },
        { columnId: `${tableId}_done`, rowId: `${tableId}_3`, value: "false", tableId },
        { columnId: `${tableId}_todo`, rowId: `${tableId}_3`, value: "Go to the gym", tableId },
        { columnId: `${tableId}_project`, rowId: `${tableId}_3`, value: "Personal", tableId },
        { columnId: `${tableId}_status`, rowId: `${tableId}_3`, value: "Active", tableId },
    ];
    return { tables, columns, rows, cells };
}