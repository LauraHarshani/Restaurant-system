import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

// Backend API URL.
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get the token from the storage location used during login.
const getAdminToken = () => {
  return (
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("adminToken")
  );
};

// Save updated profile information in the same storage as the token.
const saveAdminProfile = (admin) => {
  const storage = localStorage.getItem("adminToken")
    ? localStorage
    : sessionStorage;

  storage.setItem("adminProfile", JSON.stringify(admin));

  //notify changes in navbar notification
  window.dispatchEvent(new Event("adminProfileUpdated"));
};

// Remove authentication information from both storage locations.
const clearAdminSession = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminProfile");

  sessionStorage.removeItem("adminToken");
  sessionStorage.removeItem("adminProfile");
};

export default function AdminProfile() {
  const navigate = useNavigate();

  // Profile information retrieved from the backend.
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Password form state.
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Control visibility of individual password fields.
  const [visible, setVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Loading and feedback states.
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [profileFeedback, setProfileFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");

  const [profileError, setProfileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Load the logged-in administrator's profile when the page opens.
  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      const token = getAdminToken();

      // Redirect if no authentication token exists.
      if (!token) {
        clearAdminSession();
        navigate("/admin/login", { replace: true });
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

        // Invalid or expired token.
        if (response.status === 401 || response.status === 403) {
          clearAdminSession();
          navigate("/admin/login", { replace: true });
          return;
        }

        if (!response.ok || !data.success || !data.admin) {
          throw new Error(
            data.message || "Unable to load admin profile."
          );
        }

        if (isMounted) {
          // Update React state with the database information.
          setProfile(data.admin);
          setName(data.admin.name);
          setEmail(data.admin.email);

          // Keep the latest admin details in browser storage.
          saveAdminProfile(data.admin);
        }
      } catch (error) {
        console.error("Load admin profile error:", error);

        if (isMounted) {
          setProfileError(true);
          setProfileFeedback(
            error.message || "Unable to connect to the server."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // Generate avatar initials from the administrator's name.
  const initials =
    profile?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "A";

  // Save updated name and email to the database.
  const handleSaveProfile = async (event) => {
    event.preventDefault();

    setProfileFeedback("");
    setProfileError(false);

    if (!name.trim() || !email.trim()) {
      setProfileError(true);
      setProfileFeedback("Name and email are required.");
      return;
    }

    const token = getAdminToken();

    if (!token) {
      clearAdminSession();
      navigate("/admin/login", { replace: true });
      return;
    }

    setIsSavingProfile(true);

    try {
      const response = await fetch(`${API_URL}/admin/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      });

      const data = await response.json();

      // Handle expired or invalid authentication.
      if (response.status === 401 || response.status === 403) {
        clearAdminSession();
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update your profile."
        );
      }

      // Update the profile using the response from the backend.
      setProfile(data.admin);
      setName(data.admin.name);
      setEmail(data.admin.email);

      // Update stored admin information.
      saveAdminProfile(data.admin);

      setProfileError(false);
      setProfileFeedback(
        data.message || "Profile updated successfully."
      );
    } catch (error) {
      console.error("Update profile error:", error);

      setProfileError(true);
      setProfileFeedback(
        error.message || "Unable to update your profile."
      );
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handle changes to password input fields.
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswords((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Show or hide a selected password field.
  const toggleVisibility = (field) => {
    setVisible((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  // Change the admin password through the backend.
  const handleUpdatePassword = async (event) => {
    event.preventDefault();

    setPasswordFeedback("");
    setPasswordError(false);

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwords;

    // Validate all password fields.
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError(true);
      setPasswordFeedback("Please complete all password fields.");
      return;
    }

    // Match the backend's minimum password length.
    if (newPassword.length < 8) {
      setPasswordError(true);
      setPasswordFeedback(
        "Your new password must contain at least 8 characters."
      );
      return;
    }

    // Check that the new passwords match.
    if (newPassword !== confirmPassword) {
      setPasswordError(true);
      setPasswordFeedback("The new passwords do not match.");
      return;
    }

    const token = getAdminToken();

    if (!token) {
      clearAdminSession();
      navigate("/admin/login", { replace: true });
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await fetch(
        `${API_URL}/admin/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      // Handle invalid or expired authentication.
      if (response.status === 401 || response.status === 403) {
        clearAdminSession();
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update your password."
        );
      }

      // Clear the password fields after a successful update.
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPasswordError(false);
      setPasswordFeedback(
        data.message || "Password updated successfully."
      );

      // End the current browser session so the admin signs in
      // again using the newly updated password.
      clearAdminSession();

      // Redirect after briefly displaying the success message.
      window.setTimeout(() => {
        navigate("/admin/login", { replace: true });
      }, 1800);
    } catch (error) {
      console.error("Change password error:", error);

      setPasswordError(true);
      setPasswordFeedback(
        error.message || "Unable to update your password."
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Shared styling for text inputs.
  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#1e1e1e] outline-none transition placeholder:text-gray-400 focus:border-[#ff6b00] focus:ring-2 focus:ring-orange-100";

  const passwordInputClass = `${inputClass} pr-12`;

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-700";

  // Reusable password input field.
  const renderPasswordField = (field, label, placeholder) => (
    <div className="min-w-0">
      <label htmlFor={field} className={labelClass}>
        {label}
      </label>

      <div className="relative">
        <input
          id={field}
          name={field}
          type={visible[field] ? "text" : "password"}
          value={passwords[field]}
          onChange={handlePasswordChange}
          placeholder={placeholder}
          autoComplete={
            field === "currentPassword"
              ? "current-password"
              : "new-password"
          }
          className={passwordInputClass}
          required
          minLength={field !== "currentPassword" ? 8 : undefined}
        />

        <button
          type="button"
          onClick={() => toggleVisibility(field)}
          aria-label={
            visible[field] ? `Hide ${label}` : `Show ${label}`
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-[#ff6b00]"
        >
          {visible[field] ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );

  // Display a loading screen while retrieving profile information.
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <LoaderCircle
            size={36}
            className="mx-auto animate-spin text-[#ff6b00]"
          />

          <p className="mt-3 text-sm text-gray-500">
            Loading admin profile...
          </p>
        </div>
      </div>
    );
  }

  // Display an error if the profile could not be retrieved.
  if (!profile) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <AlertCircle
          size={32}
          className="mx-auto text-red-500"
        />

        <h3 className="mt-3 font-semibold text-red-800">
          Unable to load profile
        </h3>

        <p className="mt-2 text-sm text-red-700">
          {profileFeedback || "Please try again."}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-5 rounded-lg bg-[#ff6b00] px-5 py-3 text-sm font-medium text-white hover:bg-[#e85f00]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="w-full space-y-6">

        {/* Page heading */}
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Profile
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            View your account details and update your password.
          </p>
        </div>

        {/* Profile information card */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

          {/* Admin avatar and name */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1e1e1e] text-sm font-semibold text-[#ff6b00]">
              {initials}
            </div>

            <div className="min-w-0">
              <h3 className="truncate font-semibold text-[#1e1e1e]">
                {profile.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Administrator
              </p>
            </div>
          </div>

          {/* Update profile form */}
          <form onSubmit={handleSaveProfile}>
            <div className="space-y-6">

              {/* Full name */}
              <div>
                <label htmlFor="profileName" className={labelClass}>
                  Full Name
                </label>

                <input
                  id="profileName"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  className={inputClass}
                  required
                />
              </div>

              {/* Email address */}
              <div>
                <label htmlFor="profileEmail" className={labelClass}>
                  Email
                </label>

                <input
                  id="profileEmail"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@flameandcrust.lk"
                  className={`${inputClass} bg-gray-50`}
                  required
                />
              </div>
            </div>

            {/* Profile feedback message */}
            {profileFeedback && (
              <div
                role="status"
                className={`mt-5 flex items-start gap-2 rounded-lg px-4 py-3 text-sm ${
                  profileError
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {profileError ? (
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0"
                  />
                ) : (
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0"
                  />
                )}

                {profileFeedback}
              </div>
            )}

            {/* Save profile button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSavingProfile}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff6b00] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#e85f00] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSavingProfile ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}

                {isSavingProfile ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </section>

        {/* Update password card */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

          {/* Password section heading */}
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#ff6b00]">
              <LockKeyhole size={21} />
            </div>

            <h3 className="text-lg font-semibold text-[#1e1e1e]">
              Update Password
            </h3>
          </div>

          {/* Change password form */}
          <form onSubmit={handleUpdatePassword}>
            <div className="space-y-6">

              {/* Current password */}
              {renderPasswordField(
                "currentPassword",
                "Current Password",
                "Enter current password"
              )}

              {/* New password and confirmation */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {renderPasswordField(
                  "newPassword",
                  "New Password",
                  "Minimum 8 characters"
                )}

                {renderPasswordField(
                  "confirmPassword",
                  "Confirm New Password",
                  "Re-enter your new password"
                )}
              </div>
            </div>

            {/* Password feedback message */}
            {passwordFeedback && (
              <div
                role="status"
                className={`mt-5 flex items-start gap-2 rounded-lg px-4 py-3 text-sm ${
                  passwordError
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {passwordError ? (
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0"
                  />
                ) : (
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0"
                  />
                )}

                {passwordFeedback}
              </div>
            )}

            {/* Update password button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1e1e1e] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ff6b00] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isChangingPassword ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <LockKeyhole size={16} />
                )}

                {isChangingPassword
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}