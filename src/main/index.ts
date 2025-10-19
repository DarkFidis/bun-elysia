import "reflect-metadata";

import { log } from "./log";
import { worker } from "./worker";

worker.run().catch((err) => {
  log.error(err);
  process.exit(1);
});
