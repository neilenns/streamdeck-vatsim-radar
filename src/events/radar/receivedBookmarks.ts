import streamDeck from "@elgato/streamdeck";
import { Bookmark } from "@interfaces/messages";

export function handleReceivedBookmarks(bookmarks: Bookmark[]): void {
  streamDeck.logger.info(
    `Received ${bookmarks.length} bookmarks from VATSIM Radar.`,
  );

  streamDeck.ui.sendToPropertyInspector({
    event: "get-bookmarks",
    items: bookmarks.map((bookmark) => ({ value: bookmark, label: bookmark })),
  });
}
