import { Bell } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between sticky top-0 z-10">
      <h1 className="font-display text-[20px] font-bold text-[#1C1917]">
        Admin Panel
      </h1>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-9 h-9 bg-[#1C1917] rounded-full flex items-center justify-center text-white text-[11px] font-bold">
            AM
          </div>
          <div className="text-[12px]">
            <p className="font-bold text-[#1C1917]">Admin</p>
            <p className="text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
