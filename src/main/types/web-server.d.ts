import { FastifyInstance, RouteOptions } from "fastify";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import { ServerOptions } from "https";
import { Logger } from "winston";

import { Serviceable } from "./service";
import { AddressInfo } from "net";
import { Elysia } from "elysia";

export interface WebServerConfig {
  name?: string;
  version?: string;
  baseUrl?: string | null;
  listen: WebServerConfigListen;
  log?: boolean;
  ping?: boolean;
  proxy?: WebServerConfigProxy;
  serverOptions?: ServerOptions;
  hsts: number;
  staticDir?: string;
}

export interface WebServerConfigListen {
  port?: number;
  host?: string;
  path?: string;
}

export interface WebServerConfigProxy {
  username?: string;
  pass?: string;
  address: string;
  port: number;
  protocol?: "http" | "https";
}

export interface StaticWebServerable {
  defaultConfig: WebServerConfig;

  new (log: Logger, routes: RouteOptions[]): WebServerable;
}

export interface WebServerable extends Serviceable<WebServerConfig> {
  readonly app?: Elysia;
  readonly url?: string;
  readonly router?: Elysia;
  registerMw(app: Elysia): void;
  registerErrorMw(app: Elysia): void;
  registerPingMw(app: Elysia): void;
}
