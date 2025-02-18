import { JsonValue } from "@elgato/streamdeck";

/**
 * Message sent to the plugin to get the bookmarks.
 */
export interface GetBookmarks {
  event: "getBookmarks";
  isRefresh: undefined | true;
  [key: string]: JsonValue;
}

export interface RefreshBookmarks {
  event: "refreshBookmarks";
  [key: string]: JsonValue;
}

/**
 * Union of all messages sent to the plugin.
 * @see {@link GetBookmarks} for the message to get the bookmarks.
 * @see {@link RefreshBookmarks} for the message to refresh the bookmarks.
 **/
export type SendToPluginMessage = GetBookmarks | RefreshBookmarks;

/**
 * Typeguard for GetBookmarks.
 * @param message The message.
 * @returns True if the message is a GetBookmarks message.
 */
export function isGetBookmarks(
  message: SendToPluginMessage
): message is GetBookmarks {
  return message.event === "getBookmarks";
}

/**
 * Typeguard for RefreshBookmarks.
 * @param message The message.
 * @returns True if the message is a RefreshBookmarks message.
 */
export function isRefreshBookmarks(
  message: SendToPluginMessage
): message is RefreshBookmarks {
  return message.event === "refreshBookmarks";
}
