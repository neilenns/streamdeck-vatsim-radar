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

export interface GetDashboardsMessage {
  type: "get-dashboards";
}

export interface ActivateDashboardMessage {
  type: "activate-dashboard";
  data: {
    id: number;
  };
}
export type Dashboard = {
  label: string;
  id: number;
};

export interface DashboardsMessage {
  type: "dashboards";
  data: {
    dashboards: Dashboard[];
  };
}

export type OutgoingMessage =
  | ActivateBookmarkMessage
  | ActivateDashboardMessage
  | GetBookmarksMessage
  | GetDashboardsMessage;
export type IncomingMessage = BookmarksMessage | DashboardsMessage;

export function isBookmarksMessage(
  message: IncomingMessage,
): message is BookmarksMessage {
  return message && message.type === "bookmarks";
}

export function isDashboardsMessage(
  message: IncomingMessage,
): message is DashboardsMessage {
  return message && message.type === "dashboards";
}
