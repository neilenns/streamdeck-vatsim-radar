import {
  action,
  DidReceiveSettingsEvent,
  JsonValue,
  KeyDownEvent,
  SendToPluginEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import {
  isGetBookmarks,
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
   * Processes the onWillAppear event.
   * @param ev The event.
   * @returns Nothing.
   */
  onWillAppear(
    ev: WillAppearEvent<ActivateBookmarkSettings>
  ): void | Promise<void> {
    return ev.action.setTitle("Bookmark");
  }

  /**
   * Processes the onDidReceiveSettings event. Sets the title to the bookmark title if no title was
   * set by the user.
   * @param ev The event.
   */
  onDidReceiveSettings(
    ev: DidReceiveSettingsEvent<ActivateBookmarkSettings>
  ): Promise<void> | void {
    const id = ev.payload.settings.bookmark;

    if (!id) {
      return;
    }

    const bookmark = radarManagerInstance.getBookmarkById(id);

    if (!bookmark) {
      return;
    }

    if (!ev.payload.settings.title) {
      return ev.action.setTitle(bookmark.name);
    }
  }

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

  /**
   * Handles requests from the property inspector.
   * @param ev The event.
   */
  onSendToPlugin(
    ev: SendToPluginEvent<JsonValue, ActivateBookmarkSettings>
  ): Promise<void> | void {
    try {
      const message = ev.payload as SendToPluginMessage;

      logger.debug("Received message from property inspector", message);

      if (!ev.action.isKey()) {
        return;
      }

      if (isGetBookmarks(message)) {
        logger.debug("Getting bookmarks");
        radarManagerInstance.getBookmarks(message.isRefresh);
      } else if (isRefreshBookmarks(message)) {
        logger.debug("Refreshing bookmarks");
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
