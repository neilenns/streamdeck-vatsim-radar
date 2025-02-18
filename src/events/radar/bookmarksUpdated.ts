import { Bookmark } from "@interfaces/bookmark";
import streamDeck from "@elgato/streamdeck";
import { handleAsyncException } from "@root/utils/handleAsyncException";
import { Item } from "@interfaces/sendToPropertyInspectorMessage";
import { GetBookmarksEvent } from "@interfaces/events";

/**
 * Sends bookmark data to the active property inspector.
 * @param data - The bookmarks to send to the property inspector.
 */
export const handleBookmarksUpdated = (data: Bookmark[]) => {
  streamDeck.ui.current
    ?.sendToPropertyInspector({
      event: "getBookmarks" as GetBookmarksEvent,
      items: data.map(
        (bookmark): Item => ({
          label: `Bookmark ${bookmark.id}`,
          value: bookmark.id,
        })
      ),
    })
    .catch((err: unknown) => {
      handleAsyncException(
        "Error sending bookmarks to property inspector",
        err
      );
    });
};
