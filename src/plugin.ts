import streamDeck from "@elgato/streamdeck";

import radarManager from "@managers/radar";
import { ActivateBookmark } from "@actions/activate-bookmark";
import { handleOnApplicationDidLaunch } from "@events/streamdeck/applicationDidLaunch";
import { handleOnApplicationDidTerminate } from "@events/streamdeck/applicationDidTerminate";
import { handleOnSystemDidWakeUp } from "@events/streamdeck/systemDidWakeUp";
import { handleReceivedBookmarks } from "@events/radar/receivedBookmarks";
import { Bookmark, Dashboard } from "@interfaces/messages";
import { handleReceivedDashboards } from "@events/radar/receivedDashboards";
import { ActivateDashboard } from "@actions/activate-dashboard";

// Register actions
streamDeck.actions.registerAction(new ActivateBookmark());
streamDeck.actions.registerAction(new ActivateDashboard());

// Register event handlers
streamDeck.system.onApplicationDidLaunch(handleOnApplicationDidLaunch);
streamDeck.system.onApplicationDidTerminate(handleOnApplicationDidTerminate);
streamDeck.system.onSystemDidWakeUp(handleOnSystemDidWakeUp);

radarManager.on("received-bookmarks", (bookmarks: Bookmark[]) => {
  handleReceivedBookmarks(bookmarks);
});

radarManager.on("received-dashboards", (dashboards: Dashboard[]) => {
  handleReceivedDashboards(dashboards);
});

// Finally, connect to the Stream Deck.
streamDeck.connect();

// Start the radar manager for now
radarManager.connect();
