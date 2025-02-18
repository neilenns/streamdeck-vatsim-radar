import streamDeck from "@elgato/streamdeck";
import mainLogger from "@utils/logger";

import { ActivateBookmark } from "@actions/activateBookmark";
import radarManagerInstance from "@managers/radar";
import { handleBookmarksUpdated } from "./events/radar/bookmarksUpdated";
import { handleAsyncException } from "./utils/handleAsyncException";

const logger = mainLogger.child({ service: "plugin" });

// Register for uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
});

// Register the actions.
streamDeck.actions.registerAction(new ActivateBookmark());

// Register event handlers
radarManagerInstance.on("bookmarksUpdated", handleBookmarksUpdated);

// Clean up event listeners when the plugin is stopped
streamDeck.on("willDisappear", () => {
  radarManagerInstance.off("bookmarksUpdated", handleBookmarksUpdated);
});

// Finally, connect to the Stream Deck.
streamDeck
  .connect()
  .then(() => {
    logger.info("Plugin started");
  })
  .catch((err: unknown) => {
    handleAsyncException("Error connecting to Stream Deck", err);
  });
