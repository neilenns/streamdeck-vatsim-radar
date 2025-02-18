import { JsonValue } from "@elgato/streamdeck";

/**
 * Message sent to the plugin to get the bookmarks.
 */
export interface GetBookmarksRequest {
  event: "getBookmarks";
  isRefresh: undefined | true;
  [key: string]: JsonValue;
}

/**
 * Message sent to the plugin to refresh the bookmarks.
 */
export interface RefreshBookmarksRequest {
  event: "refreshBookmarks";
  [key: string]: JsonValue;
}

/**
 * Message sent to the plugin to open the API token website.
 */
export interface OpenApiTokenWebsite {
  event: "openApiTokenWebsite";
  [key: string]: JsonValue;
}

/**
 * Union of all messages sent to the plugin.
 * @see {@link GetBookmarksRequest} for the message to get the bookmarks.
 * @see {@link RefreshBookmarksRequest} for the message to refresh the bookmarks.
 * @see {@link OpenApiTokenWebsite} for the message to open the API token website.
 **/
export type SendToPluginMessage =
  | GetBookmarksRequest
  | RefreshBookmarksRequest
  | OpenApiTokenWebsite;

/**
 * Typeguard for GetBookmarks.
 * @param message The message.
 * @returns True if the message is a GetBookmarks message.
 */
export function isGetBookmarks(
  message: SendToPluginMessage
): message is GetBookmarksRequest {
  return message.event === "getBookmarks";
}

/**
 * Typeguard for RefreshBookmarks.
 * @param message The message.
 * @returns True if the message is a RefreshBookmarks message.
 */
export function isRefreshBookmarks(
  message: SendToPluginMessage
): message is RefreshBookmarksRequest {
  return message.event === "refreshBookmarks";
}

/**
 * Typeguard for OpenApiTokenWebsite.
 * @param message The message.
 * @returns True if the message is a OpenApiTokenWebsite message.
 */
export function isOpenApiTokenWebsite(
  message: SendToPluginMessage
): message is OpenApiTokenWebsite {
  return message.event === "openApiTokenWebsite";
}
