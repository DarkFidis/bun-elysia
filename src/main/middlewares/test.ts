import { TeapotError } from "../errors/im-a-teapot.error";

export const queryMw = ({ query: { action } }) => {
  if (action === "toto") {
    throw new TeapotError();
  }
  return { action };
};

export const bodyMw = ({ body: { foo }, set }) => {
  if (foo === "baz") {
    throw new TeapotError();
  }
  set.status = 201;
  return { body: foo };
};

export const requestMw = ({ params, query, body, headers, url, ...others }) => {
  return {
    url,
    body,
    headers,
    params,
    query,
    others,
  };
};
