import { ApplicationDidLaunchEvent } from "@elgato/streamdeck";
import radarManager from "@managers/radar";

export const handleOnApplicationDidLaunch = (ev: ApplicationDidLaunchEvent) => {
  console.info("Received applicationDidLaunch event", ev.application);
  radarManager.isAppRunning = true;
  radarManager.connect();
};
