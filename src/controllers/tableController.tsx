import { html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import DataTable from "../components/DataTable";
import BaseHtml from "../components/BaseHtml";
import { ctx } from "../context";
import Cell from "../components/cells/Cell";

export const tableController = new Elysia(
    { prefix: "/table" }
)
    .use(html())
    .use(ctx)
    .get("/:id", ({ html, db, params }) => html(<DataTable dataTable={db().getDataTable(params.id)} />),
        {
            params: t.Object({
                id: t.String(),
            })
        })
    .patch("/:tableId/rows/:rowId/cells/:columnId", ({ params, body, db }) => {
        
        db().setCellData(params.tableId, params.rowId, params.columnId, body.value);
        const column = db().getDataTable(params.tableId).columns.find((column) => column.id === params.columnId);
        if(!column) throw new Error("Column not found");
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

    );