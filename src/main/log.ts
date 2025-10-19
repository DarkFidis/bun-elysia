import { Logger } from "winston";

import { config } from "./config";
import { getLogger } from "./utils/logger";

const log: Logger = getLogger(config.log.name);

export { log };
