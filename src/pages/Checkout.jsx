
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Banknote, ShoppingBag } from "lucide-react";

// Temporary cart data. Replace with shared cart state when integrating.
const sampleItems = [
  {
    id: 1,
    name: "The Blaze Classic Burger",
    price: 1900,
    size: "Small",
    quantity: 2,
  },
  {
    id: 2,
    name: "The Blaze Classic Burger",
    price: 1900,
    size: "Small",
    quantity: 2,
  },
  {
    id: 3,
    name: "The Blaze Classic Burger",
    price: 1900,
    size: "Small",
    quantity: 2,
  },
];

const DELIVERY_FEE = 200;

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
};

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#222222] px-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#F47A20] focus:ring-2 focus:ring-[#F47A20]/20";

export default function Checkout() {
  const navigate = useNavigate();
  const [items] = useState(sampleItems);
  const [form, setForm] = useState(initialForm);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [items]
  );

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = subtotal + (items.length ? DELIVERY_FEE : 0);

  const formatPrice = (price) =>
    `Rs ${price.toLocaleString("en-LK")}`;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty. Please add items first.");
      return;
    }

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.address.trim()
    ) {
      setError("Please complete all delivery information.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const orderId = `FC-${Date.now()}`;

    const order = {
      customer: form,
      orderId,
      createdAt: new Date().toISOString(),
      items,
      paymentMethod,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
    };

    try {
        localStorage.setItem("flameCrustLastOrder", JSON.stringify(order));
        navigate("/order-confirmation", { state: { order } });
    } catch {
        setError("Unable to save your order details. Please try again.");
    }
  };

  return (
    <main className="relative isolate min-h-[650px] overflow-hidden bg-[#100706] pt-28 text-white sm:pt-32">
      {/* Restaurant background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-35"
        style={{
          backgroundImage: "url('/Images/cartBackground.jpg')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <div className="mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-11">
        <h1 className="mb-7 text-3xl font-bold sm:text-4xl">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2.4fr)_minmax(320px,1fr)]">
            {/* Delivery information */}
            <section className="rounded-xl border border-white/10 bg-[#191919]/90 p-5 sm:p-8">
              <h2 className="mb-7 font-serif text-2xl">
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="text-sm text-gray-200">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    autoComplete="given-name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="text-sm text-gray-200">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    autoComplete="family-name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="email" className="text-sm text-gray-200">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  autoComplete="email"
                  className={inputClass}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="phone" className="text-sm text-gray-200">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="07XXXXXXXX"
                  autoComplete="tel"
                  className={inputClass}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="address" className="text-sm text-gray-200">
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your complete delivery address"
                  autoComplete="street-address"
                  rows={3}
                  className={`${inputClass} h-auto min-h-20 resize-y py-3`}
                />
              </div>

              <fieldset className="mt-6">
                <legend className="mb-4 text-sm text-gray-200">
                  Payment Method
                </legend>

                <div className="space-y-4">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                      className="h-[18px] w-[18px] accent-[#F47A20]"
                    />
                    <CreditCard size={18} className="text-gray-300" />
                    <span className="text-sm">Pay Online</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                      className="h-[18px] w-[18px] accent-[#F47A20]"
                    />
                    <Banknote size={18} className="text-gray-300" />
                    <span className="text-sm">Cash on Delivery</span>
                  </label>
                </div>
              </fieldset>

              {error && (
                <p role="alert" className="mt-5 text-sm text-red-400">
                  {error}
                </p>
              )}
            </section>

            {/* Order summary */}
            <aside className="rounded-xl border border-white/10 bg-[#1B1B1B] p-5 sm:p-6 lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#F47A20]" size={22} />
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>

              <div className="mt-4 space-y-4 border-t border-white/50 pt-5">
                {items.map((item) => (
                  <div key={item.id} className="text-sm">
                    <div className="flex items-start justify-between gap-3">
                      <span className="min-w-0 leading-5">
                        {item.name}
                      </span>
                      <span className="shrink-0 whitespace-nowrap">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      {item.size} · ×{item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4 border-t border-white/50 pt-4 text-sm">
                <div className="flex justify-between gap-3 text-gray-400">
                  <span>Total Items</span>
                  <span className="text-white">{totalItems}</span>
                </div>

                <div className="flex justify-between gap-3 text-gray-400">
                  <span>Sub Total</span>
                  <span className="whitespace-nowrap text-white">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="whitespace-nowrap text-white">
                    {formatPrice(items.length ? DELIVERY_FEE : 0)}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/50 pt-5">
                <span className="text-lg">Total</span>
                <span className="whitespace-nowrap text-xl font-semibold text-[#F47A20] sm:text-2xl">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-lg bg-gradient-to-r from-[#F47A20] to-[#E5252A] px-4 py-3 font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#F47A20] focus:ring-offset-2 focus:ring-offset-[#1B1B1B]"
              >
                Confirm Order
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="mt-3 w-full rounded-lg border border-white/15 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5"
              >
                Back to Cart
              </button>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}
