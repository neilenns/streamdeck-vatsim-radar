import streamDeck from "@elgato/streamdeck";
import { Bookmark } from "@interfaces/messages";

export function handleReceivedBookmarks(bookmarks?: Bookmark[]): void {
  if (!bookmarks) return;

  const items = bookmarks.map((bookmark) => ({
    label: bookmark,
    value: bookmark,
  }));

  streamDeck.ui.sendToPropertyInspector({
    event: "get-bookmarks",
    items,
  });
}
