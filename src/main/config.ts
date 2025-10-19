import nodeConfig from "config";

import { Config } from "./types/config";

const log = nodeConfig.has("log")
  ? nodeConfig.get<Partial<Config["log"]>>("log")
  : { level: "debug", name: "Elysia template" };

const jwt = nodeConfig.has("jwt")
  ? nodeConfig.get<Partial<Config["jwt"]>>("jwt")
  : {
      tokenSecret: "thisissecretdev",
      sessionDuration: 86400,
    };

export const config: Config = {
  jwt,
  log,
};
