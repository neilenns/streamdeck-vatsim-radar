import { Bookmark } from "@interfaces/bookmark";
import { randomInt } from "crypto";
import mainLogger from "@utils/logger";
import EventEmitter from "events";

const logger = mainLogger.child({ module: "RadarManager" });

class RadarManager extends EventEmitter {
  private static instance: RadarManager = new RadarManager();

  private bookmarks: Bookmark[] = [];

  private constructor() {
    super();
  }

  /**
   * Provides access to the VATSIM RADAR websocket connection.
   * @returns The singleton instance of the RadarManager.
   */
  public static getInstance(): RadarManager {
    return RadarManager.instance;
  }

  /**
   * Retrieves the bookmarks from the VATSIM RADAR websocket connection.
   * @param forceRefresh - Whether to force refresh the bookmarks. Defaults to false.
   */
  public getBookmarks(forceRefresh = false) {
    if (forceRefresh || this.bookmarks.length === 0) {
      logger.info("Force refreshing bookmarks");
      this.bookmarks = [
        { id: randomInt(100).toString(), name: "Bookmark 1" },
        { id: randomInt(100).toString(), name: "Bookmark 2" },
        { id: randomInt(100).toString(), name: "Bookmark 3" },
      ];

      this.emit("bookmarksUpdated", this.bookmarks);

      return;
    } else {
      this.emit("bookmarksUpdated", this.bookmarks);

      return;
    }
  }
}

const radarManagerInstance = RadarManager.getInstance();
export default radarManagerInstance;
