import { Elysia } from "elysia";
import { db } from "../database";

export const ctx = new Elysia({
    name: "@app/ctx",
})
.decorate("db", db);