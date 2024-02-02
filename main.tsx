import {Elysia} from "elysia";
import {html} from "@elysiajs/html";
import { staticPlugin } from '@elysiajs/static'
import * as elements from "typed-html";
import Test from "./src/components/Test";

const app = new Elysia()
.use(html())
.use(staticPlugin())
.get("/", ({html}) => html(<BaseHTML>Hello</BaseHTML>))
.get("/about", ({html}) => html(<Test />))

.listen(3030);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);


const BaseHTML = ({children}: elements.Children) => {
  return (
    <html lang="en">
      <head>
        <title>My App🦊</title>
        <link rel="stylesheet" href="/public/dist/unocss.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css" />
      </head>
      <body>
        <h1 class="text-4xl">Hello World</h1>
        {children}
        <button hx-get="/about" hx-swap="outerHTML">About</button>
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      </body>
    </html>
  );
}