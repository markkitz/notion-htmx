import { html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import DataTable from "../components/DataTable";
import { ctx } from "../context";
import Cell from "../components/cells/Cell";
import CellStringEditor from "../components/cells/CellStringEditor";

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
        
    .patch("/:tableId/:rowId/:columnId", ({ params, body, db }) => {

        db().setCellData(params.tableId, params.rowId, params.columnId, body.value);
        const column = db().getDataTable(params.tableId).columns.find((column) => column.id === params.columnId);
        if (!column) throw new Error("Column not found");
        return (<Cell rowId={params.rowId} column={column} cellData={body.value} />);

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
        }

    )
    .get("/:tableId/:rowId/:columnId/edit", ({ params, body, db }) => {


        const dataTable = db().getDataTable(params.tableId);
        const column = dataTable.columns.find((column) => column.id === params.columnId);
        const row = dataTable.rows.find((row) => row.id === params.rowId);
        const cellData = row?.cellData.find((cell) => cell.columnId === params.columnId)?.value;
        if (!column) throw new Error("Column not found");
        if (!row) throw new Error("Row not found");
        return(<CellStringEditor column={column} rowId={params.rowId} cellData={cellData || ""}  />)

    }, 
    {
        params: t.Object({
            tableId: t.String(),
            rowId: t.String(),
            columnId: t.String()
        })
    }
    );