import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarDays, Download, Plus, ReceiptText, UtensilsCrossed, ChefHat, 
  Mail, MessageSquare, ArrowRight, CornerDownLeft, MonitorSmartphone, 
  Settings, CheckCircle2, RotateCw, Search, ChevronDown, X 
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('oct 1 – oct 30, 2026');
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allOrders = [
    { id: '#FC-2849', time: '12:42 PM', customer: 'Harshani', details: 'Table 4 • Dine-In', items: '1x Smoked Margherita, 1x Truffle Fries', total: 'Rs.3800', status: 'Preparing' },
    { id: '#FC-2848', time: '12:35 PM', customer: 'Minindu', details: 'Takeout Counter', items: '2x Spicy Pizza', total: 'Rs.5000', status: 'Preparing' },
    { id: '#FC-2847', time: '12:18 PM', customer: 'Nirmal', details: 'Delivery • DoorDash', items: '1x Four Cheese Burger', total: 'Rs.2900', status: 'Ready' },
    { id: '#FC-2846', time: '11:55 AM', customer: 'Sithumini', details: 'Table 2 • Dine-in', items: '1x Tiramisu', total: 'Rs.1000', status: 'Completed' },
    { id: '#FC-2845', time: '11:20 AM', customer: 'Diluni', details: 'Online Web Order', items: '2x Pepperoni Pizza', total: 'Rs.5800', status: 'Completed' },
    { id: '#FC-2844', time: '10:45 AM', customer: 'Rovindu', details: 'Phone Order', items: '1x Garlic cheese pizza', total: 'Rs.2500', status: 'Canceled' }
  ];

  const filteredOrders = allOrders.filter(order => {
    const matchesTab = 
      activeTab === 'All' ? true :
      activeTab === 'Preparing' ? order.status === 'Preparing' || order.status === 'Ready' :
      activeTab === 'Completed' ? order.status === 'Completed' :
      activeTab === 'Canceled' ? order.status === 'Canceled' : true;

    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleExportExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Order ID,Time,Customer,Items,Total,Status\n";

    allOrders.forEach(row => {
      csvContent += `"${row.id}","${row.time}","${row.customer}","${row.items}","${row.total}","${row.status}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dashboard_orders_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-6 font-sans text-gray-900 pb-20 relative bg-white">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></span>
              <span className="text-[11px] text-[#10b981] font-bold tracking-wide">Sync Active: POS Oven 01</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Management</h1>
            <p className="text-gray-500 text-sm mt-1">Real-time kitchen operations, orders, and public website updates</p>
          </div>
          <div className="flex items-center gap-3 relative">
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 shadow-sm"
            >
              <CalendarDays size={14} className="text-gray-500" /> 
              {selectedDateRange}
              <ChevronDown size={14} className="text-gray-400 ml-1" />
            </button>

            {showCalendar && (
              <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50 w-72 space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                   <span className="text-xs font-bold text-gray-800">Select Date Range</span>
                   <button onClick={() => setShowCalendar(false)} className="text-gray-400 hover:text-gray-600">
                     <X size={14} />
                   </button>
                </div>
                <div className="space-y-2">
                   <button onClick={() => { setSelectedDateRange('oct 1 – oct 30, 2026'); setShowCalendar(false); }} className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-orange-50 hover:text-[#ff5100] rounded-lg transition-colors">
                      October 2026 (Current Month)
                   </button>
                   <button onClick={() => { setSelectedDateRange('sep 1 – sep 30, 2026'); setShowCalendar(false); }} className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-orange-50 hover:text-[#ff5100] rounded-lg transition-colors">
                      September 2026
                   </button>
                   <button onClick={() => { setSelectedDateRange('Aug 1 – Aug 31, 2026'); setShowCalendar(false); }} className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-orange-50 hover:text-[#ff5100] rounded-lg transition-colors">
                      August 2026
                   </button>
                </div>
              </div>
            )}

            <button 
              onClick={handleExportExcel}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 shadow-sm"
            >
              <Download size={14} className="text-gray-500" /> Export Summy
            </button>

            {/* New Manual Order button routing to Create Order page */}
            <button 
              onClick={() => navigate('/admin/orders/create')}
              className="flex items-center gap-2 bg-[#ff5100] hover:bg-[#e04800] text-white px-5 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-md shadow-orange-500/20"
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
                     <span className="text-4xl font-extrabold text-gray-900 leading-none">05</span>
                     <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center mb-1">↗+12%</span>
                  </div>
               </div>
               <div className="bg-orange-50 p-2 rounded-lg text-[#ff5100]">
                  <ReceiptText size={20} />
               </div>
            </div>
            <div className="flex justify-between items-end text-xs font-medium text-gray-500">
               <span>3 Active • 1<br/>Delivered</span>
               <span className="text-[#ff5100] text-right">vs<br/>yesterday</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-[10px] font-extrabold text-gray-500 tracking-wider mb-1">MENU CATALOG</h3>
                  <div className="flex items-baseline gap-1">
                     <span className="text-4xl font-extrabold text-gray-900 leading-none">48</span>
                     <span className="text-sm font-bold text-gray-500">Items</span>
                  </div>
               </div>
               <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <UtensilsCrossed size={20} />
               </div>
            </div>
            <div className="flex justify-between items-end text-xs font-medium text-gray-500">
               <span>All categories<br/>active</span>
               <span className="bg-[#eef2ff] text-[#4f46e5] px-2 py-1 rounded-md font-bold">6 Categories<br/>Live</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-[10px] font-extrabold text-gray-500 tracking-wider mb-1">CHEFS ON DUTY</h3>
                  <div className="flex items-baseline gap-1">
                     <span className="text-4xl font-extrabold text-gray-900 leading-none">02</span>
                     <span className="text-sm font-bold text-gray-500">/ 03 total</span>
                  </div>
               </div>
               <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                  <ChefHat size={20} />
               </div>
            </div>
            <div className="flex justify-between items-end text-xs font-medium text-gray-500">
               <span>Wood-fired<br/>line hot</span>
               <span className="bg-[#ecfdf5] text-[#059669] px-2 py-1 rounded-md font-bold flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 bg-[#059669] rounded-full"></span> Station A & B<br/>Open
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
                     <span className="text-4xl font-extrabold text-gray-900 leading-none">04</span>
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

        {/* Middle Section: Messages & CMS Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                     <MessageSquare size={18} className="text-[#ff5100]" /> Recent Customer Messages
                   </h2>
                   <p className="text-xs text-gray-500 mt-1">Latest contact form inquiries & feedback</p>
                </div>
                <button onClick={() => navigate('/admin/messages')} className="text-xs font-bold text-[#ff5100] hover:text-[#e04800] flex items-center gap-1 transition-colors active:scale-95">
                  View All Messages (4) <ArrowRight size={14} />
                </button>
             </div>

             <div className="space-y-5">
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-orange-100 text-[#ff5100] flex items-center justify-center text-[11px] font-bold shrink-0">HR</div>
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="font-bold text-sm text-gray-900">Harshani Rodrigo</span>
                         <span className="text-[10px] font-medium text-gray-400">10 mins ago</span>
                         <span className="bg-orange-50 text-[#ff5100] text-[9px] font-bold px-1.5 py-0.5 rounded">Reservation</span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[85%]">
                        "Can we book a table for 8 this Friday around 7:30 PM? We have 2 vegan guests."
                      </p>
                   </div>
                   <button className="h-fit bg-orange-50 text-[#ff5100] hover:bg-orange-100 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 transition-colors shrink-0">
                     <CornerDownLeft size={12} /> Reply
                   </button>
                </div>

                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[11px] font-bold shrink-0">MR</div>
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="font-bold text-sm text-gray-900">Minindu Rajapaksha</span>
                         <span className="text-[10px] font-medium text-gray-400">28 mins ago</span>
                         <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded">Catering</span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[85%]">
                        "Inquiring about catering options for a private corporate event next month."
                      </p>
                   </div>
                   <button className="h-fit bg-orange-50 text-[#ff5100] hover:bg-orange-100 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 transition-colors shrink-0">
                     <CornerDownLeft size={12} /> Reply
                   </button>
                </div>

                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold shrink-0">N</div>
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="font-bold text-sm text-gray-900">Nirmal</span>
                         <span className="text-[10px] font-medium text-gray-400">1 hr ago</span>
                         <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded">Praise</span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[85%]">
                        "Loved the sourdough crust pizza last night! Do you offer gluten-free crust options?"
                      </p>
                   </div>
                   <button className="h-fit bg-orange-50 text-[#ff5100] hover:bg-orange-100 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 transition-colors shrink-0">
                     <CornerDownLeft size={12} /> Reply
                   </button>
                </div>

                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-bold shrink-0">SR</div>
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="font-bold text-sm text-gray-900">Sithum Rathnayaka</span>
                         <span className="text-[10px] font-medium text-gray-400">2 hrs ago</span>
                         <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded">Info</span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[85%]">
                        "Hi, I noticed the opening hours on Google differ from your menu footer. Could you clarify?"
                      </p>
                   </div>
                   <button className="h-fit bg-orange-50 text-[#ff5100] hover:bg-orange-100 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 transition-colors shrink-0">
                     <CornerDownLeft size={12} /> Reply
                   </button>
                </div>
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
                  <button className="text-[11px] font-bold text-[#ff5100] hover:text-[#e04800] flex items-center gap-1.5 transition-colors">
                    Manage CMS <Settings size={14} />
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
                           <p className="text-xs text-gray-500 mt-0.5">Head Chef bio and wood-fired oven origin story verified at 09:15 AM.</p>
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
                           <p className="text-xs text-gray-500 mt-0.5">All 48 item photos and seasonal pricing CDN caches refreshed.</p>
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
                           <p className="text-xs text-gray-500 mt-0.5">2 chef profiles visible with current shift schedule badges.</p>
                        </div>
                     </div>
                     <span className="bg-[#ecfdf5] text-[#059669] text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shrink-0">
                       <span className="w-1.5 h-1.5 bg-[#059669] rounded-full"></span> Current
                     </span>
                  </div>
               </div>
             </div>

             <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[10px] font-medium text-gray-400">Last CMS deploy: 24 mins ago by Admin</span>
                <button className="text-[11px] font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors">
                   Trigger Cache Purge <RotateCw size={12} />
                </button>
             </div>
          </div>
        </div>

        {/* Bottom Section: Recent Orders Table */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 overflow-hidden space-y-4">
           
           {/* Top Bar with Title and Search */}
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                 <h2 
                   onClick={() => navigate('/admin/orders')} 
                   className="text-lg font-extrabold text-gray-900 cursor-pointer hover:text-[#ff5100] transition-colors"
                 >
                   Recent Orders
                 </h2>
                 <p className="text-xs text-gray-500 mt-0.5">Real-time Kitchen Display System queue and order ledger</p>
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
                All Orders (18)
              </button>
              <button 
                onClick={() => setActiveTab('Preparing')}
                className={`px-4 py-1.5 text-[11px] font-bold rounded-md flex items-center gap-1 transition-all active:scale-95 whitespace-nowrap ${activeTab === 'Preparing' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
              >
                 Preparing <span className="w-1.5 h-1.5 bg-[#ff5100] rounded-full"></span> 3
              </button>
              <button 
                onClick={() => setActiveTab('Completed')}
                className={`px-4 py-1.5 text-[11px] font-bold rounded-md transition-all active:scale-95 whitespace-nowrap ${activeTab === 'Completed' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Completed (14)
              </button>
              <button 
                onClick={() => setActiveTab('Canceled')}
                className={`px-4 py-1.5 text-[11px] font-bold rounded-md transition-all active:scale-95 whitespace-nowrap ${activeTab === 'Canceled' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Canceled (1)
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
                              {order.status === 'Preparing' && (
                                <span className="inline-flex items-center gap-1.5 bg-orange-50 text-[#ff5100] text-[10px] font-bold px-2.5 py-1 rounded-md">
                                   <span className="w-1.5 h-1.5 bg-[#ff5100] rounded-full animate-pulse"></span> Preparing
                                </span>
                              )}
                              {order.status === 'Ready' && (
                                <span className="inline-flex items-center gap-1.5 bg-[#ff5100] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                                   <RotateCw size={10} className="animate-spin" /> Ready for Pickup
                                </span>
                              )}
                              {order.status === 'Completed' && (
                                <span className="inline-flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold px-1 py-1 rounded-md">
                                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Completed
                                </span>
                              )}
                              {order.status === 'Canceled' && (
                                <span className="inline-flex items-center gap-1.5 text-red-500 text-[10px] font-bold px-1 py-1 rounded-md">
                                   <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Canceled
                                </span>
                              )}
                           </td>
                           <td className="py-4 pr-2 text-right space-x-2">
                              {order.status === 'Preparing' && (
                                <>
                                  <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">View</button>
                                  <button className="bg-[#ff5100] text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-[#e04800] transition-colors">Mark Ready</button>
                                </>
                              )}
                              {order.status === 'Ready' && (
                                <button className="border border-[#ff5100] text-[#ff5100] text-[10px] font-bold px-3 py-1.5 rounded hover:bg-orange-50 transition-colors">Dispatch Driver</button>
                              )}
                              {order.status === 'Completed' && (
                                <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">Receipt</button>
                              )}
                              {order.status === 'Canceled' && (
                                <button className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors">View Log</button>
                              )}
                           </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="py-6 text-center text-xs text-gray-500 font-medium">No matching orders found.</td>
                      </tr>
                    )}
                 </tbody>
              </table>
           </div>

           <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
              <span className="text-[10px] font-medium text-gray-500">Showing {filteredOrders.length} orders • Auto-syncing every 30 seconds</span>
              <div className="flex items-center gap-4">
                 <button className="text-xs font-bold text-gray-400 cursor-not-allowed">Previous</button>
                 <span className="text-xs font-bold text-gray-900">Page 1 of 3</span>
                 <button className="text-xs font-bold text-gray-900 hover:text-[#ff5100] transition-colors">Next</button>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;