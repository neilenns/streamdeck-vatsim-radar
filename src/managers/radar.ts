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
      logger.debug("Refreshing bookmarks");
      this.bookmarks = [
        { id: randomInt(100).toString(), name: "Bookmark 1" },
        { id: randomInt(100).toString(), name: "Bookmark 2" },
        { id: randomInt(100).toString(), name: "Bookmark 3" },
      ];
    }

    this.emit("bookmarksUpdated", this.bookmarks);
  }

  /**
   * Activates a bookmark by sending the appropriate message to VATSIM Radar.
   * @param id - The ID of the bookmark to activate.
   */
  public activateBookmark(id: string) {
    logger.debug(`Activating bookmark ${id}`);
  }
}

const radarManagerInstance = RadarManager.getInstance();
export default radarManagerInstance;
