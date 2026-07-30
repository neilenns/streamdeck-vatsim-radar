export interface GetBookmarksMessage {
  type: "get-bookmarks";
}

export interface ActivateBookmarkMessage {
  type: "activate-bookmark";
  data: {
    id: number;
  };
}
export type Bookmark = {
  label: string;
  id: number;
  order: number;
};

export interface BookmarksMessage {
  type: "bookmarks";
  data: {
    bookmarks: Bookmark[];
  };
}

export type OutgoingMessage = GetBookmarksMessage | ActivateBookmarkMessage;
export type IncomingMessage = BookmarksMessage;

export function isBookmarksMessage(
  message: IncomingMessage,
): message is BookmarksMessage {
  return message && message.type === "bookmarks";
}
