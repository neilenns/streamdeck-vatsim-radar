import streamDeck from "@elgato/streamdeck";
import mainLogger from "@utils/logger";

import { ActivateBookmark } from "@actions/activateBookmark";

const logger = mainLogger.child({ service: "plugin" });

// Register for uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
});

// Register the actions.
streamDeck.actions.registerAction(new ActivateBookmark());

// Finally, connect to the Stream Deck.
streamDeck
  .connect()
  .then(() => {
    logger.info("Plugin started");
  })
  .catch((err: unknown) => {
    logger.error("Error connecting to streamdeck:", err);
  });
