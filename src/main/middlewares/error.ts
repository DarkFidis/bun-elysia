import { Elysia } from "elysia";

import { log } from "../log";
import { HttpError } from "../errors/http-error";

export const errorMw = (app: Elysia) =>
  app.onError(({ request, error, set }) => {
    const { body } = request;
    const bodyLog = body ? `\n Request body: ${JSON.stringify(body)}` : "";
    if (error instanceof HttpError) {
      log.error(
        `💥 ${request.method} ${request.url} - ${error.statusCode} ${bodyLog}`,
      );
      set.status = error.statusCode;
      return {
        code: error.code,
        message: error.message,
      };
    }
    if (error.message === "NOT_FOUND") {
      set.status = 404;
      return {
        code: "NOT_FOUND",
        message: "Not Found",
      };
    } else {
      set.status = 500;
    }
    log.error(`💥 ${request.method} ${request.url} - 500 ${bodyLog}`);
    return {
      code: "INTERNAL_ERROR",
      message: error.message || "Erreur interne du serveur ⚙️",
    };
  });
