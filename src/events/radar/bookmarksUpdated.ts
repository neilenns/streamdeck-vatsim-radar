import { Bookmark } from "@interfaces/bookmark";
import streamDeck from "@elgato/streamdeck";
import { handleAsyncException } from "@root/utils/handleAsyncException";

/**
 * Sends bookmark data to the active property inspector.
 * @param data - The bookmarks to send to the property inspector.
 */
export const handleBookmarksUpdated = (data: Bookmark[]) => {
  streamDeck.ui.current
    ?.sendToPropertyInspector({
      event: "getBookmarks",
      items: data.map((bookmark) => ({
        label: `Bookmark ${bookmark.id}`,
        value: bookmark.id,
      })),
    })
    .catch((err: unknown) => {
      handleAsyncException(
        "Error sending bookmarks to property inspector",
        err
      );
    });
};
