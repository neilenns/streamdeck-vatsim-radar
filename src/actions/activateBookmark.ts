import {
  action,
  JsonValue,
  KeyDownEvent,
  SendToPluginEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import {
  isGetBookmarks,
  SendToPluginMessage,
} from "@interfaces/sendToPluginMessage";
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
   * Activates the bookmark associated with the action by sending a request to VATSIM Radar.
   * @param ev The event.
   */
  async onKeyDown(ev: KeyDownEvent<ActivateBookmarkSettings>): Promise<void> {
    await ev.action.setTitle("Hello");
  }

  /**
   * Handles requests from the property inspector.
   * @param ev The event.
   */
  onSendToPlugin(
    ev: SendToPluginEvent<JsonValue, ActivateBookmarkSettings>
  ): Promise<void> | void {
    const message = ev.payload as SendToPluginMessage;

    if (isGetBookmarks(message)) {
      logger.info("Received getBookmarks event");
    }
  }
}

/**
 * Settings for {@link ActivateBookmark}.
 */
interface ActivateBookmarkSettings {
  bookmark: string;
  [key: string]: JsonValue;
}
