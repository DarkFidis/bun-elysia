import { Elysia } from "elysia";

import { log } from "../log";
import { HttpError } from "../errors/http-error";

export const errorMw = (app: Elysia) =>
  app.onError(({ body, headers, params, query, request, error, set }) => {
    if (error instanceof HttpError) {
      log.error(
        `💥 ${request.method} ${request.url} - ${error.statusCode} \n${JSON.stringify({ body, headers, params, query }, null, 2)}`,
      );
      set.status = error.statusCode;
      return {
        code: error.code,
        message: error.message,
      };
    }
    if (error.code === "VALIDATION") {
      set.status = 400;
      return {
        code: "BAD_REQUEST",
        message: `Invalid ${error.type} property`,
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
    log.error(
      `💥 ${request.method} ${request.url} - 500 \n${JSON.stringify({ body, params, query }, null, 2)}`,
    );
    return {
      code: "INTERNAL_ERROR",
      message: error.message || "Erreur interne du serveur ⚙️",
    };
  });
