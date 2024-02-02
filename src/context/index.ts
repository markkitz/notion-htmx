import Elysia from "elysia";
import { db } from "../db";

export const ctx = new Elysia({
    name: "@app/ctx",
})
.decorate("db", db);