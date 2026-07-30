import streamDeck from "@elgato/streamdeck";
import { Bookmark } from "@interfaces/messages";

export function handleReceivedBookmarks(bookmarks?: Bookmark[]): void {
  if (!bookmarks) return;

  const items = bookmarks
    .sort((a, b) => a.order - b.order)
    .map((bookmark) => ({
      label: bookmark.label,
      value: bookmark.id,
    }));

  streamDeck.ui.sendToPropertyInspector({
    event: "get-bookmarks",
    items,
  });
}
