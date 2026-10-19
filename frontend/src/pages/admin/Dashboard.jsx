import { useChefs } from "../../context/ChefContext";
import { useMenu } from "../../context/MenuContext";
import { orders } from "../../data/mockData";
import { ShoppingBag, ChefHat, UtensilsCrossed, MessageSquare } from "lucide-react";

export default function Dashboard() {
  const { chefs } = useChefs(); const { menuItems } = useMenu();
  const stats = [
    { label: "Today's Orders", value: orders.length, icon: ShoppingBag },
    { label: "Active Chefs", value: chefs.length, icon: ChefHat },
    { label: "Menu Items", value: menuItems.length, icon: UtensilsCrossed },
    { label: "Messages", value: 3, icon: MessageSquare }
  ];
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-flame-dark mb-2">Welcome back, Admin</h1>
      <p className="text-gray-500 mb-8">Here's what's happening today.</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((s) => { const Icon = s.icon; return (
          <div key={s.label} className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3"><span className="text-gray-500 text-sm">{s.label}</span><Icon size={18} className="text-flame-orange" /></div>
            <p className="font-display text-3xl font-bold text-flame-dark">{s.value}</p>
          </div>
        ); })}
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h2 className="font-display text-xl font-bold mb-4">Recent Orders</h2>
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 border-b">
            <tr><th className="pb-3">Order</th><th className="pb-3">Customer</th><th className="pb-3">Total</th><th className="pb-3">Status</th></tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((o) => (
              <tr key={o.id} className="border-b last:border-0">
                <td className="py-3 font-medium">{o.id}</td><td className="py-3">{o.customer}</td><td className="py-3">Rs. {o.total}.00</td>
                <td className="py-3"><span className="px-2 py-1 bg-flame-orange/10 text-flame-orange rounded text-xs">{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
