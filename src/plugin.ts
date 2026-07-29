import streamDeck from "@elgato/streamdeck";

import radarManager from "@managers/radar";
import { ActivateBookmark } from "@actions/activate-bookmark";
import { handleOnApplicationDidLaunch } from "@events/streamdeck/applicationDidLaunch";
import { handleOnApplicationDidTerminate } from "@events/streamdeck/applicationDidTerminate";
import { handleOnSystemDidWakeUp } from "@events/streamdeck/systemDidWakeUp";
import { handleReceivedBookmarks } from "@events/radar/receivedBookmarks";
import { Bookmark } from "@interfaces/messages";

// Register actions
streamDeck.actions.registerAction(new ActivateBookmark());

// Register event handlers
streamDeck.system.onApplicationDidLaunch(handleOnApplicationDidLaunch);
streamDeck.system.onApplicationDidTerminate(handleOnApplicationDidTerminate);
streamDeck.system.onSystemDidWakeUp(handleOnSystemDidWakeUp);

radarManager.on("received-bookmarks", (bookmarks: Bookmark[]) => {
  handleReceivedBookmarks(bookmarks);
});

// Finally, connect to the Stream Deck.
streamDeck.connect();

// Start the radar manager for now
radarManager.connect();
