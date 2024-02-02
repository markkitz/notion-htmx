
export type DataTable = {
    id: string;
    columns: Column[];
    rows: Row[];
}
export type Column = {
    id: string;
    width: number;
    isMain?: boolean;
    title: string;
    type: "string"  | "dropdown" | "date" | "number" | "boolean";
    tableId: string;
};
export type Row = {
    id: string;
    cellData: CellData[];
}
export type CellData = {
    columnId: string;
    value: string;
}