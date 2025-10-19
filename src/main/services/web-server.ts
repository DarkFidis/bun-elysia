import { Logger } from "winston";

import { errorMw } from "../middlewares/error";
import {
  StaticWebServerable,
  WebServerable,
  WebServerConfig,
} from "../types/web-server";
import { staticImplements } from "../utils/helper";
import { ServiceBase } from "./service-base";
import { Elysia } from "elysia";
import { logMw } from "../middlewares/log";

@staticImplements<StaticWebServerable>()
export class WebServer
  extends ServiceBase<WebServerConfig>
  implements WebServerable
{
  public static readonly defaultConfig: WebServerConfig = {
    hsts: 31536000,
    listen: { host: "0.0.0.0", port: 3111 },
    log: true,
    ping: true,
  };
  protected _app?: Elysia;
  protected _url?: string;
  protected _router?: Elysia;

  constructor(log: Logger, router: Elysia) {
    super("web-server", log, WebServer.defaultConfig);
    this._router = router;
  }

  public get app() {
    return this._app;
  }

  public get log(): Logger {
    return this._log;
  }

  public get url(): string | undefined {
    return this._url;
  }

  public get router(): Elysia | undefined {
    return this._router;
  }

  public async end(): Promise<boolean> {
    if (!this.app) {
      return false;
    }
    this.log.info("Closing server ...");
    await this.app.stop();
    return true;
  }

  public init(opt?: Partial<WebServerConfig>): void {
    super.init(opt);
    // TODO : HTTPS
    const app = new Elysia();
    this._app = app;
    this.registerErrorMw(app);
    this.registerMw(app);
  }

  public async run(): Promise<boolean> {
    if (!this.app) {
      return false;
    }
    await this.app.listen(this.config.listen);
    this.log.info(
      `Server listening on ${this.app.server?.hostname}:${this.app.server?.port}`,
    );
    return true;
  }

  public registerMw(app): void {
    this.registerPingMw(app);
    this.registerLogMw(app);
    this.registerPoweredByMw(app);
    this.registerHstsMw(app);
    this.registerRoutes(app);
  }

  public registerErrorMw(app): void {
    app.use(errorMw);
  }

  public registerLogMw(app): void {
    app.use(logMw);
  }

  public registerPingMw(app): void {
    if (!this.config.ping) {
      return;
    }
    app.get("/ping", ({ status }) => {
      return status(204);
    });
  }

  public registerPoweredByMw(app): void {
    app.onRequest(({ set }) => {
      set.headers["X-Powered-By"] = "Elysia template";
    });
  }

  private registerHstsMw(app): void {
    app.onRequest(({ set }) => {
      set.headers["Strict-Transport-Security"] =
        `max-age=${this.config.hsts}; includeSubDomains`;
    });
  }

  public registerRoutes(app): void {
    app.use(this.router);
  }
}
