import {
  action,
  DidReceiveSettingsEvent,
  KeyDownEvent,
  SendToPluginEvent,
  SingletonAction,
} from "@elgato/streamdeck";
import { JsonValue } from "@elgato/utils";
import radarManager from "@managers/radar";
import mainLogger from "@utils/logger";

const logger = mainLogger.child({ service: "activate-bookmark" });

@action({ UUID: "com.neil-enns.vatsim-radar.activate-bookmark" })
export class ActivateBookmark extends SingletonAction<ActivateBookmarkSettings> {
  override onSendToPlugin(
    ev: SendToPluginEvent<JsonValue, ActivateBookmarkSettings>,
  ): void {
    if (
      ev.payload instanceof Object &&
      "event" in ev.payload &&
      ev.payload.event === "get-bookmarks"
    ) {
      radarManager.sendMessage({
        type: "get-bookmarks",
      });
    }
  }

  override onDidReceiveSettings(
    ev: DidReceiveSettingsEvent<ActivateBookmarkSettings>,
  ): void {
    logger.info(`Received selected setting ${ev.payload.settings.bookmark}`);
  }

  override async onKeyDown(
    ev: KeyDownEvent<ActivateBookmarkSettings>,
  ): Promise<void> {
    const { settings } = ev.payload;

    if (!settings.bookmark) {
      logger.warn(`No bookmark configured for action.`);
      ev.action.showAlert();
      return;
    }

    logger.info(`Activating bookmark: ${settings.bookmark ?? "None"}`);

    radarManager.sendMessage({
      type: "activate-bookmark",
      data: {
        id: Number(settings.bookmark), // Not sure why the stored value is a string, but this gets it back to a number.
      },
    });

    ev.action.showOk();
  }
}

type ActivateBookmarkSettings = {
  bookmark?: string;
};
