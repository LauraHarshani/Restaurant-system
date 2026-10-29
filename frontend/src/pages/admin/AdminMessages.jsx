import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Pencil,
  Search,
  ChevronLeft,
  ChevronRight,
  Reply,
  Paperclip,
  Check,
  Mail,
  MessageCircle,
  Trash2,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const PAGE_SIZE = 5;

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("en-LK", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function normalizeMessage(message) {
  return {
    ...message,
    id: Number(message.id),
    name: message.name || "Unknown sender",
    email: message.email || "",
    subject: message.subject || "No subject",
    message: message.message || "",
    date: formatDate(message.createdAt),
    preview: (message.message || "").replace(/\s+/g, " ").trim(),
    unread: !message.isRead,
    reply: message.reply || "",
    repliedAt: message.repliedAt || null,
  };
}

async function requestApi(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || data.error || "The request could not be completed."
    );
  }

  return data;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [replyText, setReplyText] = useState("");

  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");
  const [replying, setReplying] = useState(false);
  const [updatingReadId, setUpdatingReadId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadMessages = useCallback(async () => {
    try {
      setLoading(true);
      setPageError("");

      const data = await requestApi(
        `${API_BASE_URL}/contact/messages`
      );

      const list = Array.isArray(data)
        ? data
        : data.messages || data.data || [];

      if (!Array.isArray(list)) {
        throw new Error("The server returned an invalid messages list.");
      }

      const normalized = list.map(normalizeMessage);

      setMessages(normalized);

      setSelectedId((currentId) => {
        if (normalized.some((item) => item.id === currentId)) {
          return currentId;
        }

        return normalized[0]?.id ?? null;
      });
    } catch (error) {
      console.error("Unable to load contact messages:", error);
      setPageError(error.message || "Unable to load messages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const unreadCount = messages.filter((message) => message.unread).length;
  const readCount = messages.length - unreadCount;

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();

    return messages.filter((message) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "unread" && message.unread) ||
        (filter === "read" && !message.unread);

      const matchesSearch =
        !query ||
        [
          message.name,
          message.email,
          message.subject,
          message.message,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [messages, filter, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMessages.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const visibleMessages = filteredMessages.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const selectedMessage =
    messages.find((message) => message.id === selectedId) || null;

  const avatarText = (name) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const changeFilter = (nextFilter) => {
    setFilter(nextFilter);
    setPage(1);
  };

  const selectMessage = (message) => {
    setSelectedId(message.id);
    setReplyText("");
    setActionError("");
    setNotice("");
  };

  const handleMarkAsRead = async () => {
    if (!selectedMessage || !selectedMessage.unread) return;

    try {
      setUpdatingReadId(selectedMessage.id);
      setActionError("");
      setNotice("");

      await requestApi(
        `${API_BASE_URL}/contact/messages/${selectedMessage.id}/read`,
        { method: "PATCH" }
      );

      setMessages((current) =>
        current.map((message) =>
          message.id === selectedMessage.id
            ? { ...message, unread: false }
            : message
        )
      );

      setNotice("Message marked as read.");
    } catch (error) {
      console.error("Unable to update message status:", error);
      setActionError(error.message || "Unable to mark message as read.");
    } finally {
      setUpdatingReadId(null);
    }
  };

  const handleReply = async (event) => {
    event.preventDefault();

    if (!selectedMessage || !replyText.trim()) return;

    try {
      setReplying(true);
      setActionError("");
      setNotice("");

      const reply = replyText.trim();

      const data = await requestApi(
        `${API_BASE_URL}/contact/messages/${selectedMessage.id}/reply`,
        {
          method: "PATCH",
          body: JSON.stringify({ reply }),
        }
      );

      const savedReply =
        data.message && typeof data.message === "object"
          ? data.message
          : data.details || data.data || {};

      setMessages((current) =>
        current.map((message) =>
          message.id === selectedMessage.id
            ? {
                ...message,
                reply: savedReply.reply || reply,
                repliedAt: savedReply.repliedAt || new Date().toISOString(),
                unread: false,
              }
            : message
        )
      );

      setReplyText("");
      setNotice(
        "Reply sent successfully."
      );
    } catch (error) {
      console.error("Unable to save reply:", error);
      setActionError(error.message || "Unable to save your reply.");
    } finally {
      setReplying(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedMessage) return;

    const confirmed = window.confirm(
      `Delete the message from ${selectedMessage.name}? This cannot be undone.`
    );

    if (!confirmed) return;

    const deletedId = selectedMessage.id;

    try {
      setDeletingId(deletedId);
      setActionError("");
      setNotice("");

      await requestApi(
        `${API_BASE_URL}/contact/messages/${deletedId}`,
        { method: "DELETE" }
      );

      const remaining = messages.filter(
        (message) => message.id !== deletedId
      );

      setMessages(remaining);
      setSelectedId(remaining[0]?.id ?? null);
      setReplyText("");
      setNotice("Message deleted successfully.");

      const remainingFilteredCount = remaining.filter((message) => {
        const query = search.trim().toLowerCase();

        const matchesFilter =
          filter === "all" ||
          (filter === "unread" && message.unread) ||
          (filter === "read" && !message.unread);

        const matchesSearch =
          !query ||
          [
            message.name,
            message.email,
            message.subject,
            message.message,
          ].some((value) => value.toLowerCase().includes(query));

        return matchesFilter && matchesSearch;
      }).length;

      setPage(
        Math.max(1, Math.min(page, Math.ceil(remainingFilteredCount / PAGE_SIZE) || 1))
      );
    } catch (error) {
      console.error("Unable to delete message:", error);
      setActionError(error.message || "Unable to delete the message.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-full text-gray-900">
      {/* Page heading */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Contact Messages
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage messages received from customers
          </p>
        </div>

        <Link
          to="/admin/edit-contact"
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#ff6b00] px-4 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-[#e85f00]"
        >
          <Pencil size={15} />
          Edit contact details
        </Link>
      </div>

      {/* Page-level feedback */}
      {pageError && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <p>{pageError}</p>
          <button
            type="button"
            onClick={loadMessages}
            className="mt-2 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      {notice && (
        <p
          role="status"
          className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {notice}
        </p>
      )}

      {actionError && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {actionError}
        </p>
      )}

      {/* Message filters */}
      <div className="mb-7 flex flex-wrap gap-2.5">
        {[
          { id: "all", label: "All messages", count: messages.length },
          { id: "unread", label: "Unread", count: unreadCount },
          { id: "read", label: "Read", count: readCount },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => changeFilter(tab.id)}
            className={`inline-flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition ${
              filter === tab.id
                ? "border-[#ff6b00] bg-[#ff6b00] text-white"
                : "border-gray-300 bg-white text-gray-600 hover:border-[#ff6b00]"
            }`}
          >
            {tab.label}
            <span
              className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs ${
                filter === tab.id
                  ? "bg-white/25 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Message list and details */}
      <div className="grid min-h-[650px] grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
        {/* Left panel */}
        <section className="flex min-h-[600px] min-w-0 flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="relative mb-4">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search messages"
              aria-label="Search messages"
              className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-500 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10"
            />
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="flex min-h-[250px] items-center justify-center text-sm text-gray-500">
                Loading messages...
              </div>
            ) : visibleMessages.length > 0 ? (
              visibleMessages.map((message) => (
                <button
                  key={message.id}
                  type="button"
                  onClick={() => selectMessage(message)}
                  className={`flex w-full items-start gap-3 border-b border-gray-200 px-3 py-4 text-left transition ${
                    selectedId === message.id
                      ? "rounded-xl border border-[#ff6b00] bg-[#fff6f0]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaeaea] text-sm text-gray-800">
                    {avatarText(message.name)}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <span className="truncate text-sm font-semibold text-gray-900">
                        {message.name}
                      </span>
                      <span className="shrink-0 text-xs text-[#687b9a]">
                        {message.date}
                      </span>
                    </span>

                    <span className="mt-1 block text-[13px] font-medium text-gray-800">
                      {message.subject}
                    </span>

                    <span className="mt-1 block truncate text-xs text-[#687b9a]">
                      {message.preview}
                    </span>

                    {message.reply && (
                      <span className="mt-1 block text-xs font-medium text-blue-600">
                        Replied
                      </span>
                    )}
                  </span>

                  {message.unread && (
                    <span className="mt-7 hidden min-w-[55px] rounded-md bg-[#ff6b00] px-2 py-1 text-center text-xs text-white sm:inline-block">
                      New
                    </span>
                  )}
                </button>
              ))
            ) : (
              <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                <Mail size={34} className="text-gray-300" />
                <p className="mt-3 text-sm font-medium text-gray-600">
                  {messages.length === 0
                    ? "No customer messages yet"
                    : "No messages found"}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {messages.length === 0
                    ? "Messages submitted through the Contact page will appear here."
                    : "Try another search or filter."}
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              {filteredMessages.length === 0
                ? "No messages"
                : `${startIndex + 1}–${Math.min(
                    startIndex + PAGE_SIZE,
                    filteredMessages.length
                  )} of ${filteredMessages.length}`}
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1 || loading}
                onClick={() =>
                  setPage((value) => Math.max(1, value - 1))
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={21} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => setPage(number)}
                  className={`h-9 min-w-9 rounded-lg border px-2 text-sm ${
                    currentPage === number
                      ? "border-[#ff6b00] bg-[#ff6b00] text-white"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === totalPages || loading}
                onClick={() =>
                  setPage((value) =>
                    Math.min(totalPages, value + 1)
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={21} />
              </button>
            </div>
          </div>
        </section>

        {/* Right panel */}
        <section className="flex min-h-[600px] min-w-0 flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          {loading ? (
            <div className="flex flex-1 items-center justify-center text-sm text-gray-500">
              Loading message details...
            </div>
          ) : selectedMessage ? (
            <>
              {/* Sender details */}
              <div className="flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-start">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eaeaea] text-base text-gray-800">
                  {avatarText(selectedMessage.name)}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="break-words font-semibold text-gray-900">
                    {selectedMessage.name}
                  </h3>
                  <p className="mt-1 break-all text-sm text-gray-700">
                    {selectedMessage.email}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-[#687b9a] sm:text-right">
                  {selectedMessage.date}
                </span>
              </div>

              {/* Message body */}
              <div className="flex-1 py-5">
                <h4 className="mb-5 text-base font-medium">
                  {selectedMessage.subject}
                </h4>

                <p className="whitespace-pre-line text-sm leading-[1.65] tracking-wide text-[#555]">
                  {selectedMessage.message}
                </p>

                {/* Saved reply */}
                {selectedMessage.reply && (
                  <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-semibold text-blue-800">
                      Your reply
                    </p>
                    <p className="mt-2 whitespace-pre-line text-sm text-gray-700">
                      {selectedMessage.reply}
                    </p>
                    {selectedMessage.repliedAt && (
                      <p className="mt-2 text-xs text-gray-500">
                        {formatDate(selectedMessage.repliedAt)}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Reply form */}
              <form onSubmit={handleReply} className="mt-auto border-t border-gray-100 pt-5">
                <label htmlFor="reply-message" className="sr-only">
                  Type your reply
                </label>

                <div className="relative">
                  <textarea
                    id="reply-message"
                    value={replyText}
                    onChange={(event) =>
                      setReplyText(event.target.value)
                    }
                    placeholder={
                      selectedMessage.reply
                        ? "Write an updated reply..."
                        : "Type your reply here..."
                    }
                    rows={4}
                    className="min-h-[125px] w-full resize-y rounded-2xl border border-gray-300 bg-white px-5 py-4 pr-12 text-sm outline-none transition placeholder:text-gray-500 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10"
                  />

                  <span
                    title="File attachments are not implemented"
                    className="absolute bottom-5 right-5 text-gray-400"
                  >
                    <Paperclip size={18} />
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={
                        !selectedMessage.unread ||
                        updatingReadId === selectedMessage.id
                      }
                      onClick={handleMarkAsRead}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#ff6b00] px-3 py-2 text-sm text-[#ff6b00] transition hover:bg-[#fff6f0] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Check size={16} />
                      {updatingReadId === selectedMessage.id
                        ? "Updating..."
                        : selectedMessage.unread
                          ? "Mark as read"
                          : "Read"}
                    </button>

                    <button
                      type="button"
                      disabled={deletingId === selectedMessage.id}
                      onClick={handleDelete}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                      {deletingId === selectedMessage.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!replyText.trim() || replying}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2860ed] px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Reply size={18} />
                    {replying ? "Saving..." : "Save Reply"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <MessageCircle size={40} className="text-gray-300" />
              <h3 className="mt-4 font-semibold text-gray-700">
                Select a message
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Choose a message from the list to view its details.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
