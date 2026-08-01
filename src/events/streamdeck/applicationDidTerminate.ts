import { ApplicationDidTerminateEvent } from "@elgato/streamdeck";
import radarManager from "@managers/radar";

export const handleOnApplicationDidTerminate = (
  _ev: ApplicationDidTerminateEvent,
) => {
  radarManager.isAppRunning = false;
  radarManager.disconnect();
};
