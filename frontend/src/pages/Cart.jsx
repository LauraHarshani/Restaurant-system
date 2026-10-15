import { useMemo, useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialItems = [
  {
    id: 1,
    name: "The Blaze Classic Burger",
    price: 1900,
    size: "Medium",
    quantity: 2,
    image: "/Images/food1.jpeg",
  },
  {
    id: 2,
    name: "The Blaze Classic Burger",
    price: 1900,
    size: "Medium",
    quantity: 2,
    image: "/Images/food1.jpeg",
  },
  {
    id: 3,
    name: "The Blaze Classic Burger",
    price: 1900,
    size: "Medium",
    quantity: 2,
    image: "/Images/food1.jpeg",
  },
];

const sizes = ["Small", "Medium", "Large"];
const deliveryFee = 200;

export default function Cart() {

  const navigate = useNavigate();

  const [items, setItems] = useState(initialItems);

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

  const total = subtotal + (items.length ? deliveryFee : 0);

  const formatPrice = (price) =>
    `Rs ${price.toLocaleString("en-LK")}`;

  const updateQuantity = (id, amount) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + amount),
            }
          : item
      )
    );
  };

  const updateSize = (id, size) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, size } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const handleCheckout = () => {
    
    console.log("Proceeding to checkout", items);
  };

  return (
    <main className="pt-22 relative isolate min-h-[650px] overflow-hidden bg-[#100706] text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-35"
        style={{
          backgroundImage: "url('/Images/cartBackground.jpg')",
        }}
      />

      <div className="absolute inset-0 -z-10 bg-black/45" />

      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-11 lg:py-7">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your Cart
          </h1>

          <p className="mt-3 text-sm text-gray-300">
            {items.length === 0
              ? "Your cart is empty"
              : `${items.length} ${
                  items.length === 1 ? "item" : "items"
                } added`}
          </p>
        </header>

        {items.length === 0 ? (
          <section className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-white/10 bg-black/60 px-5 text-center">
            <ShoppingCart
              size={48}
              className="mb-4 text-[#F47A20]"
            />

            <h2 className="text-xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Add something delicious from our menu.
            </p>

            <a
              href="/menu"
              className="mt-6 rounded-lg bg-[#F47A20] px-6 py-3 font-semibold text-white transition hover:bg-[#E66D16]"
            >
              Explore Menu
            </a>
          </section>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2.4fr)_minmax(300px,1fr)]">
            {/* Cart items */}
            <section className="space-y-3">
              {items.map((item) => (
                
                <article
                key={item.id}
                className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-4 rounded-xl border border-white/10 bg-[#191919]/95 p-4 sm:grid-cols-[112px_minmax(0,1fr)] lg:grid-cols-[112px_minmax(0,1fr)_116px_170px] lg:gap-5"
                >
                    {/* Product image */}
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-[88px] rounded-xl object-cover sm:h-28 sm:w-28"
                    />

                    {/* Product details */}
                    <div className="min-w-0 self-center">
                        <h2 className="text-sm font-semibold text-white sm:text-base">
                        {item.name}
                        </h2>

                        <p className="mt-2 text-sm font-medium text-[#F47A20]">
                        {formatPrice(item.price)}
                        </p>

                        <div className="mt-3">
                        <p className="mb-1 text-xs text-gray-300">Size</p>

                        <div className="flex flex-wrap gap-1.5">
                            {sizes.map((size) => (
                            <button
                                key={size}
                                type="button"
                                onClick={() => updateSize(item.id, size)}
                                aria-pressed={item.size === size}
                                className={`rounded-md border px-2.5 py-1 text-xs transition ${
                                item.size === size
                                    ? "border-[#F47A20] text-[#F47A20]"
                                    : "border-white/20 text-gray-300 hover:border-white/50"
                                }`}
                            >
                                {size}
                            </button>
                            ))}
                        </div>
                        </div>
                    </div>

                    {/* Quantity selector */}
                    <div className="col-span-2 flex items-center justify-between border-t border-white/10 pt-3 sm:col-span-1 sm:border-0 sm:pt-0 lg:col-span-1 lg:justify-center">
                        <QuantityControl
                        quantity={item.quantity}
                        onDecrease={() => updateQuantity(item.id, -1)}
                        onIncrease={() => updateQuantity(item.id, 1)}
                        />

                        {/* Mobile item total */}
                        <span className="whitespace-nowrap font-bold text-[#F47A20] lg:hidden">
                        {formatPrice(item.price * item.quantity)}
                        </span>
                    </div>

                    {/* Desktop item total and delete button */}
                    <div className="hidden items-center justify-between gap-3 lg:flex">
                        <span className="whitespace-nowrap text-lg font-bold text-[#F47A20]">
                        {formatPrice(item.price * item.quantity)}
                        </span>

                        <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 rounded-md p-2 text-red-500 transition hover:bg-red-500/10"
                        >
                        <Trash2 size={19} />
                        </button>
                    </div>

                    {/* Mobile delete button */}
                    <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="col-span-2 flex items-center gap-2 text-sm text-red-500 sm:col-span-1 lg:hidden"
                    >
                        <Trash2 size={16} />
                        Remove item
                    </button>
                </article>

              ))}
            </section>

            {/* Order summary */}
            <aside className="rounded-xl border border-white/10 bg-[#1B1B1B] p-5 sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-xl font-bold">
                Order Summary
              </h2>

              <div className="mt-4 border-t border-white/60 pt-5">
                <div className="flex items-center justify-between py-3 text-sm">
                  <span className="text-gray-400">
                    Total Items
                  </span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex items-center justify-between py-3 text-sm">
                  <span className="text-gray-400">
                    Sub Total
                  </span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between py-3 text-sm">
                  <span className="text-gray-400">
                    Delivery Fee
                  </span>
                  <span>{formatPrice(items.length ? deliveryFee : 0)}</span>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/60 pt-5">
                <span className="text-lg">Total</span>
                <span className="text-xl font-semibold text-[#F47A20] sm:text-2xl">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                type="button"
                onClick={()=> navigate("/checkout")}
                className="mt-7 w-full rounded-lg bg-gradient-to-r from-[#F47A20] to-[#E5252A] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#F47A20] focus:ring-offset-2 focus:ring-offset-[#1B1B1B]"
              >
                Proceed to Checkout
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}) {
  return (
    <div className="inline-flex h-10 items-center overflow-hidden rounded-lg border border-white/10 bg-[#292929]">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="flex h-full w-10 items-center justify-center transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus size={15} />
      </button>

      <span className="min-w-10 text-center text-sm font-semibold">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="flex h-full w-10 items-center justify-center transition hover:bg-white/10"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
