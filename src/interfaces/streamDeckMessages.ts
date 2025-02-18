import { JsonValue } from "@elgato/streamdeck";

export enum EventName {
  GetBookmarks = "getBookmarks",
  RefreshBookmarks = "refreshBookmarks",
  OpenApiTokenWebsite = "openApiTokenWebsite",
}

/**
 * Message sent to the plugin to get the bookmarks.
 */
export interface GetBookmarksRequest {
  event: EventName.GetBookmarks;
  isRefresh: undefined | true;
  [key: string]: JsonValue;
}

/**
 * Message sent to the plugin to refresh the bookmarks.
 */
export interface RefreshBookmarksRequest {
  event: EventName.RefreshBookmarks;
  [key: string]: JsonValue;
}

/**
 * Message sent to the plugin to open the API token website.
 */
export interface OpenApiTokenWebsite {
  event: EventName.OpenApiTokenWebsite;
  [key: string]: JsonValue;
}

/**
 * The response to a GetBookmarks request.
 */
export interface GetBookmarksResult {
  event: EventName.GetBookmarks;
  items: DataSourceResult;
  [key: string]: JsonValue;
}

/**
 * The result of a DataSource request.
 * @see https://sdpi-components.dev/docs/helpers/data-source
 */
export type DataSourceResult = DataSourceResultItem[];

/**
 * An item in a DataSource result. This can be either an item or a group of items.
 * This is used to populate the dropdown menu in the property inspector.
 * @see https://sdpi-components.dev/docs/helpers/data-source
 **/
export type DataSourceResultItem = Item | ItemGroup;

/**
 * An item in an SDPI data source.
 */
export interface Item {
  disabled?: boolean;
  label?: string;
  value: string;
  [key: string]: JsonValue;
}

/**
 * A group of items in an SDPI data source.
 */
export interface ItemGroup {
  label?: string;
  children: Item[];
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
  return message.event === EventName.GetBookmarks;
}

/**
 * Typeguard for RefreshBookmarks.
 * @param message The message.
 * @returns True if the message is a RefreshBookmarks message.
 */
export function isRefreshBookmarks(
  message: SendToPluginMessage
): message is RefreshBookmarksRequest {
  return message.event === EventName.RefreshBookmarks;
}

/**
 * Typeguard for OpenApiTokenWebsite.
 * @param message The message.
 * @returns True if the message is a OpenApiTokenWebsite message.
 */
export function isOpenApiTokenWebsite(
  message: SendToPluginMessage
): message is OpenApiTokenWebsite {
  return message.event === EventName.OpenApiTokenWebsite;
}
