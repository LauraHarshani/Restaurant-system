
import { useState } from "react";
import {
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const DEFAULT_PROFILE = {
  name: "Admin",
  email: "admin@flameandcrust.lk",
};

const STORAGE_KEY = "flameCrustAdminProfile";

function getInitialProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_PROFILE, ...parsed };
    }
  } catch {
    // Use default values if saved data is unavailable.
  }

  return DEFAULT_PROFILE;
}

export default function AdminProfile() {
  const [profile, setProfile] = useState(getInitialProfile);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visible, setVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [profileFeedback, setProfileFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [profileError, setProfileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const initials =
    profile.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "A";

  const handleSaveProfile = (event) => {
    event.preventDefault();
    setProfileFeedback("");

    const updatedProfile = {
      ...profile,
      name: name.trim(),
      email: email.trim(),
    };

    if (!updatedProfile.name || !updatedProfile.email) {
      setProfileError(true);
      setProfileFeedback("Name and email are required.");
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedProfile)
      );

      setProfile(updatedProfile);
      setName(updatedProfile.name);
      setEmail(updatedProfile.email);
      setProfileError(false);
      setProfileFeedback("Profile updated successfully.");
    } catch {
      setProfileError(true);
      setProfileFeedback("Unable to save your profile.");
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswords((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const toggleVisibility = (field) => {
    setVisible((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();
    setPasswordFeedback("");

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwords;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError(true);
      setPasswordFeedback("Please complete all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(true);
      setPasswordFeedback(
        "Your new password must contain at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(true);
      setPasswordFeedback("The new passwords do not match.");
      return;
    }

    setPasswordError(false);
    setPasswordFeedback(
      "Demo mode: connect your backend to change your password securely."
    );
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#1e1e1e] outline-none transition placeholder:text-gray-400 focus:border-[#ff6b00] focus:ring-2 focus:ring-orange-100";

  const passwordInputClass = `${inputClass} pr-12`;

  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

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
          minLength={field !== "currentPassword" ? 6 : undefined}
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

  return (
    <div className="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Page heading */}
        <div>
          <h2 className="text-2xl font-bold text-[#1e1e1e] sm:text-3xl">
            Profile
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            View your account details and update your password.
          </p>
        </div>

        {/* Profile information card */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
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

          <form onSubmit={handleSaveProfile}>
            <div className="space-y-6">
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
                  <AlertCircle size={17} className="mt-0.5 shrink-0" />
                ) : (
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
                )}
                {profileFeedback}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff6b00] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#e85f00]"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </form>
        </section>

        {/* Update password card */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#ff6b00]">
              <LockKeyhole size={21} />
            </div>

            <h3 className="text-lg font-semibold text-[#1e1e1e]">
              Update Password
            </h3>
          </div>

          <form onSubmit={handleUpdatePassword}>
            <div className="space-y-6">
              {renderPasswordField(
                "currentPassword",
                "Current Password",
                "Enter current password"
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {renderPasswordField(
                  "newPassword",
                  "New Password",
                  "Minimum 6 characters"
                )}

                {renderPasswordField(
                  "confirmPassword",
                  "Confirm New Password",
                  "Re-enter your new password"
                )}
              </div>
            </div>

            {passwordFeedback && (
              <div
                role="status"
                className={`mt-5 flex items-start gap-2 rounded-lg px-4 py-3 text-sm ${
                  passwordError
                    ? "bg-red-50 text-red-700"
                    : passwordFeedback.startsWith("Demo mode")
                      ? "bg-orange-50 text-orange-800"
                      : "bg-green-50 text-green-700"
                }`}
              >
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
                {passwordFeedback}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1e1e1e] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ff6b00]"
              >
                <LockKeyhole size={16} />
                Update Password
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
