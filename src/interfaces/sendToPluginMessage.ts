import { JsonValue } from "@elgato/streamdeck";

/**
 * Message sent to the plugin to get the bookmarks.
 */
export interface GetBookmarks {
  event: "getBookmarks";
  isRefresh: undefined | true;
  [key: string]: JsonValue;
}

/**
 * Union of all messages sent to the plugin.
 * @see {@link GetBookmarks} for the message to get the bookmarks.
 **/
export type SendToPluginMessage = GetBookmarks;

/**
 * Typeguard for GetBookmarks.
 * @param message The message.
 * @returns True if the message is a GetBookmarks message.
 */
export function isGetBookmarks(
  message: SendToPluginMessage
): message is GetBookmarks {
  // Disabled since at the moment this is technically an unnecessary test since SendToPluginMessage can only
  // ever be one type. However, this is a good example of how to use a typeguard. This will be useful if
  // more types are added to SendToPluginMessage in the future.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return message.event === "getBookmarks";
}
