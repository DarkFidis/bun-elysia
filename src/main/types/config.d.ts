export interface LogConfig {
  level: string;
  name: string;
}

export interface JWTConfig {
  tokenSecret: string;
  sessionDuration: number;
}

export interface Config {
  jwt: JWTConfig;
  log: LogConfig;
}
