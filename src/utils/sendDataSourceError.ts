import { GetBookmarksResult } from "@interfaces/sendToPropertyInspectorMessage";
import streamDeck from "@elgato/streamdeck";
import { handleAsyncException } from "./handleAsyncException";

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
  event: "getBookmarks",
  items: [
    {
      label: message,
      value: "error" as const,
      disabled: true,
    },
  ],
});
