import { html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import DataTable from "../components/DataTable";
import BaseHtml from "../components/BaseHtml";

export const tableController = new Elysia(
    { prefix: "/table" }
)
    .use(html())
    .get("/:id", ({ html }) => html(<DataTable/>),
        {
            params: t.Object({
                id: t.Numeric(),
            })
        });