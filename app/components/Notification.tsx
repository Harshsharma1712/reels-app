"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // optional class merge helper

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    id: number;
  } | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    const id = Date.now();
    setNotification({ message, type, id });
    setTimeout(() => {
      setNotification((current) => (current?.id === id ? null : current));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {notification && (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end space-y-2">
          <div
            className={cn(
              "flex items-center gap-3 p-4 text-sm rounded-2xl shadow-lg animate-slide-in fade-in",
              getAlertStyles(notification.type)
            )}
          >
            {getIcon(notification.type)}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

function getAlertStyles(type: NotificationType): string {
  switch (type) {
    case "success":
      return "bg-green-100 text-green-800";
    case "error":
      return "bg-red-100 text-red-800";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    case "info":
    default:
      return "bg-blue-100 text-blue-800";
  }
}

function getIcon(type: NotificationType) {
  const iconProps = { className: "w-5 h-5" };
  switch (type) {
    case "success":
      return <CheckCircle {...iconProps} />;
    case "error":
      return <XCircle {...iconProps} />;
    case "warning":
      return <AlertTriangle {...iconProps} />;
    case "info":
    default:
      return <Info {...iconProps} />;
  }
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
