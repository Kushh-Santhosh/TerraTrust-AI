import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useNotifications } from "@/lib/notifications";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — TerraTrust AI" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();
  return (
    <AppShell
      title="Notifications"
      subtitle="Updates from your portfolio, community, and government registries."
      actions={
        <Button variant="outline" className="rounded-full" onClick={markAllRead} disabled={!unreadCount}>
          {unreadCount ? `Mark all read (${unreadCount})` : "All caught up"}
        </Button>
      }
    >
      {notifications.length ? <div className="surface-card divide-y divide-border">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-4 p-5 ${!n.read ? "bg-primary/[0.03]" : ""}`}
            onClick={() => markRead(n.id)}
          >
            <span
              className={`mt-2 h-2 w-2 rounded-full ${n.kind === "success" ? "bg-success" : n.kind === "warning" ? "bg-warning" : n.kind === "alert" ? "bg-destructive" : "bg-primary"}`}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.at}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
            </div>
          </div>
        ))}
      </div> : <div className="surface-card p-10 text-center"><p className="font-medium">You&apos;re all caught up.</p><p className="mt-1 text-sm text-muted-foreground">New updates will appear here.</p></div>}
    </AppShell>
  );
}
