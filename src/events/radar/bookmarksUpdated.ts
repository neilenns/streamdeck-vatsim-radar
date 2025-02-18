import { Bookmark } from "@interfaces/bookmark";
import streamDeck from "@elgato/streamdeck";
import { handleAsyncException } from "@root/utils/handleAsyncException";
import { EventName, Item } from "@interfaces/streamDeckMessages";

/**
 * Sends bookmark data to the active property inspector.
 * @param data - The bookmarks to send to the property inspector.
 */
export const handleBookmarksUpdated = (data: Bookmark[]) => {
  streamDeck.ui.current
    ?.sendToPropertyInspector({
      event: EventName.GetBookmarks,
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
