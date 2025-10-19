import { Elysia } from "elysia";
import { z } from "zod";

import { TeapotError } from "../errors/im-a-teapot.error";

export const testRouter = new Elysia({ prefix: "/test" })
  .get("/query", ({ query: { action } }) => {
    if (action === "toto") {
      throw new TeapotError();
    }
    return { action };
  })
  .get("/body", ({ status }) => {
    return status(200, { message: "Hello World!" });
  })
  .post(
    "/body",
    ({ body: { foo }, set }) => {
      if (foo === "baz") {
        throw new TeapotError();
      }
      set.status = 201;
      return { body: foo };
    },
    {
      body: z.object({
        foo: z.string(),
      }),
    },
  )
  .get(
    "/request/:param",
    ({ params, query, body, headers, url, ...others }) => {
      return {
        url,
        body,
        headers,
        params,
        query,
        others,
      };
    },
    {
      params: z.object({
        param: z.string(),
      }),
      query: z.object({
        foo: z.string(),
      }),
    },
  );
