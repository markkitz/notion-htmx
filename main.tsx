import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import {staticPlugin} from "@elysiajs/static";
import Test from "./src/Test";
import { tableController } from "./src/controllers/tableController";
import { ctx } from "./src/context";
import DataTable from "./src/components/DataTable";
import BaseHTML from "./src/components/BaseHTML";
const app = new Elysia()
.use(html())
.use(staticPlugin())
.use(tableController)
.use(ctx)
.get("/", ({db}) => {
    const dt = db().getDataTable("table1");

return (<BaseHTML><DataTable dataTable={dt}/></BaseHTML>)})
.listen(3030);
console.log(`🦊 Listening on ${app.server?.hostname}: ${app.server?.port}`);