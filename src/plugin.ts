import streamDeck from "@elgato/streamdeck";

import radarManager from "@managers/radar";
import { IncrementCounter } from "@actions/increment-counter";
import { ActivateBookmark } from "@actions/activate-bookmark";
import { handleOnApplicationDidLaunch } from "@events/streamdeck/applicationDidLaunch";
import { handleOnApplicationDidTerminate } from "@events/streamdeck/applicationDidTerminate";
import { handleOnSystemDidWakeUp } from "@events/streamdeck/systemDidWakeUp";
import { handleReceivedBookmarks } from "@events/radar/receivedBookmarks";
import { Bookmark } from "@interfaces/messages";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel("trace");

// Register the increment action.
streamDeck.actions.registerAction(new IncrementCounter());
streamDeck.actions.registerAction(new ActivateBookmark());

// Register event handlers
streamDeck.system.onApplicationDidLaunch(handleOnApplicationDidLaunch);
streamDeck.system.onApplicationDidTerminate(handleOnApplicationDidTerminate);
streamDeck.system.onSystemDidWakeUp(handleOnSystemDidWakeUp);

radarManager.on("received-bookmarks", (bookmarks: Bookmark[]) =>
  handleReceivedBookmarks(bookmarks),
);

// Finally, connect to the Stream Deck.
streamDeck.connect();

// Start the radar manager for now
radarManager.connect();
