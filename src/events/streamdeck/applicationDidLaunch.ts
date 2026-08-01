import { ApplicationDidLaunchEvent } from "@elgato/streamdeck";
import radarManager from "@managers/radar";

export const handleOnApplicationDidLaunch = (
  _ev: ApplicationDidLaunchEvent,
) => {
  radarManager.isAppRunning = true;
  radarManager.connect();
};
