import { Elysia } from "elysia";
import {UnauthorizedError} from "../errors/unauthorized-error";

export const authMw = (app: Elysia) =>
  app.onBeforeHandle(({ request, set }) => {
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== "super-secret-key") {
      throw new UnauthorizedError();
    }
  });
