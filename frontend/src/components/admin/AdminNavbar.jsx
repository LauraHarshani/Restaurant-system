
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Check,
  CheckCheck,
  ShoppingBag,
  MessageCircle,
  Users,
  X,
} from "lucide-react";

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

// Dummy notifications
const initialNotifications = [
  {
    id: 1,
    title: "New order received",
    message: "Order #FC-1024 has been placed by a customer.",
    time: "2 minutes ago",
    type: "order",
    read: false,
  },
  {
    id: 2,
    title: "New customer message",
    message: "You have received a new message through the contact form.",
    time: "15 minutes ago",
    type: "message",
    read: false,
  },
  {
    id: 3,
    title: "Menu update",
    message: "Your menu items were updated successfully.",
    time: "1 hour ago",
    type: "menu",
    read: false,
  },
  {
    id: 4,
    title: "New table reservation",
    message: "A customer has requested a table for 4 people at 7:30 PM.",
    time: "Yesterday",
    type: "reservation",
    read: true,
  },
];

const notificationIcons = {
  order: ShoppingBag,
  message: MessageCircle,
  menu: Check,
  customer: Users,
};

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const panelRef = useRef(null);

  const pageTitle = pageTitles[location.pathname] || "Admin Panel";

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // Close the panel when clicking outside it
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
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
              <>
                <span className="absolute -right-0.5 -top-0.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#ff6b00] px-1 text-[10px] font-bold text-white ring-2 ring-white">
                  {unreadCount}
                </span>
              </>
            )}
          </button>

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
                      ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
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
                      <span className="hidden sm:inline">Mark all read</span>
                      <span className="sm:hidden">Read all</span>
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
                {notifications.length === 0 ? (
                  <div className="px-6 py-10 text-center">
                    <Bell
                      size={30}
                      className="mx-auto text-gray-300"
                    />
                    <p className="mt-3 text-sm font-semibold">
                      No notifications
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      New updates will appear here.
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const Icon =
                      notificationIcons[notification.type] || Bell;

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

                          <div className="mt-2 flex items-center justify-between gap-2">
                            <span className="text-[11px] text-gray-400">
                              {notification.time}
                            </span>

                            {!notification.read && (
                              <button
                                type="button"
                                onClick={() =>
                                  markAsRead(notification.id)
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

        {/* Admin profile */}
        <button
          type="button"
          onClick={() => navigate("/admin/profile")}
          className="flex items-center gap-3 text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#160900] text-base font-semibold text-[#ff6b00]">
            AM
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-black">
              Admin
            </p>
            <p className="mt-0.5 text-xs text-gray-600">
              Administrator
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
