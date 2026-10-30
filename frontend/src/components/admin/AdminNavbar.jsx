import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Check,
  CheckCheck,
  ShoppingBag,
  MessageCircle,
  X,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

// Backend API URL.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Browser storage key for notifications marked as read.
const READ_NOTIFICATIONS_KEY = "flameCrustReadNotifications";

// Admin page titles.
const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/home": "Home",
  "/admin/menu": "Menu",
  "/admin/orders": "Orders",
  "/admin/about": "About",
  "/admin/chefs": "Chefs",
  "/admin/messages": "Messages",
  "/admin/edit-contact": "Contacts",
  "/admin/profile": "Profile",
};

// Retrieve the currently authenticated admin's information.
const getStoredAdmin = () => {
  try {
    const saved =
      localStorage.getItem("adminProfile") ||
      sessionStorage.getItem("adminProfile");

    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

// Retrieve notification IDs previously marked as read.
const getReadNotificationIds = () => {
  try {
    return JSON.parse(
      localStorage.getItem(READ_NOTIFICATIONS_KEY) || "[]"
    );
  } catch {
    return [];
  }
};

// Convert a date into a relative time description.
const formatTimeAgo = (dateValue) => {
  if (!dateValue) return "Recently";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "Recently";

  const difference = Math.max(0, Date.now() - date.getTime());

  const minutes = Math.floor(difference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute(s) ago`;
  if (hours < 24) return `${hours} hour(s) ago`;

  return `${days} day(s) ago`;
};

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // Store actual notifications retrieved from the backend.
  const [notifications, setNotifications] = useState([]);

  // Store the currently logged-in administrator.
  const [admin, setAdmin] = useState(getStoredAdmin);

  const [isLoading, setIsLoading] = useState(true);
  const [notificationError, setNotificationError] = useState("");

  const panelRef = useRef(null);

  const pageTitle = pageTitles[location.pathname] || "Admin Panel";

  // Calculate the administrator's initials.
  const initials =
    admin?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "A";

  // Count unread notifications.
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // Load current admin information whenever the profile is updated.
  useEffect(() => {
    const updateAdmin = () => {
      setAdmin(getStoredAdmin());
    };

    // Custom event handles updates made within the same browser tab.
    window.addEventListener("adminProfileUpdated", updateAdmin);

    // Storage event handles updates made in another tab.
    window.addEventListener("storage", updateAdmin);

    // Refresh the profile when the route changes.
    updateAdmin();

    return () => {
      window.removeEventListener("adminProfileUpdated", updateAdmin);
      window.removeEventListener("storage", updateAdmin);
    };
  }, [location.pathname]);

  // Retrieve real orders and contact messages from the backend.
  const fetchNotifications = useCallback(async () => {
    const token =
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken");

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      // Fetch orders and contact messages simultaneously.
      const [ordersResponse, messagesResponse] = await Promise.all([
        fetch(`${API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch(`${API_URL}/contact/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      // Handle expired authentication.
      if (
        ordersResponse.status === 401 ||
        ordersResponse.status === 403 ||
        messagesResponse.status === 401 ||
        messagesResponse.status === 403
      ) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminProfile");

        sessionStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminProfile");

        navigate("/admin/login", { replace: true });
        return;
      }

      if (!ordersResponse.ok || !messagesResponse.ok) {
        throw new Error("Unable to retrieve notifications.");
      }

      const ordersData = await ordersResponse.json();
      const messagesData = await messagesResponse.json();

      // Support common API response formats.
      const orders = Array.isArray(ordersData)
        ? ordersData
        : ordersData.orders || ordersData.data || [];

      const messages = Array.isArray(messagesData)
        ? messagesData
        : messagesData.messages || messagesData.data || [];

      // Retrieve IDs that the admin has already marked as read.
      const readIds = getReadNotificationIds();

      // Convert orders into notifications.
      const orderNotifications = orders.map((order) => {
        const notificationId = `order-${order.id}`;

        return {
          id: notificationId,
          title: "New order received",
          message: `Order #${order.id} has been placed by ${
            order.customer || "a customer"
          }.`,
          time: formatTimeAgo(order.createdAt),
          type: "order",
          read: readIds.includes(notificationId),
          createdAt: order.createdAt,
          link: "/admin/orders",
        };
      });

      // Convert customer messages into notifications.
      const messageNotifications = messages.map((message) => {
        const notificationId = `message-${message.id}`;

        return {
          id: notificationId,
          messageId: message.id,
          title: "New customer message",
          message: `${message.name || "A customer"}: ${
            message.subject || "New contact message"
          }`,
          time: formatTimeAgo(message.createdAt),
          type: "message",

          // The database read status is authoritative for messages.
          read:
            Boolean(message.isRead) ||
            readIds.includes(notificationId),

          createdAt: message.createdAt,
          link: "/admin/messages",
        };
      });

      // Combine both notification types and show the newest first.
      const combinedNotifications = [
        ...orderNotifications,
        ...messageNotifications,
      ]
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        )
        .slice(0, 30);

      setNotifications(combinedNotifications);
      setNotificationError("");
    } catch (error) {
      console.error("Notification loading error:", error);
      setNotificationError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Load notifications initially and refresh every 30 seconds.
  useEffect(() => {
    fetchNotifications();

    const interval = window.setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchNotifications]);

  // Close the notification panel when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Save read notification IDs in Local Storage.
  const saveReadIds = (ids) => {
    localStorage.setItem(
      READ_NOTIFICATIONS_KEY,
      JSON.stringify(ids)
    );
  };

  // Mark one notification as read.
  const markAsRead = async (notification) => {
    // For contact messages, update the actual database status.
    if (notification.type === "message" && !notification.read) {
      const token =
        localStorage.getItem("adminToken") ||
        sessionStorage.getItem("adminToken");

      try {
        const response = await fetch(
          `${API_URL}/contact/messages/${notification.messageId}/read`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to mark message as read.");
        }
      } catch (error) {
        console.error("Mark message as read error:", error);
        setNotificationError(error.message);
        return;
      }
    }

    // Save read status locally.
    const readIds = getReadNotificationIds();

    if (!readIds.includes(notification.id)) {
      readIds.push(notification.id);
      saveReadIds(readIds);
    }

    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id
          ? { ...item, read: true }
          : item
      )
    );
  };

  // Mark every notification as read.
  const markAllAsRead = async () => {
    const unreadMessages = notifications.filter(
      (item) => !item.read && item.type === "message"
    );

    const token =
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken");

    try {
      // Update unread contact messages in the database.
      const results = await Promise.all(
        unreadMessages.map((notification) =>
          fetch(
            `${API_URL}/contact/messages/${notification.messageId}/read`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      if (results.some((response) => !response.ok)) {
        throw new Error("Some messages could not be marked as read.");
      }

      // Persist read status for all notifications.
      const allIds = notifications.map((item) => item.id);

      const existingIds = getReadNotificationIds();

      saveReadIds([
        ...new Set([...existingIds, ...allIds]),
      ]);

      setNotifications((current) =>
        current.map((item) => ({
          ...item,
          read: true,
        }))
      );

      setNotificationError("");
    } catch (error) {
      console.error("Mark all as read error:", error);
      setNotificationError(error.message);
    }
  };

  // Open the corresponding admin page from a notification.
  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification);
    }

    setIsOpen(false);
    navigate(notification.link);
  };

  // Select the correct icon for each notification.
  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return ShoppingBag;

      case "message":
        return MessageCircle;

      default:
        return Bell;
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8">

      {/* Current page title */}
      <h1 className="text-xl font-bold text-[#1e1e1e]">
        {pageTitle}
      </h1>

      {/* Right-side actions */}
      <div className="flex items-center gap-4 sm:gap-6">

        {/* Notification button and panel */}
        <div className="relative" ref={panelRef}>
          <button
            type="button"
            aria-label={`Notifications, ${unreadCount} unread`}
            aria-expanded={isOpen}
            aria-controls="admin-notification-panel"
            onClick={() => setIsOpen((current) => !current)}
            className={`relative rounded-full p-2 text-black transition ${
              isOpen ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
          >
            <Bell size={25} strokeWidth={1.8} />

            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#ff6b00] px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {isOpen && (
            <div
              id="admin-notification-panel"
              className="absolute right-0 top-[52px] z-50 w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-xl border border-gray-200 bg-white text-[#1e1e1e] shadow-xl sm:w-[390px]"
            >

              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
                <div>
                  <h2 className="text-base font-bold">
                    Notifications
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    {unreadCount > 0
                      ? `${unreadCount} unread notification${
                          unreadCount !== 1 ? "s" : ""
                        }`
                      : "You're all caught up"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="flex items-center gap-1 text-xs font-semibold text-[#ff6b00] transition hover:text-orange-700"
                    >
                      <CheckCheck size={15} />
                      <span className="hidden sm:inline">
                        Mark all read
                      </span>
                      <span className="sm:hidden">
                        Read all
                      </span>
                    </button>
                  )}

                  <button
                    type="button"
                    aria-label="Close notifications"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Notification list */}
              <div className="max-h-[390px] overflow-y-auto">

                {isLoading ? (
                  <div className="px-6 py-10 text-center">
                    <LoaderCircle
                      size={28}
                      className="mx-auto animate-spin text-[#ff6b00]"
                    />

                    <p className="mt-3 text-sm text-gray-500">
                      Loading notifications...
                    </p>
                  </div>
                ) : notificationError && notifications.length === 0 ? (
                  <div className="px-6 py-10 text-center">
                    <AlertCircle
                      size={28}
                      className="mx-auto text-red-400"
                    />

                    <p className="mt-3 text-sm font-semibold">
                      Unable to load notifications
                    </p>

                    <button
                      type="button"
                      onClick={fetchNotifications}
                      className="mt-3 text-xs font-semibold text-[#ff6b00]"
                    >
                      Try again
                    </button>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="px-6 py-10 text-center">
                    <Bell
                      size={30}
                      className="mx-auto text-gray-300"
                    />

                    <p className="mt-3 text-sm font-semibold">
                      No notifications
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      New orders and messages will appear here.
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const Icon = getNotificationIcon(
                      notification.type
                    );

                    return (
                      <div
                        key={notification.id}
                        className={`group flex gap-3 border-b border-gray-100 px-4 py-4 transition last:border-b-0 ${
                          notification.read
                            ? "bg-white"
                            : "bg-orange-50/70"
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0e5] text-[#ff6b00]">
                          <Icon size={19} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                            className="w-full text-left"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-semibold">
                                {notification.title}
                              </p>

                              {!notification.read && (
                                <span
                                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff6b00]"
                                  aria-label="Unread"
                                />
                              )}
                            </div>

                            <p className="mt-1 text-xs leading-5 text-gray-600">
                              {notification.message}
                            </p>
                          </button>

                          <div className="mt-2 flex items-center justify-between gap-2">
                            <span className="text-[11px] text-gray-400">
                              {notification.time}
                            </span>

                            {!notification.read && (
                              <button
                                type="button"
                                onClick={() =>
                                  markAsRead(notification)
                                }
                                className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-gray-500 hover:text-[#ff6b00]"
                              >
                                <Check size={13} />
                                Mark read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Panel footer */}
              <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-center text-xs text-gray-500">
                  Flame & Crust Admin Panel
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="h-10 border-l border-gray-200" />

        {/* Dynamic admin profile */}
        <button
          type="button"
          onClick={() => navigate("/admin/profile")}
          className="flex items-center gap-3 text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#160900] text-base font-semibold text-[#ff6b00]">
            {initials}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-black">
              {admin?.name || "Admin"}
            </p>

            <p className="mt-0.5 text-xs text-gray-600">
              {admin?.email || "Administrator"}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}