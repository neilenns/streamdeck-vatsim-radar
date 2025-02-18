import { GetBookmarksResult } from "@interfaces/sendToPropertyInspectorMessage";
import streamDeck from "@elgato/streamdeck";
import { handleAsyncException } from "./handleAsyncException";
import { GetBookmarksEvent } from "@interfaces/events";

export const sendDataSourceError = (message: string) => {
  streamDeck.ui.current
    ?.sendToPropertyInspector(createErrorMessage(message))
    .catch((err: unknown) => {
      handleAsyncException(
        `Error sending message ${message} to property inspector data source`,
        err
      );
    });
};

const createErrorMessage = (message: string): GetBookmarksResult => ({
  event: "getBookmarks" as GetBookmarksEvent,
  items: [
    {
      label: message,
      value: "error" as const,
      disabled: true,
    },
  ],
});
