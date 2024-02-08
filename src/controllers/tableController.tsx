import { html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import DataTable from "../components/DataTable";
import { ctx } from "../context";
import Cell from "../components/cells/Cell";
import CellStringEditor from "../components/cells/CellStringEditor";
import CellSelectEditor, { ChipEditor } from "../components/cells/CellSelectEditor";
import type { Column, DataTable as DataTableType } from "../schema/dataTable";
import TableRow from "../components/TableRow";
import RowMenu from "../components/RowMenu";

export const tableController = new Elysia(
    { prefix: "/table" }
)
    .use(html())
    .use(ctx)
    .get("/:tableId", ({ html, db, params }) => html(<DataTable dataTable={db().getDataTable(params.tableId)} />),
        {
            params: t.Object({
                tableId: t.String(),
            })
        })
    .post("/:tableId/row", ({ params, db }) => {
        const row = db().addRow(params.tableId);
        const columns = db().getDataTable(params.tableId).columns;
        //get first string column
        const firstStringColumn = columns.find((column) => column.type === "string");
        return (<TableRow row={row} columns={columns} editColumnId={firstStringColumn?.id} tableId={params.tableId} />);
    },
        {
            params: t.Object({
                tableId: t.String(),
            })
        })
    .delete("/:tableId/:rowId", ({ params, db, set }) => {
        db().deleteRow(params.tableId, params.rowId);
        set.status = 204;
        return;
    }
        ,
        {
            params: t.Object({
                tableId: t.String(),
                rowId: t.String()
            })
        })
    .patch("/:tableId/:rowId/:columnId", ({ params, body, db }) => {
        const value = !body.value || body.value === "null" || body.value.trim().length === 0 ? null : body.value;

        db().setCellData(params.tableId, params.rowId, params.columnId, value);
        const column = db().getDataTable(params.tableId).columns.find((column) => column.id === params.columnId);
        if (!column) throw new Error("Column not found");
        return (<Cell rowId={params.rowId} column={column} cellData={value} />);

    },
        {
            params: t.Object({
                tableId: t.String(),
                rowId: t.String(),
                columnId: t.String()
            }),
            body: t.Object({
                value: t.Nullable(t.String())
            })
        })
    .delete("/:tableId/:rowId/:columnId/chip", ({ params, db }) => {
        db().setCellData(params.tableId, params.rowId, params.columnId, null);
        const column = db().getDataTable(params.tableId).columns.find((column) => column.id === params.columnId);
        if (!column) throw new Error("Column not found");
        return (<ChipEditor rowId={params.rowId} color="gray" text={null} column={column} />);
    },
        {
            params: t.Object({
                tableId: t.String(),
                rowId: t.String(),
                columnId: t.String()
            })
        })
    .post("/:tableId/:rowId/:columnId/chip", ({ params, body, db }) => {
        const value = body.value;
        db().setCellData(params.tableId, params.rowId, params.columnId, value);
        const column = db().getDataTable(params.tableId).columns.find((column) => column.id === params.columnId);
        if (!column) throw new Error("Column not found");
        // add value to options if not exists
        let option = db().addColumnOption(params.tableId, params.columnId, value);
        if (!option) {
            option = db().addColumnOption(params.tableId, params.columnId, value);
        }
        return (<ChipEditor rowId={params.rowId} color={option.color} text={option.text} column={column} />);
    },
        {
            params: t.Object({
                tableId: t.String(),
                rowId: t.String(),
                columnId: t.String()
            }),
            body: t.Object({
                value: t.String()
            })
        })
    .get("/:tableId/:rowId/:columnId", ({ params, db }) => {
        const { column, row, cellData } = getColumnRowCellDataForDataTable(db().getDataTable(params.tableId), params.rowId, params.columnId);
        return (<Cell rowId={params.rowId} column={column} cellData={cellData || ""} />);
    },
        {
            params: t.Object({
                tableId: t.String(),
                rowId: t.String(),
                columnId: t.String()
            })
        }
    )
    .get("/:tableId/:rowId/:columnId/edit", ({ params, body, db }) => {

        const { column, row, cellData } = getColumnRowCellDataForDataTable(db().getDataTable(params.tableId), params.rowId, params.columnId);

        if (!column) throw new Error("Column not found");
        if (!row) throw new Error("Row not found");
        if (column.type === "string")
            return (<CellStringEditor column={column} rowId={params.rowId} cellData={cellData || ""} />)
        if (column.type === "select")
            return (<CellSelectEditor column={column} rowId={params.rowId} cellData={cellData || ""} />)

        throw new Error("Invalid column type");
    },
        {
            params: t.Object({
                tableId: t.String(),
                rowId: t.String(),
                columnId: t.String()
            })
        }
    )
    .get("/:tableId/:rowId/row-menu", ({ params, db }) => {
        const table = db().getDataTable(params.tableId);
        const row = table.rows.find((row) => row.id === params.rowId);
        if (!row) throw new Error("Row not found");
        return (<RowMenu rowId={params.rowId} tableId={params.tableId} isOpen={true} />);
    },
        {
            params: t.Object({
                tableId: t.String(),
                rowId: t.String()
            })
        }
    )
    .delete("/:tableId/:rowId/row-menu", ({ params, db }) => {
        const table = db().getDataTable(params.tableId);
        const row = table.rows.find((row) => row.id === params.rowId);
        if (!row) throw new Error("Row not found");
        return (<RowMenu rowId={params.rowId} tableId={params.tableId} isOpen={false} />);
    },
        {
            params: t.Object({
                tableId: t.String(),
                rowId: t.String()
            })
        }
    )
    .post("/:tableId/:rowId/duplicate", ({ params, db }) => {

        const newRow = db().duplicateRow(params.tableId, params.rowId);
        const dataTable = db().getDataTable(params.tableId);
        const columns = dataTable.columns;
        const oldRow = dataTable.rows.find((row) => row.id === params.rowId);
        //get first string column
        const firstStringColumn = columns.find((column) => column.type === "string");
        if (!oldRow || !newRow) throw new Error("Row not found");
        return (<>
            <TableRow row={oldRow} columns={columns} tableId={params.tableId} />
            <TableRow row={newRow} columns={columns} tableId={params.tableId} />
        </>);
    })
    .post("/:tableId/sort", ({ params, db, body }) => {
        const table = db().sortRows(params.tableId, body.item);

        return <>{table.rows.map(r => <TableRow row={r} columns={table.columns} tableId={table.id} />)}</>
    },
    {
        params: t.Object({
            tableId: t.String(),
        }),
        body: t.Object({
            item: t.Array(t.String())
        })

    }
    )
    .post("/:tableId/column-resize", ({ params, db, body }) => {


        const _columns = db().getDataTable(params.tableId).columns;
        console.log(body.columns)
        const columns = body.columns.map((c:string) =>  {
            const colNew: Column = JSON.parse(c);
            const tempColumn = _columns.find((c) => colNew.id == c.id);
            return ({...tempColumn, ...colNew})
        });
        const dataTable = db().updateColumns(params.tableId, columns);
        return (<DataTable dataTable={dataTable}  />);
    },
    {
        params: t.Object({
            tableId: t.String(),
        }),
        body: t.Object({
            columns: t.Array(t.String())
        })
    }
    
    )
    
    ;

function getColumnRowCellDataForDataTable(dataTable: DataTableType, rowId: string, columnId: string) {
    const column = dataTable.columns.find((column) => column.id === columnId);
    const row = dataTable.rows.find((row) => row.id === rowId);
    const cellData = row?.cellData.find((cell) => cell.columnId === columnId)?.value;
    if (!column) throw new Error("Column not found");
    if (!row) throw new Error("Row not found");
    return { column, row, cellData };
}