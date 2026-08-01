import { SystemDidWakeUpEvent } from "@elgato/streamdeck";
import radarManager from "@managers/radar";

export const handleOnSystemDidWakeUp = (_ev: SystemDidWakeUpEvent) => {
  // This ensures reconnection to VATSIM Radar if somehow the websocket connection
  // doesn't automatically start back up after a system wake.
  if (radarManager.isAppRunning) {
    radarManager.connect();
  }
};
