import { FastifyReply, FastifyRequest } from "fastify";

import { Modify } from "./helper";

export interface ErrorMw {
  defaultCode: string;
  defaultMessage: string;

  errorMw: ErrorRequestHandler;
}

export type ErrorRequestHandler = (
  err: RichError,
  req: FastifyRequest,
  res: FastifyReply,
) => Promise<void>;

export interface ErrorData {
  code: string;
  message: string;
  errors?: string[];
}

export type RequestAsyncHandler = (
  req: FastifyRequest,
  res: FastifyReply,
) => Promise<void> | void;

export interface RichError extends Modify<Error, { message?: string }> {
  code?: string;
  statusCode?: number;
  orig?: Error & { errors?: string[] };
  extra?: unknown;
}
