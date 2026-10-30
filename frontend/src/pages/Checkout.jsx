
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Banknote, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
  const { cart: items, subtotal, cartCount, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalItems = cartCount;

  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const formatPrice = (price) =>
    `Rs ${price.toLocaleString("en-LK")}`;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
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

    setIsSubmitting(true);
    try {
        const response = await fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: `${form.firstName.trim()} ${form.lastName.trim()}`,
            email: form.email.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            type: "Delivery",
            items: items.map(({ id, qty }) => ({ menuItemId: Number(id), qty })),
          }),
        });
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to place your order.");
        }

        const savedOrder = result.order;
        const order = {
          ...savedOrder,
          orderId: savedOrder.id,
          customer: {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            phone: savedOrder.phone,
            address: savedOrder.address,
          },
          items: savedOrder.items.map((savedItem) => {
            const cartItem = items.find((item) => item.name === savedItem.name);
            return {
              ...savedItem,
              quantity: savedItem.qty,
              image: cartItem?.image,
            };
          }),
          paymentMethod,
        };
        localStorage.setItem("flameCrustLastOrder", JSON.stringify(order));
        clearCart();
        navigate("/order-confirmation", { state: { order } });
    } catch (submitError) {
        setError(submitError.message || "Unable to save your order details. Please try again.");
    } finally {
        setIsSubmitting(false);
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
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">×{item.qty}</p>
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
                    {formatPrice(deliveryFee)}
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
                disabled={isSubmitting || items.length === 0}
                className="mt-7 w-full rounded-lg bg-gradient-to-r from-[#F47A20] to-[#E5252A] px-4 py-3 font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#F47A20] focus:ring-offset-2 focus:ring-offset-[#1B1B1B]"
              >
                {isSubmitting ? "Saving Order…" : "Confirm Order"}
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
