import {Elysia} from "elysia";
import {html} from "@elysiajs/html";
import { staticPlugin } from '@elysiajs/static'

import { tableController } from "./src/controllers/tableController";
import BaseHtml from "./src/components/BaseHtml";
import DataTable from "./src/components/DataTable";
import { ctx } from "./src/context";

const app = new Elysia()
.use(html())
.use(ctx)
.use(tableController)
.use(staticPlugin())
.get("/", ({html, db}) =>{    
    const dt = db().getDataTable("table1");
    return html(<BaseHtml><DataTable dataTable={dt}/></BaseHtml>);
})

.listen(3030);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);


