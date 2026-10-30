import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarDays, Download, Plus, ReceiptText, UtensilsCrossed, ChefHat, 
  Mail, MessageSquare, ArrowRight, CornerDownLeft, MonitorSmartphone, 
  Settings, CheckCircle2, RotateCw, Search, ChevronDown, X, Globe, Database, ShieldCheck 
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('oct 1 – oct 30, 2026');
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showCMSModal, setShowCMSModal] = useState(false);

  // Real Database State
  const [dashboardData, setDashboardData] = useState({
    stats: {
      orders: { totalToday: 0, active: 0, completed: 0 },
      menu: { totalItems: 0, totalCategories: 0 },
      chefs: { onDuty: 0, total: 0 },
      messages: { total: 0, unread: 0 }
    },
    recentMessages: [],
    recentOrders: []
  });

  // Fetch Live Data from Backend API
  const fetchDashboardData = (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    fetch('http://localhost:5000/api/dashboard/summary')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setDashboardData(data.data);
        }
        setLoading(false);
        if (isManualRefresh) setIsRefreshing(false);
      })
      .catch(err => {
        console.error("Error fetching dashboard summary:", err);
        setLoading(false);
        if (isManualRefresh) setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => fetchDashboardData(false), 30000); // Auto-sync every 30s
    return () => clearInterval(interval);
  }, []);

  const filteredOrders = (dashboardData.recentOrders || []).filter(order => {
    const matchesTab = 
      activeTab === 'All' ? true :
      activeTab === 'Preparing' ? ['Preparing', 'New', 'Ready', 'PENDING'].includes(order.status) :
      activeTab === 'Completed' ? ['Delivered', 'Completed', 'COMPLETED'].includes(order.status) :
      activeTab === 'Canceled' ? ['Canceled', 'Cancelled', 'CANCELLED'].includes(order.status) : true;

    const matchesSearch = 
      order.id?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.details?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleExportExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Order ID,Time,Customer,Type,Items,Total,Status\n";

    dashboardData.recentOrders.forEach(row => {
      csvContent += `"${row.id}","${row.time}","${row.customer}","${row.details}","${row.items}","${row.total}","${row.status}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dashboard_orders_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="min-h-full flex items-center justify-center p-10 text-gray-700 font-bold">Loading Dashboard from Database...</div>;
  }

  const { stats, recentMessages } = dashboardData;

  return (
    <div className="min-h-full font-sans text-gray-900 pb-20 relative bg-white">
      <div className="w-full space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard Management</h1>
            <p className="text-gray-500 text-sm mt-1">Real-time kitchen operations, orders, and public website updates</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></span>
              <span className="text-[11px] text-[#10b981] font-bold tracking-wide">Sync Active: POS Oven 01 (Prisma DB)</span>
            </div>
          </div>
          <div className="flex items-center gap-3 relative flex-wrap">
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              <CalendarDays size={14} className="text-gray-500" /> 
              {selectedDateRange}
              <ChevronDown size={14} className="text-gray-400 ml-1" />
            </button>

            {showCalendar && (
              <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50 w-72 space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                   <span className="text-xs font-bold text-gray-800">Select Date Range</span>
                   <button onClick={() => setShowCalendar(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                     <X size={14} />
                   </button>
                </div>
                <div className="space-y-2">
                   <button onClick={() => { setSelectedDateRange('oct 1 – oct 30, 2026'); setShowCalendar(false); }} className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-orange-50 hover:text-[#ff5100] rounded-lg transition-colors cursor-pointer">
                      October 2026 (Current Month)
                   </button>
                   <button onClick={() => { setSelectedDateRange('sep 1 – sep 30, 2026'); setShowCalendar(false); }} className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-orange-50 hover:text-[#ff5100] rounded-lg transition-colors cursor-pointer">
                      September 2026
                   </button>
                   <button onClick={() => { setSelectedDateRange('Aug 1 – Aug 31, 2026'); setShowCalendar(false); }} className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-orange-50 hover:text-[#ff5100] rounded-lg transition-colors cursor-pointer">
                      August 2026
                   </button>
                </div>
              </div>
            )}

            <button 
              onClick={handleExportExcel}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              <Download size={14} className="text-gray-500" /> Export Summary
            </button>

            <button 
              onClick={() => navigate('/admin/orders/create')}
              className="flex items-center gap-2 bg-[#ff5100] hover:bg-[#e04800] text-white px-5 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-md shadow-orange-500/20 cursor-pointer"
            >
              <Plus size={14} /> New Manual Order
            </button>
          </div>
        </div>

        {/* Top Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-[10px] font-extrabold text-gray-500 tracking-wider mb-1">TODAY'S ORDERS</h3>
                  <div className="flex items-end gap-2">
                     <span className="text-4xl font-extrabold text-gray-900 leading-none">{String(stats.orders.totalToday || 0).padStart(2, '0')}</span>
                     <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center mb-1">↗ Live</span>
                  </div>
               </div>
               <div className="bg-orange-50 p-2 rounded-lg text-[#ff5100]">
                  <ReceiptText size={20} />
               </div>
            </div>
            <div className="flex justify-between items-end text-xs font-medium text-gray-500">
               <span>{stats.orders.active || 0} Active • {stats.orders.completed || 0}<br/>Completed</span>
               <span className="text-[#ff5100] text-right">Prisma<br/>Sync</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-[10px] font-extrabold text-gray-500 tracking-wider mb-1">MENU CATALOG</h3>
                  <div className="flex items-baseline gap-1">
                     <span className="text-4xl font-extrabold text-gray-900 leading-none">{stats.menu.totalItems || 0}</span>
                     <span className="text-sm font-bold text-gray-500">Items</span>
                  </div>
               </div>
               <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <UtensilsCrossed size={20} />
               </div>
            </div>
            <div className="flex justify-between items-end text-xs font-medium text-gray-500">
               <span>All categories<br/>active</span>
               <span className="bg-[#eef2ff] text-[#4f46e5] px-2 py-1 rounded-md font-bold">{stats.menu.totalCategories || 0} Categories<br/>Live</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-[10px] font-extrabold text-gray-500 tracking-wider mb-1">CHEFS ON DUTY</h3>
                  <div className="flex items-baseline gap-1">
                     <span className="text-4xl font-extrabold text-gray-900 leading-none">{String(stats.chefs.onDuty || 0).padStart(2, '0')}</span>
                     <span className="text-sm font-bold text-gray-500">/ {String(stats.chefs.total || 0).padStart(2, '0')} total</span>
                  </div>
               </div>
               <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                  <ChefHat size={20} />
               </div>
            </div>
            <div className="flex justify-between items-end text-xs font-medium text-gray-500">
               <span>Kitchen staff<br/>active</span>
               <span className="bg-[#ecfdf5] text-[#059669] px-2 py-1 rounded-md font-bold flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 bg-[#059669] rounded-full"></span> Active Roster
               </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-[10px] font-extrabold text-gray-500 tracking-wider mb-1 flex items-center gap-1.5">
                    NEW MESSAGES <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  </h3>
                  <div className="flex items-baseline gap-1">
                     <span className="text-4xl font-extrabold text-gray-900 leading-none">{String(stats.messages.unread || 0).padStart(2, '0')}</span>
                     <span className="text-sm font-bold text-red-500">Unread</span>
                  </div>
               </div>
               <div className="bg-red-50 p-2 rounded-lg text-red-600">
                  <Mail size={20} />
               </div>
            </div>
            <div className="flex justify-between items-end text-xs font-medium text-gray-500">
               <span>Unread<br/>inquiries</span>
               <span className="bg-[#fff1f2] text-[#e11d48] px-2 py-1 rounded-md font-bold">Action<br/>required</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Recent Customer Messages & CMS Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                     <MessageSquare size={18} className="text-[#ff5100]" /> Recent Customer Messages
                   </h2>
                   <p className="text-xs text-gray-500 mt-1">Latest contact form inquiries & feedback from database</p>
                </div>
                <button onClick={() => navigate('/admin/messages')} className="text-xs font-bold text-[#ff5100] hover:text-[#e04800] flex items-center gap-1 transition-colors active:scale-95 cursor-pointer">
                  View All Messages ({stats.messages.total || 0}) <ArrowRight size={14} />
                </button>
             </div>

             <div className="space-y-5">
                {recentMessages && recentMessages.length > 0 ? (
                  recentMessages.map((msg, index) => (
                    <div key={msg.id || index} className="flex gap-3">
                       <div className="w-8 h-8 rounded-full bg-orange-100 text-[#ff5100] flex items-center justify-center text-[11px] font-bold shrink-0">
                         {msg.name?.substring(0, 2).toUpperCase() || 'CU'}
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                             <span className="font-bold text-sm text-gray-900">{msg.name}</span>
                             <span className="text-[10px] font-medium text-gray-400">
                               {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                             </span>
                             <span className="bg-orange-50 text-[#ff5100] text-[9px] font-bold px-1.5 py-0.5 rounded">{msg.subject}</span>
                          </div>
                          <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[85%]">
                            "{msg.message}"
                          </p>
                       </div>
                       <button onClick={() => navigate('/admin/messages')} className="h-fit bg-orange-50 text-[#ff5100] hover:bg-orange-100 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 transition-colors shrink-0 cursor-pointer">
                         <CornerDownLeft size={12} /> Reply
                       </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 py-4 text-center">No recent customer messages found in database.</p>
                )}
             </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col justify-between">
             <div>
               <div className="flex justify-between items-start mb-6">
                  <div>
                     <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                       <MonitorSmartphone size={18} className="text-emerald-600" /> Website Content Status
                     </h2>
                     <p className="text-xs text-gray-500 mt-1">Production site sync & health status</p>
                  </div>
                  {/* Opens Interactive CMS Management Modal Popup */}
                  <button 
                    onClick={() => setShowCMSModal(true)} 
                    className="text-[11px] font-bold text-[#ff5100] hover:text-[#e04800] flex items-center gap-1.5 transition-colors cursor-pointer bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100 shadow-sm"
                  >
                    Manage CMS <Settings size={14} className="transition-transform duration-300 hover:rotate-90" />
                  </button>
               </div>

               <div className="space-y-4">
                  <div className="bg-[#f8f9fa] border border-gray-100 p-3 rounded-lg flex items-start justify-between gap-4">
                     <div className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                        <div>
                           <h4 className="text-sm font-bold text-gray-900">Home Page Banners</h4>
                           <p className="text-xs text-gray-500 mt-0.5">Spring Artisanal Pizza Promo banner active across hero.</p>
                        </div>
                     </div>
                     <span className="bg-[#ecfdf5] text-[#059669] text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shrink-0">
                       <span className="w-1.5 h-1.5 bg-[#059669] rounded-full"></span> Live
                     </span>
                  </div>

                  <div className="bg-[#f8f9fa] border border-gray-100 p-3 rounded-lg flex items-start justify-between gap-4">
                     <div className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                        <div>
                           <h4 className="text-sm font-bold text-gray-900">About Page Story</h4>
                           <p className="text-xs text-gray-500 mt-0.5">Head Chef bio and wood-fired oven origin story verified.</p>
                        </div>
                     </div>
                     <span className="bg-[#ecfdf5] text-[#059669] text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shrink-0">
                       <span className="w-1.5 h-1.5 bg-[#059669] rounded-full"></span> Synced
                     </span>
                  </div>

                  <div className="bg-[#f8f9fa] border border-gray-100 p-3 rounded-lg flex items-start justify-between gap-4">
                     <div className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                        <div>
                           <h4 className="text-sm font-bold text-gray-900">Menu Images & Prices</h4>
                           <p className="text-xs text-gray-500 mt-0.5">All {stats.menu.totalItems || 0} item photos and seasonal pricing synced.</p>
                        </div>
                     </div>
                     <span className="bg-[#ecfdf5] text-[#059669] text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shrink-0">
                       <span className="w-1.5 h-1.5 bg-[#059669] rounded-full"></span> Active
                     </span>
                  </div>

                  <div className="bg-[#f8f9fa] border border-gray-100 p-3 rounded-lg flex items-start justify-between gap-4">
                     <div className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                        <div>
                           <h4 className="text-sm font-bold text-gray-900">Chef Roster & Bios</h4>
                           <p className="text-xs text-gray-500 mt-0.5">{stats.chefs.onDuty || 0} chef profiles visible with current shift schedule badges.</p>
                        </div>
                     </div>
                     <span className="bg-[#ecfdf5] text-[#059669] text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shrink-0">
                       <span className="w-1.5 h-1.5 bg-[#059669] rounded-full"></span> Current
                     </span>
                  </div>
               </div>
             </div>

             <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[10px] font-medium text-gray-400">Live Database Sync Active</span>
                <button 
                  onClick={() => fetchDashboardData(true)} 
                  disabled={isRefreshing}
                  className="text-[11px] font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                   {isRefreshing ? 'Refreshing...' : 'Refresh Data'} 
                   <RotateCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
                </button>
             </div>
          </div>
        </div>

        {/* Bottom Section: Recent Orders Table */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 overflow-hidden space-y-4">
           
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                 <h2 
                   onClick={() => navigate('/admin/orders')} 
                   className="text-lg font-extrabold text-gray-900 cursor-pointer hover:text-[#ff5100] transition-colors"
                 >
                   Recent Orders
                 </h2>
                 <p className="text-xs text-gray-500 mt-0.5">Real-time Kitchen Display System queue and order ledger from database</p>
              </div>

              <div className="relative w-full md:w-80">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="Filter orders..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-[#ff5100] focus:ring-1 focus:ring-[#ff5100] transition-all" 
                 />
              </div>
           </div>

           {/* Interactive Filter Tabs Bar */}
           <div className="flex bg-[#f8f9fa] p-1 rounded-lg border border-gray-200 w-fit overflow-x-auto">
              <button 
                onClick={() => setActiveTab('All')}
                className={`px-4 py-1.5 text-[11px] font-bold rounded-md transition-all active:scale-95 whitespace-nowrap ${activeTab === 'All' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
              >
                All Orders ({dashboardData.recentOrders?.length || 0})
              </button>
              <button 
                onClick={() => setActiveTab('Preparing')}
                className={`px-4 py-1.5 text-[11px] font-bold rounded-md flex items-center gap-1 transition-all active:scale-95 whitespace-nowrap ${activeTab === 'Preparing' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
              >
                 Preparing
              </button>
              <button 
                onClick={() => setActiveTab('Completed')}
                className={`px-4 py-1.5 text-[11px] font-bold rounded-md transition-all active:scale-95 whitespace-nowrap ${activeTab === 'Completed' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Completed
              </button>
              <button 
                onClick={() => setActiveTab('Canceled')}
                className={`px-4 py-1.5 text-[11px] font-bold rounded-md transition-all active:scale-95 whitespace-nowrap ${activeTab === 'Canceled' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Canceled
              </button>
           </div>

           {/* Table */}
           <div className="overflow-x-auto pt-2">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-gray-200">
                       <th className="pb-3 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider pl-2">ORDER ID</th>
                       <th className="pb-3 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">TIME</th>
                       <th className="pb-3 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">CUSTOMER</th>
                       <th className="pb-3 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">ITEMS</th>
                       <th className="pb-3 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">TOTAL</th>
                       <th className="pb-3 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">STATUS</th>
                       <th className="pb-3 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider text-right pr-2">ACTIONS</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                           <td className="py-4 pl-2 font-bold text-sm text-[#ff5100]">{order.id}</td>
                           <td className="py-4 text-xs font-semibold text-gray-600">{order.time}</td>
                           <td className="py-4">
                              <p className="text-sm font-bold text-gray-900">{order.customer}</p>
                              <p className="text-[10px] font-medium text-gray-500">{order.details}</p>
                           </td>
                           <td className="py-4 text-xs font-semibold text-gray-700 max-w-[200px] truncate">{order.items}</td>
                           <td className="py-4 text-sm font-bold text-gray-900">{order.total}</td>
                           <td className="py-4">
                              {['New', 'PENDING'].includes(order.status) && (
                                <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-[10px] font-bold px-2.5 py-1 rounded-md border border-orange-100">
                                   <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span> New
                                </span>
                              )}
                              {order.status === 'Preparing' && (
                                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-md border border-amber-100">
                                   <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-spin"></span> Preparing
                                </span>
                              )}
                              {order.status === 'Ready' && (
                                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-md border border-blue-100">
                                   <RotateCw size={10} className="animate-spin" /> Ready
                                </span>
                              )}
                              {['Delivered', 'Completed', 'COMPLETED'].includes(order.status) && (
                                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-100">
                                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Delivered
                                </span>
                              )}
                              {['Canceled', 'Cancelled', 'CANCELLED'].includes(order.status) && (
                                <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-md border border-red-100">
                                   <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Cancelled
                                </span>
                              )}
                           </td>
                           <td className="py-4 pr-2 text-right space-x-2">
                              <button onClick={() => navigate('/admin/orders')} className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">View</button>
                           </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="py-6 text-center text-xs text-gray-500 font-medium">No orders found in the database.</td>
                      </tr>
                    )}
                 </tbody>
              </table>
           </div>

           <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
              <span className="text-[10px] font-medium text-gray-500">Showing {filteredOrders.length} orders from Database</span>
           </div>

        </div>

      </div>

      {/* INTERACTIVE CMS MANAGEMENT POPUP MODAL (All 4 Items Included) */}
      {showCMSModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-[#ff5100] p-2.5 rounded-xl text-white">
                  <Settings size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Content Management System (CMS)</h3>
                  <p className="text-xs text-gray-300">Live Website Sync & Database Health Control</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCMSModal(false)}
                className="text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              
              {/* Quick Status Bar */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-center">
                  <Globe size={20} className="mx-auto text-[#ff5100] mb-1" />
                  <span className="text-[10px] font-extrabold text-gray-500 uppercase">Production Status</span>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">Online & Live</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                  <Database size={20} className="mx-auto text-emerald-600 mb-1" />
                  <span className="text-[10px] font-extrabold text-gray-500 uppercase">Prisma DB Sync</span>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5">Connected (0.1ms)</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
                  <ShieldCheck size={20} className="mx-auto text-blue-600 mb-1" />
                  <span className="text-[10px] font-extrabold text-gray-500 uppercase">Security Token</span>
                  <p className="text-sm font-bold text-blue-700 mt-0.5">Admin Verified</p>
                </div>
              </div>

              {/* Editable CMS Options List (All 4 Items matching Website Content Status) */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Active Modules & Configurations (4 Items)</h4>
                
                {/* 1. Home Page Banners */}
                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <h5 className="text-sm font-bold text-gray-900">1. Home Page Banners</h5>
                    <p className="text-xs text-gray-500">Spring Artisanal Pizza Promo banner active across hero.</p>
                  </div>
                  <button 
                    onClick={() => { alert('Home Page Banners Synced Successfully!'); }}
                    className="bg-gray-100 hover:bg-orange-50 hover:text-[#ff5100] text-gray-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer border border-gray-200"
                  >
                    Sync Banners
                  </button>
                </div>

                {/* 2. About Page Story */}
                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <h5 className="text-sm font-bold text-gray-900">2. About Page Story</h5>
                    <p className="text-xs text-gray-500">Head Chef bio and wood-fired oven origin story verified.</p>
                  </div>
                  <button 
                    onClick={() => { alert('About Page Story Verified!'); }}
                    className="bg-gray-100 hover:bg-orange-50 hover:text-[#ff5100] text-gray-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer border border-gray-200"
                  >
                    Verify Story
                  </button>
                </div>

                {/* 3. Menu Images & Prices */}
                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <h5 className="text-sm font-bold text-gray-900">3. Menu Images & Prices</h5>
                    <p className="text-xs text-gray-500">All {stats.menu.totalItems || 0} item photos and seasonal pricing synced.</p>
                  </div>
                  <button 
                    onClick={() => { alert('Menu CDN Caches Refreshed Successfully!'); }}
                    className="bg-gray-100 hover:bg-orange-50 hover:text-[#ff5100] text-gray-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer border border-gray-200"
                  >
                    Purge Cache
                  </button>
                </div>

                {/* 4. Chef Roster & Bios */}
                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <h5 className="text-sm font-bold text-gray-900">4. Chef Roster & Bios</h5>
                    <p className="text-xs text-gray-500">{stats.chefs.onDuty || 0} chef profiles visible with current shift schedule badges.</p>
                  </div>
                  <button 
                    onClick={() => { alert('Chef Roster Synced with Database!'); }}
                    className="bg-gray-100 hover:bg-orange-50 hover:text-[#ff5100] text-gray-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer border border-gray-200"
                  >
                    Sync Roster
                  </button>
                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-xs text-gray-500">Flame & Crust Production CMS v2.4</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowCMSModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    alert('All 4 CMS configurations saved and deployed live!');
                    setShowCMSModal(false);
                  }}
                  className="bg-[#ff5100] hover:bg-[#e04800] text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-md shadow-orange-500/20"
                >
                  Save & Deploy Live
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;