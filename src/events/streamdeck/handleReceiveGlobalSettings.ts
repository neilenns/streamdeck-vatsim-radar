import { DidReceiveGlobalSettingsEvent } from "@elgato/streamdeck";
import { GlobalSettings } from "@interfaces/globalSettings";
import radarManagerInstance from "@managers/radar";

/**
 * Handles global setting updates from property inspectors.
 * @param ev - The event with the new global settings.
 */
export const handleDidReceiveGlobalSettings = (
  ev: DidReceiveGlobalSettingsEvent<GlobalSettings>
) => {
  radarManagerInstance.apiToken = ev.settings.apiToken;
};
