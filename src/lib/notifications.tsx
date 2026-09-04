import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { notifications as initialNotifications } from "./mock-data";
import type { NotificationItem } from "./types";
import { useAuth } from "./auth";

interface NotificationsContextValue {
  notifications: NotificationItem[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState(initialNotifications);
  const userId = user?.id ?? null;

  useEffect(() => {
    setItems(initialNotifications);
  }, [userId]);

  const markRead = (id: string) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const markAllRead = () => {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications: items,
        unreadCount: items.filter((item) => !item.read).length,
        markRead,
        markAllRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const value = useContext(NotificationsContext);
  if (!value) throw new Error("useNotifications must be used inside NotificationsProvider");
  return value;
}
