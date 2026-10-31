import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Download, Search, Printer, RefreshCw } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get the JWT token from the browser storage.
const getAuthHeaders = (includeJson = false) => {
  const token =
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("adminToken");

  return {
    ...(includeJson ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const activeStatuses = ["New", "Preparing", "Ready"];

const formatPrice = (price) => `Rs. ${Number(price || 0).toLocaleString("en-LK")}`;
const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-LK");
};
const formatTime = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleTimeString("en-LK", { hour: "numeric", minute: "2-digit" });
};
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));

export default function OrderManagement() {
  const [orderList, setOrderList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All orders");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to load orders.");
      }
      const orders = Array.isArray(result.orders) ? result.orders : [];
      setOrderList(orders);
      setSelectedId((current) => orders.some((order) => order.id === current)
        ? current
        : orders[0]?.id ?? null);
    } catch (fetchError) {
      setError(fetchError.message || "Unable to load orders. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const selected = orderList.find((order) => order.id === selectedId) || null;
  const filteredOrders = useMemo(() => orderList.filter((order) => {
    const query = search.toLowerCase();
    const matchesSearch = order.id.toLowerCase().includes(query)
      || order.customer.toLowerCase().includes(query);
    const matchesFilter = filter === "All orders"
      || (filter === "Active" && activeStatuses.includes(order.status))
      || (filter === "Completed" && ["Completed", "Delivered", "Cancelled"].includes(order.status));
    return matchesSearch && matchesFilter;
  }), [filter, orderList, search]);

  const todayOrders = orderList.filter((order) => new Date(order.createdAt).toDateString() === new Date().toDateString());
  const activeOrders = orderList.filter((order) => activeStatuses.includes(order.status));
  const completedOrders = orderList.filter((order) => ["Completed", "Delivered"].includes(order.status));

  const updateOrderStatus = async (id, status) => {
    setUpdating(true);
    setError("");
    try {
      const response = await fetch(
        `${API_URL}/orders/${encodeURIComponent(id)}/status`,
        {
          method: "PATCH",
          headers: getAuthHeaders(true),
          body: JSON.stringify({ status }),
        }
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to update order status.");
      }
      setOrderList((current) => current.map((order) => order.id === id ? result.order : order));
    } catch (updateError) {
      setError(updateError.message || "Unable to update order status.");
    } finally {
      setUpdating(false);
    }
  };

  const handleExport = () => {
    const headers = ["Order ID", "Customer", "Type", "Total (LKR)", "Status", "Created At"];
    const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const rows = orderList.map((order) => [order.id, order.customer, order.type, order.total, order.status, order.createdAt]
      .map(csvCell).join(","));
    const blob = new Blob([[headers.map(csvCell).join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orders_export_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (!selected) return;
    const printWindow = window.open("", "", "width=600,height=600");
    if (!printWindow) return;
    const itemRows = selected.items.map((item) => `<div class="row"><span>${item.qty} × ${escapeHtml(item.name)}</span><span>${formatPrice(item.qty * item.price)}</span></div>`).join("");
    printWindow.document.write(`<html><head><title>Receipt ${escapeHtml(selected.id)}</title><style>body{font-family:monospace;padding:20px;max-width:420px;margin:auto}.center{text-align:center}.row{display:flex;justify-content:space-between;margin:8px 0}.divider{border-top:1px dashed #555;margin:12px 0}.total{font-weight:bold}</style></head><body><div class="center"><h2>Flame &amp; Crust</h2><p>Order Receipt</p></div><div class="divider"></div><p>Order: ${escapeHtml(selected.id)}</p><p>Customer: ${escapeHtml(selected.customer)}</p><p>Date: ${escapeHtml(formatDate(selected.createdAt))} ${escapeHtml(formatTime(selected.createdAt))}</p><div class="divider"></div>${itemRows}<div class="divider"></div><div class="row"><span>Subtotal</span><span>${formatPrice(selected.subtotal)}</span></div><div class="row"><span>Delivery</span><span>${formatPrice(selected.deliveryFee)}</span></div><div class="row total"><span>Total</span><span>${formatPrice(selected.total)}</span></div></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const statusClass = (status) => ({
    New: "bg-orange-50 text-orange-600 border-orange-100",
    Preparing: "bg-yellow-50 text-yellow-700 border-yellow-100",
    Ready: "bg-blue-50 text-blue-600 border-blue-100",
    Completed: "bg-green-50 text-green-600 border-green-100",
    Delivered: "bg-green-50 text-green-600 border-green-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
  }[status] || "bg-gray-50 text-gray-600 border-gray-100");

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Keep every order moving</h1>
          <p className="mt-1 text-[14px] text-gray-500">Track incoming orders and coordinate service from kitchen to customer.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchOrders} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[14px] font-medium text-[#1C1917] hover:bg-gray-50"><RefreshCw size={16} /> Refresh</button>
          <button onClick={handleExport} disabled={!orderList.length} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[14px] font-medium text-[#1C1917] hover:bg-gray-50 disabled:opacity-50"><Download size={16} /> Export orders</button>
          <Link to="/admin/orders/create" className="flex items-center gap-2 rounded-lg bg-[#F97316] px-5 py-2.5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#EA580C]"><Plus size={16} /> Create order</Link>
        </div>
      </div>

      {error && <div role="alert" className="mb-5 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><span>{error}</span><button onClick={fetchOrders} className="font-semibold underline">Retry</button></div>}

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {[["Today's orders", todayOrders.length], ["Active orders", activeOrders.length], ["Completed", completedOrders.length]].map(([label, count]) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><p className="mb-4 text-[13px] font-medium text-gray-600">{label}</p><p className="font-display mb-2 text-[36px] font-bold leading-none text-[#1C1917]">{String(count).padStart(2, "0")}</p><p className="text-[11px] text-gray-400">From saved orders</p></div>
        ))}
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {["All orders", "Active", "Completed"].map((option) => <button key={option} onClick={() => setFilter(option)} className={`rounded-lg px-4 py-2 text-sm ${filter === option ? "bg-[#F97316]/10 font-semibold text-[#F97316]" : "border border-gray-200 bg-white text-gray-600"}`}>{option}</button>)}
        </div>
        <div className="relative w-full sm:w-72"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search order or customer" className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-orange-400" /></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/50 p-4"><h2 className="text-[14px] font-bold text-[#1C1917]">Orders</h2><span className="text-[11px] text-gray-500">{orderList.length} total</span></div>
          {loading ? <p className="p-8 text-center text-sm text-gray-500">Loading orders…</p> : filteredOrders.length === 0 ? <p className="p-8 text-center text-sm text-gray-500">{orderList.length ? "No orders match your search." : "No saved orders yet."}</p> : <div className="divide-y divide-gray-100">
            <div className="grid grid-cols-12 gap-4 bg-white p-3 text-[11px] font-medium text-gray-500"><div className="col-span-4">Order / Type</div><div className="col-span-5">Customer / Items</div><div className="col-span-3 text-right">Total / Status</div></div>
            {filteredOrders.map((order) => <button key={order.id} onClick={() => setSelectedId(order.id)} className={`w-full border-l-2 p-4 text-left transition hover:bg-gray-50 ${selectedId === order.id ? "border-[#F97316] bg-[#F97316]/5" : "border-transparent"}`}><div className="grid grid-cols-12 items-center gap-4"><div className="col-span-4 min-w-0"><p className="truncate text-[13px] font-bold text-[#1C1917]">{order.id}</p><p className="text-[11px] text-gray-500">{formatTime(order.createdAt)} · {order.type}</p></div><div className="col-span-5 min-w-0"><p className="truncate text-[13px] font-medium text-[#1C1917]">{order.customer}</p><p className="text-[11px] text-gray-500">{order.items.length} line item{order.items.length === 1 ? "" : "s"}</p></div><div className="col-span-3 text-right"><p className="mb-1 text-[13px] font-bold text-[#1C1917]">{formatPrice(order.total)}</p><span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusClass(order.status)}`}>{order.status === "Completed" ? "Delivered" : order.status}</span></div></div></button>)}
          </div>}
        </section>

        <aside className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {!selected ? <div className="flex flex-1 items-center justify-center text-sm text-gray-500">Select an order to view details.</div> : <>
            <div className="mb-4 flex items-start justify-between gap-3"><h2 className="break-all text-base font-bold text-[#1C1917]">Order #{selected.id}</h2><span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusClass(selected.status)}`}>{selected.status === "Completed" ? "Delivered" : selected.status}</span></div>
            <p className="mb-5 text-[11px] text-gray-500">{formatDate(selected.createdAt)} · {formatTime(selected.createdAt)}</p>
            <div className="mb-5 space-y-1 border-b border-gray-100 pb-5 text-[12px]"><p className="font-bold text-[#1C1917]">{selected.customer}</p>{selected.email && <p className="break-all text-gray-500">{selected.email}</p>}<p className="text-gray-500">{selected.phone}</p><p className="whitespace-pre-line text-gray-500">{selected.address || "No address provided"}</p><span className="mt-2 inline-block rounded bg-[#F97316]/10 px-2 py-1 text-[11px] font-medium text-[#F97316]">{selected.type}</span></div>
            <div className="mb-5 space-y-3 border-b border-gray-100 pb-5"><p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Items · {selected.items.length}</p>{selected.items.map((item) => <div key={item.id} className="flex justify-between gap-3 text-[12px]"><span className="text-[#1C1917]">{item.name} <span className="text-gray-500">× {item.qty}</span></span><span className="shrink-0 text-gray-700">{formatPrice(item.qty * item.price)}</span></div>)}</div>
            <div className="mb-6 space-y-2 text-[12px]"><div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{formatPrice(selected.subtotal)}</span></div><div className="flex justify-between text-gray-500"><span>Delivery fee</span><span>{formatPrice(selected.deliveryFee)}</span></div><div className="mt-2 flex justify-between border-t border-gray-100 pt-3 text-[15px] font-bold text-[#1C1917]"><span>Total</span><span>{formatPrice(selected.total)}</span></div></div>
            <div className="mt-auto space-y-2"><button disabled={updating || !activeStatuses.includes(selected.status)} onClick={() => updateOrderStatus(selected.id, "Ready")} className="w-full rounded-lg bg-[#F97316] py-2.5 text-[13px] font-medium text-white transition hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-50">{updating ? "Saving…" : "Mark as ready"}</button><div className="grid grid-cols-2 gap-2"><button onClick={handlePrint} className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-[12px] font-medium text-[#1C1917] hover:bg-gray-50"><Printer size={14} /> Print receipt</button><button disabled={updating || !activeStatuses.includes(selected.status)} onClick={() => updateOrderStatus(selected.id, "Cancelled")} className="rounded-lg border border-red-200 py-2 text-[12px] font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50">Cancel order</button></div><button disabled={updating || selected.status !== "Ready"} onClick={() => updateOrderStatus(selected.id, "Completed")} className="w-full rounded-lg border border-green-200 py-2 text-[12px] font-medium text-green-700 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50">Mark as delivered</button></div>
          </>}
        </aside>
      </div>
    </div>
  );
}
