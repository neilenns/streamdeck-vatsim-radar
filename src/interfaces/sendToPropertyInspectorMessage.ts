import { JsonValue } from "@elgato/streamdeck";

/**
 * The response to a GetBookmarks request.
 */
export interface GetBookmarksResult {
  event: "getBookmarks";
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
