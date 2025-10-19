import { Elysia, ElysiaCustomStatusResponse } from "elysia";
import { log } from "../log";

export const logMw = (app: Elysia) => {
  app.onAfterHandle(({ request, response, set }) => {
    if (response instanceof ElysiaCustomStatusResponse) {
      log.info(
        `✅ ${request.method} ${request.url} - ${response.code} ${JSON.stringify(response.response)}`,
      );
    } else {
      log.info(
        `✅ ${request.method} ${request.url} - ${set.status} ${JSON.stringify(response)}`,
      );
    }
  });
};
