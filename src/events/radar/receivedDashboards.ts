import streamDeck from "@elgato/streamdeck";
import { Dashboard } from "@interfaces/messages";

export function handleReceivedDashboards(dashboards?: Dashboard[]): void {
  if (!dashboards) return;

  const items = dashboards
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((dashboard) => ({
      label: dashboard.label,
      value: dashboard.id,
    }));

  streamDeck.ui.sendToPropertyInspector({
    event: "get-dashboards",
    items,
  });
}
