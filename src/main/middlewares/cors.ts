import { Elysia } from "elysia";

export const corsMw = (app: Elysia) =>
  app.onRequest(({ request, set }) => {
    set.headers["Access-Control-Allow-Origin"] = "*";
    set.headers["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, OPTIONS";
    set.headers["Access-Control-Allow-Headers"] = "Content-Type, x-api-key";

    // Répondre directement aux requêtes OPTIONS
    if (request.method === "OPTIONS") {
      set.status = 204;
      return "";
    }
  });
