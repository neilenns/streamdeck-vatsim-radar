import {
  action,
  JsonValue,
  KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";

/**
 * Activates a VATSIM Radar bookmark.
 */
@action({ UUID: "com.neil-enns.vatsim-radar.activate-bookmark" })
export class ActivateBookmark extends SingletonAction<ActivateBookmarkSettings> {
  onWillAppear(
    ev: WillAppearEvent<ActivateBookmarkSettings>
  ): void | Promise<void> {
    return ev.action.setTitle("Bookmark");
  }

  async onKeyDown(ev: KeyDownEvent<ActivateBookmarkSettings>): Promise<void> {
    await ev.action.setTitle("Hello");
  }
}

/**
 * Settings for {@link ActivateBookmark}.
 */
interface ActivateBookmarkSettings {
  count: number;
  [key: string]: JsonValue;
}
