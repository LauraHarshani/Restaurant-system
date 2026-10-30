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

// Backend API base URL from the frontend environment variables.
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Number of customer messages displayed on each page.
const PAGE_SIZE = 5;

// Format database dates into readable date and time strings.
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

// Convert backend message data into the format used by the frontend.
function normalizeMessage(message) {
  return {
    ...message,

    id: Number(message.id),
    name: message.name || "Unknown sender",
    email: message.email || "",
    subject: message.subject || "No subject",
    message: message.message || "",

    // Format the original customer message date.
    date: formatDate(message.createdAt),

    // Create a short preview for the message list.
    preview: (message.message || "").replace(/\s+/g, " ").trim(),

    // Convert the backend isRead field into the frontend unread field.
    unread: !message.isRead,

    // Keep all replies associated with this customer message.
    replies: Array.isArray(message.replies) ? message.replies : [],
  };
}

// Reusable API function to handle GET, POST, PATCH and DELETE requests.
async function requestApi(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  // Safely parse the server response.
  const data = await response.json().catch(() => ({}));

  // Display backend errors when a request fails.
  if (!response.ok) {
    throw new Error(
      data.message || data.error || "The request could not be completed."
    );
  }

  return data;
}

export default function AdminMessages() {
  // Store all customer messages retrieved from the backend.
  const [messages, setMessages] = useState([]);

  // Store the ID of the currently selected customer message.
  const [selectedId, setSelectedId] = useState(null);

  // Message filtering and searching states.
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Pagination state.
  const [page, setPage] = useState(1);

  // Store the reply currently being written by the admin.
  const [replyText, setReplyText] = useState("");

  // Loading and feedback states.
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");

  // Track individual actions to prevent duplicate requests.
  const [replying, setReplying] = useState(false);
  const [updatingReadId, setUpdatingReadId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // --------------------------------------------------
  // LOAD CUSTOMER MESSAGES
  // --------------------------------------------------

  // Retrieve customer messages and their associated reply history.
  const loadMessages = useCallback(async () => {
    try {
      setLoading(true);
      setPageError("");

      const data = await requestApi(
        `${API_BASE_URL}/contact/messages`
      );

      // Support the backend response format { success, messages }.
      const list = Array.isArray(data)
        ? data
        : data.messages || data.data || [];

      if (!Array.isArray(list)) {
        throw new Error("The server returned an invalid messages list.");
      }

      // Convert backend records into frontend message objects.
      const normalized = list.map(normalizeMessage);

      setMessages(normalized);

      // Keep the current selection if it still exists.
      // Otherwise, automatically select the newest message.
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

  // Load messages when the Admin Messages page first opens.
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // --------------------------------------------------
  // MESSAGE COUNTS
  // --------------------------------------------------

  // Calculate unread and read message counts.
  const unreadCount = messages.filter(
    (message) => message.unread
  ).length;

  const readCount = messages.length - unreadCount;

  // --------------------------------------------------
  // SEARCH AND FILTER
  // --------------------------------------------------

  // Filter messages based on the selected tab and search input.
  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();

    return messages.filter((message) => {
      // Check whether the message matches the selected filter.
      const matchesFilter =
        filter === "all" ||
        (filter === "unread" && message.unread) ||
        (filter === "read" && !message.unread);

      // Search by customer name, email, subject or message content.
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

  // Calculate the number of pages required.
  const totalPages = Math.max(
    1,
    Math.ceil(filteredMessages.length / PAGE_SIZE)
  );

  // Prevent the current page from exceeding the available pages.
  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  // Display only the messages belonging to the current page.
  const visibleMessages = filteredMessages.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  // Find the currently selected customer message.
  const selectedMessage =
    messages.find((message) => message.id === selectedId) || null;

  // Generate customer initials for the avatar.
  const avatarText = (name) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  // Change the selected message filter.
  const changeFilter = (nextFilter) => {
    setFilter(nextFilter);
    setPage(1);
  };

  // Select a customer message from the left panel.
  const selectMessage = (message) => {
    setSelectedId(message.id);
    setReplyText("");
    setActionError("");
    setNotice("");
  };

  // --------------------------------------------------
  // MARK MESSAGE AS READ
  // --------------------------------------------------

  const handleMarkAsRead = async () => {
    // Do nothing if there is no selected message or it is already read.
    if (!selectedMessage || !selectedMessage.unread) return;

    try {
      setUpdatingReadId(selectedMessage.id);
      setActionError("");
      setNotice("");

      // Update the read status in the backend.
      await requestApi(
        `${API_BASE_URL}/contact/messages/${selectedMessage.id}/read`,
        {
          method: "PATCH",
        }
      );

      // Update the frontend immediately after a successful API request.
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

      setActionError(
        error.message || "Unable to mark message as read."
      );
    } finally {
      setUpdatingReadId(null);
    }
  };

  // --------------------------------------------------
  // SAVE MULTIPLE REPLIES
  // --------------------------------------------------

  const handleReply = async (event) => {
    event.preventDefault();

    // Validate the selected message and reply content.
    if (!selectedMessage || !replyText.trim()) return;

    try {
      setReplying(true);
      setActionError("");
      setNotice("");

      const reply = replyText.trim();

      // Send the new reply to the backend.
      // Each reply is saved as a separate ContactReply record.
      const data = await requestApi(
        `${API_BASE_URL}/contact/messages/${selectedMessage.id}/reply`,
        {
          method: "PATCH",
          body: JSON.stringify({ reply }),
        }
      );

      // Get the newly created reply returned by the backend.
      const newReply = data.reply;

      if (!newReply || !newReply.id) {
        throw new Error(
          "The reply was saved, but the server returned an unexpected response."
        );
      }

      // Add the new reply to the existing reply history.
      // Previous replies are preserved.
      setMessages((current) =>
        current.map((message) =>
          message.id === selectedMessage.id
            ? {
                ...message,
                replies: [
                  ...(message.replies || []),
                  newReply,
                ],
                unread: false,
              }
            : message
        )
      );

      // Clear the reply input after successful submission.
      setReplyText("");

      setNotice("Reply saved successfully.");
    } catch (error) {
      console.error("Unable to save reply:", error);

      setActionError(
        error.message || "Unable to save your reply."
      );
    } finally {
      setReplying(false);
    }
  };

  // --------------------------------------------------
  // DELETE CUSTOMER MESSAGE
  // --------------------------------------------------

  const handleDelete = async () => {
    if (!selectedMessage) return;

    // Ask for confirmation before permanently deleting the message.
    const confirmed = window.confirm(
      `Delete the message from ${selectedMessage.name}? This cannot be undone.`
    );

    if (!confirmed) return;

    const deletedId = selectedMessage.id;

    try {
      setDeletingId(deletedId);
      setActionError("");
      setNotice("");

      // Delete the message from the backend.
      // Associated replies are also deleted through the Prisma relation.
      await requestApi(
        `${API_BASE_URL}/contact/messages/${deletedId}`,
        {
          method: "DELETE",
        }
      );

      // Remove the deleted message from the frontend.
      const remaining = messages.filter(
        (message) => message.id !== deletedId
      );

      setMessages(remaining);

      // Select another message if available.
      setSelectedId(remaining[0]?.id ?? null);

      // Clear the reply input.
      setReplyText("");

      setNotice("Message deleted successfully.");

      // Recalculate pagination after deleting a message.
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

      const newTotalPages = Math.max(
        1,
        Math.ceil(remainingFilteredCount / PAGE_SIZE)
      );

      setPage((currentPage) =>
        Math.min(currentPage, newTotalPages)
      );
    } catch (error) {
      console.error("Unable to delete message:", error);

      setActionError(
        error.message || "Unable to delete the message."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // --------------------------------------------------
  // ADMIN MESSAGES UI
  // --------------------------------------------------

  return (
    <div className="min-h-full text-gray-900">

      {/* Page heading and edit contact details button */}
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

      {/* Display an error if messages cannot be loaded */}
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

      {/* Display successful operations */}
      {notice && (
        <p
          role="status"
          className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {notice}
        </p>
      )}

      {/* Display errors from reply, read and delete operations */}
      {actionError && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {actionError}
        </p>
      )}

      {/* Message filter buttons */}
      <div className="mb-7 flex flex-wrap gap-2.5">
        {[
          {
            id: "all",
            label: "All messages",
            count: messages.length,
          },
          {
            id: "unread",
            label: "Unread",
            count: unreadCount,
          },
          {
            id: "read",
            label: "Read",
            count: readCount,
          },
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

      {/* Message list and selected message details */}
      <div className="grid min-h-[650px] grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">

        {/* LEFT PANEL: Customer message list */}
        <section className="flex min-h-[600px] min-w-0 flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">

          {/* Search customer messages */}
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

          {/* Display messages or loading/empty states */}
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
                  {/* Customer avatar */}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaeaea] text-sm text-gray-800">
                    {avatarText(message.name)}
                  </span>

                  <span className="min-w-0 flex-1">

                    {/* Customer name and message date */}
                    <span className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <span className="truncate text-sm font-semibold text-gray-900">
                        {message.name}
                      </span>

                      <span className="shrink-0 text-xs text-[#687b9a]">
                        {message.date}
                      </span>
                    </span>

                    {/* Message subject */}
                    <span className="mt-1 block text-[13px] font-medium text-gray-800">
                      {message.subject}
                    </span>

                    {/* Short message preview */}
                    <span className="mt-1 block truncate text-xs text-[#687b9a]">
                      {message.preview}
                    </span>

                    {/* Show the number of saved replies */}
                    {message.replies?.length > 0 && (
                      <span className="mt-1 block text-xs font-medium text-blue-600">
                        {message.replies.length} repl
                        {message.replies.length === 1 ? "y" : "ies"}
                      </span>
                    )}
                  </span>

                  {/* Unread message indicator */}
                  {message.unread && (
                    <span className="mt-7 hidden min-w-[55px] rounded-md bg-[#ff6b00] px-2 py-1 text-center text-xs text-white sm:inline-block">
                      New
                    </span>
                  )}
                </button>
              ))
            ) : (
              // Display when no messages match the search or filter.
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

          {/* Pagination controls */}
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

              {/* Previous page */}
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

              {/* Page numbers */}
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

              {/* Next page */}
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

        {/* RIGHT PANEL: Selected customer message */}
        <section className="flex min-h-[600px] min-w-0 flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

          {loading ? (
            <div className="flex flex-1 items-center justify-center text-sm text-gray-500">
              Loading message details...
            </div>
          ) : selectedMessage ? (
            <>

              {/* Customer sender details */}
              <div className="flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-start">

                {/* Customer avatar */}
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

              {/* Original customer message and reply history */}
              <div className="flex-1 py-5">

                {/* Original customer message */}
                <h4 className="mb-5 text-base font-medium">
                  {selectedMessage.subject}
                </h4>

                <p className="whitespace-pre-line text-sm leading-[1.65] tracking-wide text-[#555]">
                  {selectedMessage.message}
                </p>

                {/* Display all replies saved for this customer message */}
                {selectedMessage.replies?.length > 0 && (
                  <div className="mt-6 space-y-4">

                    {selectedMessage.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="rounded-lg border border-blue-100 bg-blue-50 p-4"
                      >
                        <p className="text-xs font-semibold text-blue-800">
                          Your reply
                        </p>

                        {/* Reply content */}
                        <p className="mt-2 whitespace-pre-line text-sm text-gray-700">
                          {reply.reply}
                        </p>

                        {/* Individual reply date */}
                        <p className="mt-2 text-xs text-gray-500">
                          {formatDate(reply.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* REPLY FORM */}
              <form
                onSubmit={handleReply}
                className="mt-auto border-t border-gray-100 pt-5"
              >
                <label
                  htmlFor="reply-message"
                  className="sr-only"
                >
                  Type your reply
                </label>

                {/* Reply text area */}
                <div className="relative">
                  <textarea
                    id="reply-message"
                    value={replyText}
                    onChange={(event) =>
                      setReplyText(event.target.value)
                    }
                    placeholder="Write another reply..."
                    rows={4}
                    className="min-h-[125px] w-full resize-y rounded-2xl border border-gray-300 bg-white px-5 py-4 pr-12 text-sm outline-none transition placeholder:text-gray-500 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10"
                  />

                  {/* Attachment icon (visual only; file upload is not implemented) */}
                  <span
                    title="File attachments are not implemented"
                    className="absolute bottom-5 right-5 text-gray-400"
                  >
                    <Paperclip size={18} />
                  </span>
                </div>

                {/* Reply actions */}
                <div className="mt-5 flex flex-wrap justify-between gap-2">

                  <div className="flex flex-wrap gap-2">

                    {/* Mark message as read */}
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

                    {/* Delete selected message */}
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

                  {/* Save a new reply */}
                  <button
                    type="submit"
                    disabled={!replyText.trim() || replying}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2860ed] px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Reply size={18} />

                    {replying ? "Saving..." : "Save Reply"}
                  </button>
                </div>

                {/* Clarify that replies are stored, not emailed */}
                <p className="mt-3 text-right text-xs text-gray-400">
                  Replies are saved to the database. They are not emailed to customers.
                </p>
              </form>
            </>
          ) : (
            // Empty state when no customer message is selected.
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
