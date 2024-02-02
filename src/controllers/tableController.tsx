import { html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import DataTable from "../components/DataTable";
import BaseHtml from "../components/BaseHtml";
import { ctx } from "../context";

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
        });