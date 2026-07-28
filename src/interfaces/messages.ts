export interface GetBookmarksMessage {
  type: "get-bookmarks";
}

export type Bookmark = string;

export interface BookmarksMessage {
  type: "bookmarks";
  bookmarks: Bookmark[];
}

export type OutgoingMessage = GetBookmarksMessage;
export type IncomingMessage = BookmarksMessage;
