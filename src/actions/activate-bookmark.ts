import streamDeck, {
  action,
  KeyDownEvent,
  SendToPluginEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import { JsonValue } from "@elgato/utils";
import { Bookmark } from "@interfaces/messages";
import radarManager from "@managers/radar";

@action({ UUID: "com.neil-enns.vatsim-radar.activate-bookmark" })
export class ActivateBookmark extends SingletonAction<ActivateBookmarkSettings> {
  override onWillAppear(
    ev: WillAppearEvent<ActivateBookmarkSettings>,
  ): void | Promise<void> {
    return ev.action.setTitle(`${ev.payload.settings.bookmark ?? "None"}`);
  }

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

  override async onKeyDown(
    ev: KeyDownEvent<ActivateBookmarkSettings>,
  ): Promise<void> {
    const { settings } = ev.payload;

    streamDeck.logger.info(
      `Activating bookmark: ${settings.bookmark ?? "None"}`,
    );
  }
}

type ActivateBookmarkSettings = {
  bookmark?: Bookmark;
};
