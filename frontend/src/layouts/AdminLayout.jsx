
import { useState, useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { ShieldAlert, LoaderCircle, RefreshCw } from "lucide-react";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

// Backend API URL.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminLayout() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    // Retrieve the token from either browser storage location.
    const token =
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken");

    // Remove all stored admin authentication information.
    const clearAdminSession = () => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminProfile");

      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminProfile");
    };

    // Verify the admin token with the backend.
    const verifyAdmin = async () => {
      if (!token) {
        clearAdminSession();

        if (isMounted) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }

        return;
      }

      try {
        const response = await fetch(`${API_URL}/admin/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        // Invalid or expired tokens should end the admin session.
        if (response.status === 401 || response.status === 403) {
          clearAdminSession();

          if (isMounted) {
            setIsAuthenticated(false);
            setIsLoading(false);
            navigate("/admin/login", { replace: true });
          }

          return;
        }

        // Handle other backend errors.
        if (!response.ok || !data.success || !data.admin) {
          throw new Error(
            data.message || "Unable to verify administrator account."
          );
        }

        // Save the latest admin information in the same storage
        // location where the login token was originally stored.
        const storage = localStorage.getItem("adminToken")
          ? localStorage
          : sessionStorage;

        storage.setItem("adminProfile", JSON.stringify(data.admin));

        if (isMounted) {
          setIsAuthenticated(true);
          setIsLoading(false);
          setError("");
        }
      } catch (err) {
        console.error("Admin authentication error:", err);

        // Keep the token if the server is temporarily unavailable.
        if (isMounted) {
          setError(
            err.message || "Unable to connect to the authentication server."
          );
          setIsLoading(false);
        }
      }
    };

    verifyAdmin();

    // Prevent state updates if the component has unmounted.
    return () => {
      isMounted = false;
    };
  }, [navigate, retryCount]);

  // Display a loading screen while verifying the token.
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <LoaderCircle
            size={40}
            className="mx-auto animate-spin text-[#ff6b00]"
          />

          <p className="mt-4 text-sm font-medium text-gray-600">
            Verifying administrator access...
          </p>
        </div>
      </div>
    );
  }

  // Redirect users who are not authenticated.
  if (!isAuthenticated && !error) {
    return <Navigate to="/admin/login" replace />;
  }

  // Show an error if the backend cannot be reached.
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-5">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

          <ShieldAlert
            size={42}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Authentication Error
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {error}
          </p>

          <button
            onClick={() => {
              setError("");
              setIsLoading(true);
              setRetryCount((current) => current + 1);
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#ff6b00] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e85f00]"
          >
            <RefreshCw size={17} />
            Try Again
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              localStorage.removeItem("adminProfile");
              sessionStorage.removeItem("adminToken");
              sessionStorage.removeItem("adminProfile");

              navigate("/admin/login", { replace: true });
            }}
            className="mt-4 block w-full text-sm text-gray-500 hover:text-red-600"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Display the admin layout only after successful verification.
  return (
    <div className="flex min-h-screen bg-[#0a0503] font-sans">
      <AdminSidebar />

      <div className="flex h-screen flex-1 flex-col overflow-y-auto">
        <AdminNavbar />

        {/* Main content area shared by all admin pages. */}
        <div className="flex-1 bg-white p-8 text-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
