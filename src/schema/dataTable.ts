
export type DataTable = {
    id: string;
    columns: Column[];
    rows: Row[];
}
export type Column = {
    id: string;
    width: number;
    x: number;
    isMain?: boolean;
    title: string;
    type: "string"  | "select" | "date" | "number" | "boolean";
    tableId: string;
    options?: { text:string, color:Color }[];
};
export type Row = {
    id: string;
    cellData: CellData[];
}
export type CellData = {
    columnId: string;
    value: string | null;
}

export type Color = "yellow" | "green" | "blue" | "red" | "gray" | "pink" | "orange" | "purple";