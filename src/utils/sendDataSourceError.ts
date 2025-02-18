import { GetBookmarksResult } from "@interfaces/sendToPropertyInspectorMessage";
import streamDeck from "@elgato/streamdeck";
import { handleAsyncException } from "./handleAsyncException";

export const sendDataSourceError = (message: string) => {
  streamDeck.ui.current
    ?.sendToPropertyInspector({
      event: "getBookmarks",
      items: [
        {
          label: message,
          value: "error",
          disabled: true,
        },
      ],
    } as GetBookmarksResult)
    .catch((err: unknown) => {
      handleAsyncException(
        `Error sending message ${message} to property inspector data source`,
        err
      );
    });
};
