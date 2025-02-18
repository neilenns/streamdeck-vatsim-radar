import { Bookmark } from "@interfaces/bookmark";
import { randomInt } from "crypto";
import mainLogger from "@utils/logger";
import EventEmitter from "events";

const logger = mainLogger.child({ module: "RadarManager" });

class RadarManager extends EventEmitter {
  private static instance: RadarManager = new RadarManager();
  private bookmarks: Bookmark[] = [];
  private _apiToken?: string;

  private constructor() {
    super();
  }

  /**
   * Gets the RadarManager singleton instance.
   * @returns The singleton instance of the RadarManager.
   */
  public static getInstance(): RadarManager {
    return RadarManager.instance;
  }

  /**
   * Gets the API token.
   */
  get apiToken(): string | undefined {
    return this._apiToken;
  }

  /**
   * Sets the API token.
   * @param token - The API token to set. Defaults to undefined.
   **/
  set apiToken(token: string | undefined) {
    this._apiToken = token;
  }

  /**
   * Retrieves the bookmarks from the VATSIM RADAR websocket connection.
   * @param forceRefresh - Whether to force refresh the bookmarks. Defaults to false.
   */
  public getBookmarks(forceRefresh = false) {
    // When the API token isn't set, force the bookmark list to an empty array.
    if (!this.apiToken) {
      logger.error("API token is not set");
      this.bookmarks = [];
    }
    // Actually refresh the list if forced or there are no bookmarks to begin with.
    else if (forceRefresh || this.bookmarks.length === 0) {
      logger.debug("Refreshing bookmarks");

      this.bookmarks = Array.from({ length: 3 }, () => {
        const id = randomInt(1, 100).toString();
        return { id, name: `Bookmark ${id}` };
      });
    }

    // Notify listeners that the bookmarks have been updated.
    this.emit("bookmarksUpdated", this.bookmarks);
  }

  /**
   * Activates a bookmark by sending the appropriate message to VATSIM Radar.
   * @param id - The ID of the bookmark to activate.
   */
  public activateBookmark(id: string) {
    logger.debug(`Activating bookmark ${id}`);
  }

  /**
   * Gets a bookmark by its ID.
   * @param id - The ID of the bookmark to get.
   * @returns The bookmark, or undefined if it doesn't exist.
   */
  public getBookmarkById(id: string): Bookmark | undefined {
    return this.bookmarks.find((bookmark) => bookmark.id === id);
  }
}

const radarManagerInstance = RadarManager.getInstance();
export default radarManagerInstance;
