import { Elysia } from "elysia";

export const authMw = (app: Elysia) =>
  app.onBeforeHandle(({ request, set }) => {
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== "super-secret-key") {
      set.status = 401;
      return { error: "Unauthorized 🚫" };
    }
  });
