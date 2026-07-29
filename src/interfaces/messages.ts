export interface GetBookmarksMessage {
  type: "get-bookmarks";
}

export type Bookmark = string;

export interface BookmarksMessage {
  type: "bookmarks";
  data: {
    bookmarks: Bookmark[];
  };
}

export type OutgoingMessage = GetBookmarksMessage;
export type IncomingMessage = BookmarksMessage;

export function isBookmarksMessage(
  message: IncomingMessage,
): message is BookmarksMessage {
  return message && message.type === "bookmarks";
}
