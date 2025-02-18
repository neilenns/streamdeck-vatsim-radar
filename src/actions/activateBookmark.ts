import streamDeck, {
  action,
  DidReceiveSettingsEvent,
  JsonValue,
  KeyDownEvent,
  SendToPluginEvent,
  SingletonAction,
} from "@elgato/streamdeck";
import {
  isGetBookmarks,
  isOpenApiTokenWebsite,
  isRefreshBookmarks,
  SendToPluginMessage,
} from "@interfaces/sendToPluginMessage";
import radarManagerInstance from "@managers/radar";
import mainLogger from "@utils/logger";

const logger = mainLogger.child({ service: "activateBookmarkAction" });

/**
 * Activates a VATSIM Radar bookmark.
 */
@action({ UUID: "com.neil-enns.vatsim-radar.activate-bookmark" })
export class ActivateBookmark extends SingletonAction<ActivateBookmarkSettings> {
  /**
   * Activates the bookmark associated with the action by sending a request to VATSIM Radar.
   * @param ev The event.
   */
  async onKeyDown(ev: KeyDownEvent<ActivateBookmarkSettings>): Promise<void> {
    try {
      const bookmark = ev.payload.settings.bookmark;

      if (!bookmark) {
        await ev.action.showAlert();
        return;
      }

      radarManagerInstance.activateBookmark(bookmark);
      await ev.action.showOk();
    } catch (error: unknown) {
      logger.error("Error activating bookmark", error);
    }
  }

  onDidReceiveSettings(
    ev: DidReceiveSettingsEvent<ActivateBookmarkSettings>
  ): Promise<void> | void {
    logger.debug("Received settings", ev.payload.settings);
  }

  /**
   * Handles requests from the property inspector.
   * @param ev The event.
   */
  async onSendToPlugin(
    ev: SendToPluginEvent<JsonValue, ActivateBookmarkSettings>
  ): Promise<void> {
    try {
      const message = ev.payload as SendToPluginMessage;

      logger.debug("Received message from property inspector", message);

      if (!ev.action.isKey()) {
        return;
      }

      if (isOpenApiTokenWebsite(message)) {
        await streamDeck.system.openUrl("https://vatsim-radar.com/");
      } else if (isGetBookmarks(message)) {
        radarManagerInstance.getBookmarks(message.isRefresh);
      } else if (isRefreshBookmarks(message)) {
        radarManagerInstance.getBookmarks(true);
      }
    } catch (error: unknown) {
      logger.error("Error handling sendToPlugin event", error);
    }
  }
}

/**
 * Settings for {@link ActivateBookmark}.
 */
interface ActivateBookmarkSettings {
  bookmark: string | undefined;
  [key: string]: JsonValue;
}
