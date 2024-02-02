import {Elysia} from "elysia";
import {html} from "@elysiajs/html";
import { staticPlugin } from '@elysiajs/static'

import Test from "./src/components/Test";
import { tableController } from "./src/controllers/tableController";
import BaseHtml from "./src/components/BaseHtml";
import DataTable from "./src/components/DataTable";

const app = new Elysia()
.use(html())
.use(tableController)
.use(staticPlugin())
.get("/", ({html}) => html(<BaseHtml><DataTable/></BaseHtml>))
.get("/about", ({html}) => html(<Test />))

.listen(3030);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);


