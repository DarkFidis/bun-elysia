import { Elysia } from "elysia";

import { testRouter } from "./test";

export const router = new Elysia({ prefix: "/api" }).use(testRouter);
