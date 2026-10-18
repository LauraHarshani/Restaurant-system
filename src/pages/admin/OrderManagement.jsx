import { useState } from "react";
import { Link } from "react-router-dom";
import { orders as initialOrders } from "../../data/mockData";
import { Plus, Download, Search, MoreHorizontal, Printer } from "lucide-react";

export default function OrderManagement() {
  const [orderList, setOrderList] = useState(initialOrders);
  const [selected, setSelected] = useState(initialOrders[1]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All orders");

  // 1. Search & Filter Logic
  const filteredOrders = orderList.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || 
                        o.customer.toLowerCase().includes(search.toLowerCase());
    
    let matchFilter = true;
    if (filter === "Active") matchFilter = ["New", "Preparing", "Ready"].includes(o.status);
    if (filter === "Completed") matchFilter = ["Delivered", "Cancelled"].includes(o.status);
    
    return matchSearch && matchFilter;
  });

  // 2. Update Status Function
  const updateOrderStatus = (id, newStatus) => {
    setOrderList(orderList.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selected.id === id) {
      setSelected({ ...selected, status: newStatus });
    }
  };

  // 3. Export CSV Function
  const handleExport = () => {
    const headers = ["Order ID", "Customer", "Type", "Total (LKR)", "Status", "Time"];
    const csvData = orderList.map(o => [o.id, o.customer, o.type, o.total, o.status, o.time].join(","));
    const csvContent = [headers.join(","), ...csvData].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 4. Print Receipt Function
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${selected.id}</title>
          <style>
            body { font-family: monospace; padding: 20px; max-width: 400px; margin: auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .divider { border-top: 1px dashed #000; margin: 10px 0; }
            .item { display: flex; justify-content: space-between; margin-bottom: 5px; }
            .total { font-weight: bold; font-size: 1.2em; display: flex; justify-content: space-between; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2> Flame & Crust</h2>
            <p>123 Food Street, Colombo 03</p>
            <p>+94 11 234 5678</p>
          </div>
          <div class="divider"></div>
          <p><strong>Order:</strong> ${selected.id}</p>
          <p><strong>Customer:</strong> ${selected.customer}</p>
          <p><strong>Date:</strong> ${selected.date} ${selected.time}</p>
          <div class="divider"></div>
          ${selected.items.map(item => `
            <div class="item">
              <span>${item.qty}x ${item.name}</span>
              <span>Rs. ${item.qty * item.price}</span>
            </div>
          `).join('')}
          <div class="divider"></div>
          <div class="item"><span>Subtotal:</span><span>Rs. ${selected.subtotal}</span></div>
          <div class="item"><span>Delivery:</span><span>Rs. ${selected.deliveryFee}</span></div>
          <div class="total"><span>TOTAL:</span><span>Rs. ${selected.total}</span></div>
          <div class="divider"></div>
          <p style="text-align:center;">Thank you for dining with us!</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 250);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-[32px] font-bold text-[#1C1917]">
            Keep every order moving
          </h1>
          <p className="text-gray-500 text-[14px] mt-1">
            Track incoming orders and coordinate service from kitchen to customer.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="border border-gray-200 bg-white px-4 py-2.5 rounded-lg text-[14px] font-medium text-[#1C1917] flex items-center gap-2 hover:bg-gray-50 transition">
            <Download size={16} /> Export orders
          </button>
          <Link to="/admin/orders/create" className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-lg text-[14px] font-medium flex items-center gap-2 shadow-sm transition">
            <Plus size={16} /> Create order
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-600 text-[13px] font-medium">Today's orders</p>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </div>
          <p className="font-display text-[36px] font-bold text-[#1C1917] leading-none mb-2">{orderList.length < 10 ? "0" + orderList.length : orderList.length}</p>
          <p className="text-gray-400 text-[11px]">Friday, 9 October</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-600 text-[13px] font-medium">Active orders</p>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
          </div>
          <p className="font-display text-[36px] font-bold text-[#1C1917] leading-none mb-2">{orderList.filter(o => ["New", "Preparing", "Ready"].includes(o.status)).length < 10 ? "0" + orderList.filter(o => ["New", "Preparing", "Ready"].includes(o.status)).length : orderList.filter(o => ["New", "Preparing", "Ready"].includes(o.status)).length}</p>
          <p className="text-gray-400 text-[11px]">1 new  1 preparing  1 ready</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-600 text-[13px] font-medium">Delivered</p>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <p className="font-display text-[36px] font-bold text-[#1C1917] leading-none mb-2">{orderList.filter(o => o.status === "Delivered").length < 10 ? "0" + orderList.filter(o => o.status === "Delivered").length : orderList.filter(o => o.status === "Delivered").length}</p>
          <p className="text-gray-400 text-[11px]">1 cancelled order excluded</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
         <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search order ID or customer" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" />
         </div>
         <div className="flex gap-2 w-full md:w-auto flex-wrap">
            <button onClick={() => setFilter("All orders")} className={"px-4 py-1.5 rounded-lg text-sm font-medium transition " + (filter === "All orders" ? "bg-[#F97316]/10 text-[#F97316]" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50")}>All orders {orderList.length}</button>
            <button onClick={() => setFilter("Active")} className={"px-4 py-1.5 rounded-lg text-sm font-medium transition " + (filter === "Active" ? "bg-[#F97316]/10 text-[#F97316]" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50")}>Active 3</button>
            <button onClick={() => setFilter("Completed")} className={"px-4 py-1.5 rounded-lg text-sm font-medium transition " + (filter === "Completed" ? "bg-[#F97316]/10 text-[#F97316]" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50")}>Completed 1</button>
            <button className="px-4 py-1.5 rounded-lg text-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">Today <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline ml-1"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
            <h2 className="font-bold text-[14px] text-[#1C1917]">Today's orders</h2>
            <span className="text-[11px] text-gray-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Updated 12:45 pm</span>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="grid grid-cols-12 gap-4 p-3 text-[11px] font-medium text-gray-500 bg-white">
               <div className="col-span-4">Order / Type</div>
               <div className="col-span-5">Customer / Items</div>
               <div className="col-span-3 text-right">Total / Status</div>
            </div>

            {filteredOrders.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelected(o)}
                className={"w-full text-left p-4 hover:bg-gray-50 transition border-l-2 " + (selected.id === o.id ? "bg-[#F97316]/5 border-[#F97316]" : "border-transparent")}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <p className="font-bold text-[13px] text-[#1C1917] mb-0.5">{o.id}</p>
                    <p className="text-[11px] text-gray-500">{o.time}  {o.type}</p>
                  </div>
                  <div className="col-span-5">
                    <p className="font-medium text-[13px] text-[#1C1917] mb-0.5">{o.customer}</p>
                    <p className="text-[11px] text-gray-500">{o.items.length} item{o.items.length > 1 ? "s" : ""}</p>
                  </div>
                  <div className="col-span-3 text-right">
                    <p className="font-bold text-[13px] text-[#1C1917] mb-1">Rs. {o.total}.00</p>
                    <span className={"inline-block text-[10px] font-medium px-2 py-0.5 rounded-full " + (
                      o.status === "New" ? "bg-orange-50 text-orange-600 border border-orange-100" :
                      o.status === "Preparing" ? "bg-yellow-50 text-yellow-700 border border-yellow-100" :
                      o.status === "Ready" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                      o.status === "Delivered" ? "bg-green-50 text-green-600 border border-green-100" :
                      "bg-red-50 text-red-600 border border-red-100"
                    )}>
                      {o.status}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50/50 text-[12px] text-gray-500">
             <span>Showing 1-{filteredOrders.length} of {filteredOrders.length} orders</span>
             <button className="flex items-center gap-1 hover:text-gray-800">Newest first <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[16px] text-[#1C1917]">Order #{selected.id}</h2>
            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
          </div>
          
          <div className="flex justify-between items-center mb-6">
             <span className="text-[11px] text-gray-500">{selected.date}  {selected.time}</span>
             <div className="flex gap-2">
                <span className={"text-[10px] font-medium px-2 py-0.5 rounded-full " + (
                      selected.status === "New" ? "bg-orange-50 text-orange-600 border border-orange-100" :
                      selected.status === "Preparing" ? "bg-yellow-50 text-yellow-700 border border-yellow-100" :
                      selected.status === "Ready" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                      selected.status === "Delivered" ? "bg-green-50 text-green-600 border border-green-100" :
                      "bg-red-50 text-red-600 border border-red-100"
                )}>{selected.status}</span>
                <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Paid  Card</span>
             </div>
          </div>

          <div className="text-[13px] space-y-1 mb-6 pb-6 border-b border-gray-100">
            <p className="font-bold text-[#1C1917]">{selected.customer}</p>
            <p className="text-gray-500 text-[12px]">{selected.phone}</p>
            <p className="text-gray-500 text-[12px]">{selected.address}</p>
            <div className="flex justify-between mt-2">
               <span className="text-[11px] font-medium text-[#F97316] bg-[#F97316]/10 px-2 py-1 rounded">{selected.type}</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">Estimated delivery  1:10 pm</p>
          </div>

          <div className="mb-6 pb-6 border-b border-gray-100">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Items  {selected.items.length}</p>
            <div className="space-y-3">
              {selected.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     {item.image ? (
                        <img src={item.image} className="w-10 h-10 rounded object-cover border border-gray-200" />
                     ) : (
                        <div className="w-10 h-10 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] text-gray-400">No img</div>
                     )}
                     <div>
                        <p className="text-[12px] font-medium text-[#1C1917]">{item.name}</p>
                        <p className="text-[11px] text-gray-500">x {item.qty}  Rs. {item.price}</p>
                     </div>
                  </div>
                  <p className="text-[12px] font-medium text-[#1C1917]">Rs. {item.qty * item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {selected.note && (
            <div className="mb-6 pb-6 border-b border-gray-100">
               <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Customer note</p>
               <p className="text-[12px] text-[#1C1917] italic">"{selected.note}"</p>
            </div>
          )}

          <div className="text-[12px] space-y-2 mb-6">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span><span>Rs. {selected.subtotal}.00</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery fee</span><span>Rs. {selected.deliveryFee}.00</span>
            </div>
            <div className="flex justify-between font-bold text-[15px] text-[#1C1917] pt-2 border-t border-gray-100 mt-2">
              <span>Total paid</span><span>Rs. {selected.total}.00</span>
            </div>
          </div>

          <div className="mt-auto space-y-2">
             {/* Mark as ready - Wada karanawa */}
             <button 
               onClick={() => updateOrderStatus(selected.id, "Ready")}
               className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-2.5 rounded-lg font-medium text-[13px] transition"
             >
               Mark as ready
             </button>
             
             <div className="grid grid-cols-2 gap-2">
                {/* Print receipt - Wada karanawa */}
                <button onClick={handlePrint} className="border border-gray-200 text-[#1C1917] py-2 rounded-lg font-medium text-[12px] flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                   <Printer size={14} /> Print receipt
                </button>
                
                {/* Cancel order - Wada karanawa */}
                <button 
                  onClick={() => updateOrderStatus(selected.id, "Cancelled")}
                  className="border border-red-200 text-red-600 py-2 rounded-lg font-medium text-[12px] hover:bg-red-50 transition"
                >
                   Cancel order
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
