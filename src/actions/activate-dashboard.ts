import streamDeck, {
  action,
  DidReceiveSettingsEvent,
  KeyDownEvent,
  SendToPluginEvent,
  SingletonAction,
} from "@elgato/streamdeck";
import { JsonValue } from "@elgato/utils";
import radarManager from "@managers/radar";

@action({ UUID: "com.neil-enns.vatsim-radar.activate-dashboard" })
export class ActivateDashboard extends SingletonAction<ActivateDashboardSettings> {
  override onSendToPlugin(
    ev: SendToPluginEvent<JsonValue, ActivateDashboardSettings>,
  ): void {
    if (
      ev.payload instanceof Object &&
      "event" in ev.payload &&
      ev.payload.event === "get-dashboards"
    ) {
      console.log("Requesting dashboards");
      radarManager.sendMessage({
        type: "get-dashboards",
      });
    }
  }

  override onDidReceiveSettings(
    ev: DidReceiveSettingsEvent<ActivateDashboardSettings>,
  ): void {
    streamDeck.logger.info(
      `Received selected setting ${ev.payload.settings.dashboard}`,
    );
  }

  override async onKeyDown(
    ev: KeyDownEvent<ActivateDashboardSettings>,
  ): Promise<void> {
    const { settings } = ev.payload;

    if (!settings.dashboard) {
      streamDeck.logger.warn(`No dashboard configured for action.`);
      ev.action.showAlert();
      return;
    }

    streamDeck.logger.info(
      `Activating dashboard: ${settings.dashboard ?? "None"}`,
    );

    radarManager.sendMessage({
      type: "activate-dashboard",
      data: {
        id: Number(settings.dashboard), // Not sure why the stored value is a string, but this gets it back to a number.
      },
    });

    ev.action.showOk();
  }
}

type ActivateDashboardSettings = {
  dashboard?: string;
};
