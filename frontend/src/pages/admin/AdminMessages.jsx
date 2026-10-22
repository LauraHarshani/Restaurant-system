
import { useMemo, useState } from "react";
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
} from "lucide-react";

const initialMessages = [
  {
    id: 1,
    name: "Minindu Rajapaksha",
    email: "minindurajapaksha@ex.com",
    subject: "Reservation inquiry",
    date: "Oct 10, 2026 3:50 PM",
    preview: "Hi, I'd like to know if you have tables available...",
    message:
      "Hi, I'd like to know if you have tables available for this Saturday evening. We are group of 4 and would prefer a table around 7.00 PM.\n\nPlease let me know if a reservation is possible.\nthank you\n\nBest Regards,\nMinindu",
    unread: true,
  },
  {
    id: 2,
    name: "Kavindi Perera",
    email: "kavindi@example.com",
    subject: "Menu inquiry",
    date: "Oct 10, 2026 2:35 PM",
    preview: "Could you please share your vegetarian options...",
    message:
      "Hello Flame & Crust team,\n\nCould you please share your vegetarian options? I would also like to know whether you have vegan-friendly meals.\n\nThank you!",
    unread: true,
  },
  {
    id: 3,
    name: "Nimal Fernando",
    email: "nimal@example.com",
    subject: "Delivery inquiry",
    date: "Oct 10, 2026 1:15 PM",
    preview: "I would like to know if delivery is available...",
    message:
      "Hello,\n\nI would like to know if delivery is available in Colombo 05 and what the delivery fee would be.\n\nThanks.",
    unread: true,
  },
  {
    id: 4,
    name: "Sarah Silva",
    email: "sarah@example.com",
    subject: "Feedback",
    date: "Oct 9, 2026 5:20 PM",
    preview: "I really enjoyed the food at your restaurant...",
    message:
      "Hi team,\n\nI really enjoyed the food at your restaurant. The service was excellent, and I wanted to share my appreciation.\n\nKeep up the great work!",
    unread: true,
  },
  {
    id: 5,
    name: "Kasun Jayawardena",
    email: "kasun@example.com",
    subject: "Order inquiry",
    date: "Oct 9, 2026 11:40 AM",
    preview: "I have a question about my recent order...",
    message:
      "Hello,\n\nI have a question about my recent order. Could someone help me check its status?\n\nThank you.",
    unread: true,
  },
  {
    id: 6,
    name: "Amaya Peris",
    email: "amaya@example.com",
    subject: "Catering inquiry",
    date: "Oct 8, 2026 4:10 PM",
    preview: "Do you offer catering for private events...",
    message:
      "Hello Flame & Crust,\n\nDo you offer catering for private events? I am planning a small event and would appreciate some information.\n\nBest regards,\nAmaya",
    unread: true,
  },
  {
    id: 7,
    name: "Tharindu Silva",
    email: "tharindu@example.com",
    subject: "Opening hours",
    date: "Oct 8, 2026 10:30 AM",
    preview: "Could you confirm your weekend opening hours...",
    message:
      "Hi,\n\nCould you confirm your weekend opening hours?\n\nThanks!",
    unread: true,
  },
  {
    id: 8,
    name: "Dinithi Perera",
    email: "dinithi@example.com",
    subject: "Reservation inquiry",
    date: "Oct 7, 2026 6:00 PM",
    preview: "Can I make a reservation for two people...",
    message:
      "Hello,\n\nCan I make a reservation for two people this weekend?\n\nPlease let me know. Thank you.",
    unread: true,
  },
  {
    id: 9,
    name: "Ravindu Costa",
    email: "ravindu@example.com",
    subject: "Payment inquiry",
    date: "Oct 7, 2026 2:20 PM",
    preview: "I would like to ask about available payment methods...",
    message:
      "Hello,\n\nI would like to ask about the payment methods available for online orders.\n\nThank you.",
    unread: false,
  },
  {
    id: 10,
    name: "Ishara Wickramasinghe",
    email: "ishara@example.com",
    subject: "General inquiry",
    date: "Oct 6, 2026 9:45 AM",
    preview: "I would like some information about your restaurant...",
    message:
      "Hi there,\n\nI would like some information about your restaurant and the services you offer.\n\nThank you.",
    unread: false,
  },
];

export default function AdminMessages() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState(1);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState({});

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

  const pageSize = 5;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredMessages.length / pageSize)
  );
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const visibleMessages = filteredMessages.slice(
    startIndex,
    startIndex + pageSize
  );

  const selectedMessage =
    messages.find((message) => message.id === selectedId) || null;

  const avatarText = (name) =>
    name
      .split(" ")
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
  };

  const updateMessageStatus = (id, unread) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, unread } : message
      )
    );
  };

  const handleReply = (event) => {
    event.preventDefault();

    if (!selectedMessage || !replyText.trim()) return;

    setReplies((current) => ({
      ...current,
      [selectedMessage.id]: [
        ...(current[selectedMessage.id] || []),
        {
          text: replyText.trim(),
          date: new Date().toLocaleString(),
        },
      ],
    }));

    setReplyText("");
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
        {/* Left panel: message list */}
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
            {visibleMessages.length > 0 ? (
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
                  </span>

                  {message.unread && (
                    <span className="mt-7 hidden min-w-[68px] rounded-md bg-[#ff6b00] px-2 py-1 text-center text-xs text-white sm:inline-block">
                      New
                    </span>
                  )}
                </button>
              ))
            ) : (
              <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                <Mail size={34} className="text-gray-300" />
                <p className="mt-3 text-sm font-medium text-gray-600">
                  No messages found
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Try another search or filter.
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
                    startIndex + pageSize,
                    filteredMessages.length
                  )} of ${filteredMessages.length}`}
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
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
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((value) => Math.min(totalPages, value + 1))
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={21} />
              </button>
            </div>
          </div>
        </section>

        {/* Right panel: selected message */}
        <section className="flex min-h-[600px] min-w-0 flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          {selectedMessage ? (
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

                {/* Replies */}
                {(replies[selectedMessage.id] || []).map(
                  (reply, index) => (
                    <div
                      key={`${selectedMessage.id}-reply-${index}`}
                      className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4"
                    >
                      <p className="text-xs font-semibold text-blue-800">
                        Your reply
                      </p>
                      <p className="mt-2 whitespace-pre-line text-sm text-gray-700">
                        {reply.text}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        {reply.date}
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* Reply form */}
              <form onSubmit={handleReply} className="mt-auto pt-5">
                <label htmlFor="reply-message" className="sr-only">
                  Type your reply
                </label>

                <div className="relative">
                  <textarea
                    id="reply-message"
                    value={replyText}
                    onChange={(event) => setReplyText(event.target.value)}
                    placeholder="Type your message here..."
                    rows={4}
                    className="min-h-[125px] w-full resize-y rounded-2xl border border-gray-300 bg-white px-5 py-4 pr-12 text-sm outline-none transition placeholder:text-gray-500 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10"
                  />

                  <button
                    type="button"
                    aria-label="Attach file (not implemented)"
                    title="File attachment is not implemented"
                    className="absolute bottom-5 right-5 text-gray-700 hover:text-[#ff6b00]"
                  >
                    <Paperclip size={18} />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap justify-end gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateMessageStatus(
                        selectedMessage.id,
                        !selectedMessage.unread
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#ff6b00] px-3 py-2 text-sm text-[#ff6b00] transition hover:bg-[#fff6f0]"
                  >
                    <Check size={16} />
                    {selectedMessage.unread
                      ? "Mark as read"
                      : "Mark as unread"}
                  </button>

                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2860ed] px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Reply size={18} />
                    Reply
                  </button>
                </div>

                <p className="mt-3 text-right text-xs text-gray-400">
                  Replies are currently stored in this page's state only.
                </p>
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
