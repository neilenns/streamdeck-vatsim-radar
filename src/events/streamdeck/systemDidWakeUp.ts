import streamDeck from "@elgato/streamdeck";
import radarManager from "@managers/radar";

export const handleOnSystemDidWakeUp = () => {
  streamDeck.logger.info("Received systemDidWakeUp event");

  // This ensures reconnection to VATSIM Radar if somehow the websocket connection
  // doesn't automatically start back up after a system wake.
  if (radarManager.isAppRunning) {
    radarManager.connect();
  }
};
