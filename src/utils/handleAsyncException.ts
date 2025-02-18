import mainLogger from "@utils/logger";

const logger = mainLogger.child({ service: "system" });

/**
 * Logs an asynchronous exception.
 * @param preamble - The preamble to the error message.
 * @param error - The error to log.
 */
export const handleAsyncException = (preamble: string, error: unknown) => {
  const err = error as Error;
  logger.error(`${preamble}${err.message}`);
};
