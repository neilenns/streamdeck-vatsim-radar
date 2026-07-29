import {
  IncomingMessage,
  isBookmarksMessage,
  OutgoingMessage,
} from "@root/interfaces/messages";
import EventEmitter from "events";
import WebSocket from "ws";
import streamDeck from "@elgato/streamdeck";

class RadarManager extends EventEmitter {
  private static instance: RadarManager | null = null;
  private socket: WebSocket | null = null;
  private reconnectInterval = 1000 * 5; // 5 seconds
  private url = "ws://127.0.0.1:48073/";
  private reconnectTimer: NodeJS.Timeout | null = null;
  private _isAppRunning = false;

  private constructor() {
    super();
  }

  /**
   * Provides access to the RadarManager instance.
   * @returns The instance of RadarManager
   */
  public static getInstance(): RadarManager {
    RadarManager.instance ??= new RadarManager();
    return RadarManager.instance;
  }

  /**
   * Gets whether the VATSIM Radar application was detected as running by Stream Deck.
   * @returns {boolean} True if running.
   */
  public get isAppRunning(): boolean {
    return this._isAppRunning;
  }

  /**
   * Sets whether the VATSIM Radar application is running.
   * @param {boolean} newValue True if running.
   */
  public set isAppRunning(newValue: boolean) {
    this._isAppRunning = newValue;
  }

  /**
   * Sets the connection URL for VATSIM Radar.
   * @param {string} url The URL for the VATSIM Radar instance
   */
  public setUrl(url: string) {
    this.url = url;
  }

  /**
   * Provides the current state of the connection to VATSIM Radar.
   * @returns True if there is an open connection to VATSIM Radar, false otherwise.
   */
  get isConnected() {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  /**
   * Connects to a VATSIM Radar instance and registers event handlers for various socket events.
   */
  public connect(): void {
    if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
      streamDeck.logger.warn("WebSocket is already connected or connecting.");
      return;
    }

    // Cancel any pending reconnect timer just in case there is one
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    this.socket = new WebSocket(this.url);

    this.socket.on("open", () => {
      streamDeck.logger.debug("WebSocket connection established.");
      this.emit("connected");
    });

    this.socket.on("close", () => {
      streamDeck.logger.debug("WebSocket connection closed");

      this.emit("disconnected");
      this.reconnect();
    });

    this.socket.on("error", (err: Error & { code: string }) => {
      if (err.code === "ECONNREFUSED") {
        streamDeck.logger.debug(
          "Unable to connect to VATSIM Radar, connection refused. VATSIM Radar probably isn't running.",
        );
      } else {
        streamDeck.logger.error("WebSocket error:", err.message);
      }

      this.reconnect();
    });

    this.socket.on("message", (message: string) => {
      this.processMessage(message);
    });
  }

  /**
   * Disconnects from a VATSIM Radar instance.
   */
  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  /**
   * Takes an incoming websocket message from VATSIM Radar, determines the type, and then
   * fires the appropriate event.
   * @param message The message to process
   */
  private processMessage(data: string): void {
    const message = JSON.parse(data.toString()) as IncomingMessage;

    if (isBookmarksMessage(message)) {
      this.emit("received-bookmarks", message.data.bookmarks);
    }

    streamDeck.logger.debug(`Received: ${message}`);
  }

  /**
   * Sets up a timer to attempt to reconnect to the websocket.
   */
  private reconnect(): void {
    // Check to see if a reconnect attempt is already in progress. If so
    // skip starting another one.
    if (this.reconnectTimer) {
      return;
    }

    this.reconnectTimer = setTimeout(() => {
      streamDeck.logger.debug(`Attempting to reconnect...`);
      this.connect();
    }, this.reconnectInterval);
  }

  /**
   * Sends a message to VATSIM Radar.
   * @param message The message to send
   */
  public sendMessage(message: OutgoingMessage) {
    if (!this.isConnected) {
      return;
    }

    this.socket?.send(JSON.stringify(message));
  }
}

const radarManagerInstance = RadarManager.getInstance();
export default radarManagerInstance;
