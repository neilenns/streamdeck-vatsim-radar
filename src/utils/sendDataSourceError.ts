import streamDeck from "@elgato/streamdeck";
import { handleAsyncException } from "./handleAsyncException";
import { EventName, GetBookmarksResult } from "@interfaces/streamDeckMessages";

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
  event: EventName.GetBookmarks,
  items: [
    {
      label: message,
      value: "error" as const,
      disabled: true,
    },
  ],
});
