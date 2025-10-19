import { Elysia } from "elysia";
import { z } from "zod";

import { bodyMw, queryMw, requestMw } from "../middlewares/test";

export const testRouter = new Elysia({ prefix: "/test" })
  .get("/query", queryMw)
  .post("/body", bodyMw, {
    body: z.object({
      foo: z.string(),
    }),
  })
  .get("/request/:param", requestMw, {
    params: z.object({
      param: z.string(),
    }),
    query: z.object({
      foo: z.string(),
    }),
  });
