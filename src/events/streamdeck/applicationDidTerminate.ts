import { ApplicationDidTerminateEvent } from "@elgato/streamdeck";
import radarManager from "@managers/radar";

export const handleOnApplicationDidTerminate = (
  ev: ApplicationDidTerminateEvent,
) => {
  console.info("Received applicationDidTerminate event", ev.application);
  radarManager.isAppRunning = false;
  radarManager.disconnect();
};
