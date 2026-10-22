import { useState } from "react";
import { Link } from "react-router-dom";
import { useChefs } from "../../context/ChefContext";
import { Plus, Edit, Trash2, ExternalLink, User, Search } from "lucide-react";

export default function ChefManagement() {
  const { chefs, deleteChef } = useChefs(); const [search, setSearch] = useState(""); const [filter, setFilter] = useState("All chefs");
  const handleDelete = (id) => { if (window.confirm("Are you sure you want to delete this chef?")) { deleteChef(id); } };
  const filteredChefs = chefs.filter((chef) => { const matchSearch = chef.name.toLowerCase().includes(search.toLowerCase()) || chef.specialty.toLowerCase().includes(search.toLowerCase()); let matchFilter = true; if (filter === "On duty") matchFilter = chef.status === "On duty"; if (filter === "Off duty") matchFilter = chef.status === "Off duty"; return matchSearch && matchFilter; });
  const totalChefs = chefs.length; const onDuty = chefs.filter((c) => c.status === "On duty").length;
  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div><h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Manage your kitchen team</h1><p className="text-gray-500 text-[14px] mt-1">Keep chef profiles, specialties and shift availability up to date.</p></div>
        <Link to="/admin/chefs/add" className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-lg text-[14px] font-medium flex items-center gap-2 transition shadow-sm"><Plus size={16} /> Add chef</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden"><div className="flex justify-between items-start mb-4"><p className="text-gray-600 text-[13px] font-medium">Total chefs</p><User size={18} className="text-[#F97316]" /></div><p className="font-display text-[36px] font-bold text-[#1C1917] leading-none mb-2">{totalChefs < 10 ? "0" + totalChefs : totalChefs}</p><p className="text-gray-400 text-[11px]">Across 3 kitchen stations</p></div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden"><div className="flex justify-between items-start mb-4"><p className="text-gray-600 text-[13px] font-medium">On duty</p><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div><p className="font-display text-[36px] font-bold text-[#1C1917] leading-none mb-2">{onDuty < 10 ? "0" + onDuty : onDuty}</p><p className="text-gray-400 text-[11px]">Lunch service is covered</p></div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden"><div className="flex justify-between items-start mb-4"><p className="text-gray-600 text-[13px] font-medium">Published profiles</p><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg></div><p className="font-display text-[36px] font-bold text-[#1C1917] leading-none mb-2">{totalChefs < 10 ? "0" + totalChefs : totalChefs}</p><p className="text-gray-400 text-[11px]">Visible on the Chefs page</p></div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
         <div className="relative w-full md:w-72"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search chefs by name or specialty" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" /></div>
         <div className="flex gap-2 w-full md:w-auto"><button onClick={() => setFilter("All chefs")} className={"px-4 py-1.5 rounded-lg text-sm font-medium transition " + (filter === "All chefs" ? "bg-[#F97316]/10 text-[#F97316]" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50")}>All chefs {totalChefs}</button><button onClick={() => setFilter("On duty")} className={"px-4 py-1.5 rounded-lg text-sm font-medium transition " + (filter === "On duty" ? "bg-[#F97316]/10 text-[#F97316]" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50")}>On duty {onDuty}</button><button onClick={() => setFilter("Off duty")} className={"px-4 py-1.5 rounded-lg text-sm font-medium transition " + (filter === "Off duty" ? "bg-[#F97316]/10 text-[#F97316]" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50")}>Off duty {totalChefs - onDuty}</button></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredChefs.map((chef) => (
          <div key={chef.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col">
            <div className="relative h-56 bg-gray-100"><img src={chef.image} alt={chef.name} className="w-full h-full object-cover" /><span className="absolute top-3 left-3 bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">Published profile</span></div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-1"><h3 className="font-display text-[22px] font-bold text-[#1C1917]">{chef.name}</h3><span className={"px-2 py-0.5 text-[10px] font-medium rounded-full flex items-center gap-1 " + (chef.status === "On duty" ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-100 text-gray-600 border border-gray-200")}><span className={"w-1.5 h-1.5 rounded-full " + (chef.status === "On duty" ? "bg-green-500" : "bg-gray-400")}></span>{chef.status}</span></div>
              <p className="text-[#F97316] text-[12px] font-medium mb-1">{chef.title}</p><p className="text-gray-500 text-[12px] mb-4">{chef.specialty}</p>
              <div className="mt-auto">
                <div className="flex justify-between items-center text-[11px] mb-4"><span className="text-gray-500">Today's shift</span><span className="text-[#1C1917] font-medium">{chef.shift}</span></div><p className="text-[11px] text-gray-500 mb-4">{chef.email}</p>
                 <div className="flex gap-2 pt-4 border-t border-gray-100">
                   <Link to={`/admin/chefs/edit/${chef.id}`} className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium py-2 rounded-lg border border-gray-200 text-[#1C1917] hover:bg-gray-50 transition"><Edit size={12} /> Edit</Link>
                   <Link to={`/chefs/${chef.id}`} className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium py-2 rounded-lg border border-gray-200 text-[#1C1917] hover:bg-gray-50 transition">View <ExternalLink size={12} /></Link>
                   <button onClick={() => handleDelete(chef.id)} className="px-2.5 py-2 text-red-500 border border-gray-200 rounded-lg hover:bg-red-50 transition"><Trash2 size={14} /></button>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
