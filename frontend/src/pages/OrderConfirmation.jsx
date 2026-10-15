
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  ArrowLeft,
  MapPin,
  CreditCard,
  CalendarDays,
  Download,
} from "lucide-react";

const formatPrice = (price) =>
  `Rs ${Number(price || 0).toLocaleString("en-LK")}`;

function getSavedOrder() {
  try {
    const saved = localStorage.getItem("flameCrustLastOrder");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(
    () => location.state?.order || getSavedOrder()
  );

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    }
  }, [location.state]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <main className="relative isolate flex min-h-[65vh] items-center justify-center overflow-hidden bg-[#100706] px-5 pt-28 text-white">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/Images/cartBackground.jpg')",
          }}
        />
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#191919]/95 p-8 text-center">
          <ShoppingBag
            size={48}
            className="mx-auto mb-4 text-[#F47A20]"
          />
          <h1 className="text-2xl font-bold">
            No order found
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Please place an order before viewing the confirmation page.
          </p>
          <Link
            to="/menu"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#F47A20] px-6 py-3 font-semibold text-white transition hover:bg-[#E66D16]"
          >
            Explore Menu
          </Link>
        </div>
      </main>
    );
  }

  const customer = order.customer || {};
  const items = order.items || [];
  const subtotal =
    order.subtotal ??
    items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  const deliveryFee = order.deliveryFee ?? 200;
  const total = order.total ?? subtotal + deliveryFee;
  const orderId = order.orderId || "Pending ID";
  const orderDate = order.createdAt
    ? new Date(order.createdAt)
    : new Date();

  const paymentLabel =
    order.paymentMethod === "online"
      ? "Pay Online"
      : "Cash on Delivery";

  return (
    <main className="relative isolate min-h-[650px] overflow-hidden bg-[#100706] pt-28 text-white sm:pt-32">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/Images/cartBackground.jpg')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <div className="mx-auto max-w-4xl px-5 pb-12 sm:px-8">
        {/* Success heading */}
        <section className="py-8 text-center">
          <CheckCircle2
            size={68}
            strokeWidth={1.5}
            className="mx-auto text-green-500"
          />

          <h1 className="mt-5 font-serif text-3xl font-bold sm:text-4xl">
            Thank You for Your Order!
          </h1>

          <p className="mt-3 text-gray-300">
            Your order has been placed successfully.
          </p>

          <div className="mx-auto mt-6 inline-block rounded-xl border border-[#F47A20]/30 bg-[#191919]/90 px-6 py-4">
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Order ID
            </p>
            <p className="mt-2 text-xl font-bold text-[#F47A20]">
              {orderId}
            </p>
          </div>
        </section>

        {/* Receipt */}
        <section
          id="order-receipt"
          className="receipt-card rounded-2xl border border-white/10 bg-[#191919]/95 p-5 shadow-xl shadow-black/20 sm:p-8"
        >
          {/* Receipt heading */}
          <div className="flex flex-col justify-between gap-4 border-b border-white/20 pb-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-2xl font-bold">
                Flame <span className="text-[#F47A20]">&amp;Crust</span>
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Order Receipt
              </p>
            </div>

            <div className="text-sm text-gray-300 sm:text-right">
              <div className="flex items-center gap-2 sm:justify-end">
                <CalendarDays size={16} className="text-[#F47A20]" />
                <span>
                  {orderDate.toLocaleDateString("en-LK", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                {orderDate.toLocaleTimeString("en-LK", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Customer details */}
          <div className="grid grid-cols-1 gap-5 border-b border-white/20 py-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[#F47A20]">
                Customer Information
              </h3>
              <p className="font-medium">
                {[customer.firstName, customer.lastName]
                  .filter(Boolean)
                  .join(" ") || "Customer"}
              </p>
              <p className="mt-1 break-words text-sm text-gray-400">
                {customer.email || "—"}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                {customer.phone || "—"}
              </p>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#F47A20]">
                <MapPin size={16} />
                Delivery Address
              </h3>
              <p className="whitespace-pre-line text-sm leading-6 text-gray-300">
                {customer.address || "—"}
              </p>
            </div>
          </div>

          {/* Payment and status */}
          <div className="grid grid-cols-1 gap-4 border-b border-white/20 py-5 sm:grid-cols-2">
            <div>
              <p className="text-xs text-gray-400">Payment Method</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                <CreditCard size={16} className="text-[#F47A20]" />
                {paymentLabel}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Order Status</p>
              <span className="mt-2 inline-flex rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                Order Placed
              </span>
            </div>
          </div>

          {/* Items */}
          <div className="py-6">
            <h3 className="mb-4 text-lg font-semibold">
              Order Items
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/20 text-xs uppercase tracking-wide text-gray-400">
                    <th className="pb-3 pr-3 font-medium">Item</th>
                    <th className="px-3 pb-3 font-medium">Size</th>
                    <th className="px-3 pb-3 text-center font-medium">Qty</th>
                    <th className="pb-3 pl-3 text-right font-medium">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={`${item.id ?? item.name}-${index}`}
                      className="border-b border-white/10 last:border-0"
                    >
                      <td className="py-4 pr-3 font-medium">
                        {item.name}
                      </td>
                      <td className="px-3 py-4 text-gray-400">
                        {item.size || "—"}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.quantity}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 text-right font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="ml-auto max-w-sm space-y-4 border-t border-white/20 pt-5">
            <div className="flex justify-between gap-4 text-sm text-gray-400">
              <span>Subtotal</span>
              <span className="whitespace-nowrap text-white">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm text-gray-400">
              <span>Delivery Fee</span>
              <span className="whitespace-nowrap text-white">
                {formatPrice(deliveryFee)}
              </span>
            </div>

            <div className="flex justify-between gap-4 border-t border-white/20 pt-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="whitespace-nowrap text-xl font-bold text-[#F47A20]">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <p className="mt-8 border-t border-white/10 pt-5 text-center text-sm text-gray-400">
            Thank you for choosing Flame &amp; Crust.
            <br />
            Where urban fire meets gourmet craft.
          </p>
        </section>

        {/* Actions - excluded from print */}
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#F47A20] to-[#E5252A] px-6 py-3 font-semibold text-white transition hover:brightness-110"
          >
            <Printer size={18} />
            Print / Save as PDF
          </button>

          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
          >
            <ArrowLeft size={18} />
            Home
          </button>
        </div>
      </div>

      {/* Print-specific receipt styling */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          body {
            background: white !important;
            color: #171717 !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          nav,
          footer {
            display: none !important;
          }

          main {
            min-height: 0 !important;
            padding-top: 0 !important;
            overflow: visible !important;
            background: white !important;
            color: #171717 !important;
          }

          main > div:first-child {
            display: none !important;
          }

          main > div:nth-child(2) {
            display: none !important;
          }

          .receipt-card {
            border: 1px solid #dddddd !important;
            border-radius: 0 !important;
            background: white !important;
            color: #171717 !important;
            box-shadow: none !important;
            padding: 8mm !important;
          }

          .receipt-card * {
            color: #171717 !important;
          }

          .receipt-card .text-\\[\\#F47A20\\] {
            color: #c75b0b !important;
          }

          .receipt-card .text-green-400 {
            color: #15803d !important;
          }

          .receipt-card .bg-green-500\\/10 {
            background: #ecfdf5 !important;
          }

          .receipt-card .border-white\\/10,
          .receipt-card .border-white\\/20 {
            border-color: #dddddd !important;
          }

          .print\\:hidden {
            display: none !important;
          }

          tr,
          .receipt-card > div {
            break-inside: avoid;
          }
        }
      `}</style>
    </main>
  );
}
