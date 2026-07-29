import {
  action,
  KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import { Bookmark } from "@interfaces/messages";
import radarManager from "@managers/radar";

@action({ UUID: "com.neil-enns.vatsim-radar.activate-bookmark" })
export class ActivateBookmark extends SingletonAction<ActivateBookmarkSettings> {
  override onWillAppear(
    ev: WillAppearEvent<ActivateBookmarkSettings>,
  ): void | Promise<void> {
    return ev.action.setTitle(
      `${ev.payload.settings.selectedBookmark ?? "None"}`,
    );
  }

  override async onKeyDown(
    ev: KeyDownEvent<ActivateBookmarkSettings>,
  ): Promise<void> {
    const { settings } = ev.payload;

    if (!settings.selectedBookmark) {
      radarManager.sendMessage({
        type: "get-bookmarks",
      });
      return;
    }
  }
}

type ActivateBookmarkSettings = {
  selectedBookmark?: Bookmark;
};
