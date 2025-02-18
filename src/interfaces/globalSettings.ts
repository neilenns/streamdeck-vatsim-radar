import { JsonValue } from "@elgato/streamdeck";

/**
 * Global settings for the plugin.
 */
export interface GlobalSettings {
  apiToken: string | undefined;
  [key: string]: JsonValue;
}
