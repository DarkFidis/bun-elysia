import { log } from "./log";
import { WebServer } from "./services/web-server";
import { WebServerable } from "./types/web-server";
import { router } from "./routes";

const webServer: WebServerable = new WebServer(log, router);

export { webServer };
