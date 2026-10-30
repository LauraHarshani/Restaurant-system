
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  Flame,
} from "lucide-react";

// Backend API URL.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle admin login using the backend authentication API.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      // Send login credentials to the backend.
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      // Display backend authentication errors.
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid email or password.");
      }

      // Check that the backend returned a token and admin details.
      if (!data.token || data.admin?.role !== "ADMIN") {
        throw new Error("Invalid authentication response.");
      }

      // Clear old tokens to avoid storing multiple sessions.
      localStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminToken");

      // Store the JWT according to the Remember me selection.
      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("adminToken", data.token);

      // Store the admin information for convenient UI display.
      storage.setItem("adminProfile", JSON.stringify(data.admin));

      // Navigate to the admin dashboard.
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      console.error("Admin login error:", err);
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-[#1e1e1e]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left branding panel */}
        <section className="relative hidden min-h-screen overflow-hidden rounded-r-[3rem] bg-black lg:block">

          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/Images/login-img.jpg')",
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/95" />

          {/* Branding content */}
          <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-12">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="text-4xl">🔥</span>

              <span className="font-logo text-3xl font-bold text-white">
                Flame <span className="text-[#ff6b00]">&amp;Crust</span>
              </span>
            </div>

            {/* Heading and description */}
            <div className="max-w-xl pb-10">
              <p className="mb-7 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff6b00]">
                THE FLAME &amp; CRUST EXPERIENCE
              </p>

              <h1 className="font-serif text-5xl font-bold leading-tight text-white xl:text-6xl">
                Where Great
                <br />
                <span className="text-[#ff6b00]">Food</span> Begins.
              </h1>

              <p className="mt-5 text-base text-gray-200">
                Your restaurant, managed in one place.
              </p>
            </div>
          </div>
        </section>

        {/* Right login panel */}
        <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-10">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-10 flex items-center justify-center gap-2 lg:hidden">
              <Flame size={32} className="text-[#ff6b00]" />

              <span className="font-logo text-2xl font-bold">
                Flame{" "}
                <span className="text-[#ff6b00]">&amp;Crust</span>
              </span>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-black/5 sm:p-9">

              {/* Login heading */}
              <div className="mb-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0e5] text-[#ff6b00]">
                  <ShieldCheck size={29} />
                </div>

                <h2 className="text-3xl font-bold tracking-tight">
                  Sign In
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Welcome back to Flame{" "}
                  <span className="text-[#ff6b00]">&amp;Crust</span>!
                  <br />
                  Sign in to manage your restaurant.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email input */}
                <div>
                  <label
                    htmlFor="admin-email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email Address
                  </label>

                  <div className="flex items-center rounded-lg border border-gray-300 transition focus-within:border-[#ff6b00] focus-within:ring-2 focus-within:ring-[#ff6b00]/15">
                    <Mail
                      size={19}
                      className="ml-4 shrink-0 text-gray-500"
                    />

                    <input
                      id="admin-email"
                      type="email"
                      autoComplete="username"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="w-full rounded-lg bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Password input */}
                <div>
                  <label
                    htmlFor="admin-password"
                    className="mb-2 block text-sm font-medium"
                  >
                    Password
                  </label>

                  <div className="flex items-center rounded-lg border border-gray-300 transition focus-within:border-[#ff6b00] focus-within:ring-2 focus-within:ring-[#ff6b00]/15">
                    <LockKeyhole
                      size={19}
                      className="ml-4 shrink-0 text-gray-500"
                    />

                    <input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className="w-full min-w-0 bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-gray-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="mr-3 rounded p-1 text-gray-500 hover:text-[#ff6b00]"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center">
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 accent-[#ff6b00]"
                    />
                    Remember me
                  </label>
                </div>

                {/* Authentication error */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6b00] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#e85f00] focus:outline-none focus:ring-4 focus:ring-[#ff6b00]/20 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-7 border-t border-gray-100 pt-5 text-center">
                <p className="text-xs text-gray-400">
                  <ShieldCheck size={14} className="mr-1 inline-block" />
                  Restricted access for authorized administrators
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
