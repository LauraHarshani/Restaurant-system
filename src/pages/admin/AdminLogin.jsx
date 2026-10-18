import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("adminToken", "mock-token-123");
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-flame-darker flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">FIRE</span>
          <h1 className="font-display text-2xl font-bold text-flame-dark mt-3">
            Flame & Crust
          </h1>
          <p className="text-gray-500 text-sm mt-2">Admin Panel Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Use any email and password for demo
        </p>
      </div>
    </div>
  );
}
