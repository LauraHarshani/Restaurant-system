
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, CheckCircle2 } from "lucide-react";

const DEFAULT_CONTACT = {
  email: "hello@flameandcrust.lk",
  phone: "+94 11 520 1245",
  address: "123 Road, Colombo 03",
  mapUrl: "",
};

const STORAGE_KEY = "flameCrustContactInformation";

function loadContactInformation() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved
      ? { ...DEFAULT_CONTACT, ...JSON.parse(saved) }
      : DEFAULT_CONTACT;
  } catch {
    return DEFAULT_CONTACT;
  }
}

export default function AdminContact() {
  const navigate = useNavigate();

  const [contact, setContact] = useState(loadContactInformation);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setContact((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
    setError("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (contact.mapUrl.trim() && !getMapEmbedUrl(contact.mapUrl)) {
      setError("Please enter a valid Google Maps URL or embed URL.");
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contact));
      setSaved(true);
      setError("");
    } catch (saveError) {
      console.error("Unable to save contact information:", saveError);
      setError("Unable to save changes in this browser.");
    }
  };

  function getMapEmbedUrl(url) {
    if (!url.trim()) {
      return "https://maps.google.com/maps?q=Colombo%2003%2C%20Sri%20Lanka&output=embed";
    }

    try {
      const parsedUrl = new URL(url);

      if (!["https:", "http:"].includes(parsedUrl.protocol)) {
        return null;
      }

      const hostname = parsedUrl.hostname.toLowerCase();

      // Google Maps embed URLs.
      if (
        ["www.google.com", "google.com"].includes(hostname) &&
        parsedUrl.pathname.startsWith("/maps/embed")
      ) {
        return parsedUrl.href;
      }

      // Google Maps search and location URLs.
      if (
        ["www.google.com", "google.com", "maps.google.com"].includes(
          hostname
        )
      ) {
        const query =
          parsedUrl.searchParams.get("q") ||
          parsedUrl.searchParams.get("query");

        if (query) {
          return `https://maps.google.com/maps?q=${encodeURIComponent(
            query
          )}&output=embed`;
        }

        return null;
      }

      // Short Google Maps links may redirect to a full map URL.
      if (hostname === "maps.app.goo.gl") {
        return parsedUrl.href;
      }

      return null;
    } catch {
      return null;
    }
  }

  const mapEmbedUrl = getMapEmbedUrl(contact.mapUrl);

  const handleCancel = () => {
    navigate("/admin/messages");
  };

  return (
    <div className="min-h-full p-4 text-gray-900 sm:p-7 lg:p-9">
      {/* Page heading and actions */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Contact Information
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage the contact details of the flame &amp; crust
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex min-w-[105px] items-center justify-center rounded-lg border border-gray-300 bg-[#f1f1f1] px-5 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="contact-information-form"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff6b00] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#e85f00]"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Success message */}
      {saved && (
        <div
          role="status"
          className="mx-auto mb-5 flex max-w-[910px] items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          <CheckCircle2 size={18} />
          Contact information saved successfully.
        </div>
      )}

      {/* Error message */}
      {error && (
        <p
          role="alert"
          className="mx-auto mb-5 max-w-[910px] text-sm text-red-600"
        >
          {error}
        </p>
      )}

      <form
        id="contact-information-form"
        onSubmit={handleSave}
        className="mx-auto max-w-[910px] space-y-10"
      >
        {/* Restaurant Details */}
        <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-[0_5px_25px_rgba(0,0,0,0.06)] sm:p-7">
          <h2 className="mb-7 text-base font-semibold">
            Restaurant Details
          </h2>

          <div className="space-y-5 px-0 sm:px-7">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Email
              </span>

              <input
                type="email"
                required
                value={contact.email}
                onChange={(event) =>
                  updateField("email", event.target.value)
                }
                placeholder="Enter restaurant email"
                className="h-[46px] w-full rounded-md border border-gray-400 bg-white px-4 text-sm outline-none transition focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Phone No
              </span>

              <input
                type="tel"
                required
                value={contact.phone}
                onChange={(event) =>
                  updateField("phone", event.target.value)
                }
                placeholder="Enter restaurant phone number"
                className="h-[46px] w-full rounded-md border border-gray-400 bg-white px-4 text-sm outline-none transition focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Address
              </span>

              <input
                type="text"
                required
                value={contact.address}
                onChange={(event) =>
                  updateField("address", event.target.value)
                }
                placeholder="Enter restaurant address"
                className="h-[46px] w-full rounded-md border border-gray-400 bg-white px-4 text-sm outline-none transition focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10"
              />
            </label>
          </div>
        </section>

        {/* Google Map */}
        <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-[0_5px_25px_rgba(0,0,0,0.06)] sm:p-7">
          <h2 className="mb-7 text-base font-semibold">
            Google Map
          </h2>

          <div className="space-y-6 px-0 sm:px-7">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Google map embed URL
              </span>

              <input
                type="url"
                value={contact.mapUrl}
                onChange={(event) =>
                  updateField("mapUrl", event.target.value)
                }
                placeholder="Paste your Google map embed URL here"
                className="h-[46px] w-full rounded-md border border-gray-400 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10"
              />
            </label>

            {contact.mapUrl.trim() && !mapEmbedUrl && (
              <p className="text-sm text-red-600">
                Enter a valid Google Maps URL or embed URL.
              </p>
            )}

            <div className="overflow-hidden rounded-xl bg-[#222]">
              {mapEmbedUrl ? (
                <iframe
                  title="Restaurant location preview"
                  src={mapEmbedUrl}
                  width="100%"
                  height="215"
                  style={{
                    border: 0,
                    filter:
                      "invert(90%) hue-rotate(180deg) brightness(85%) contrast(90%)",
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-[215px] items-center justify-center bg-gray-100 px-5 text-center text-sm text-gray-500">
                  Enter a Google Maps URL to preview the location.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mobile actions */}
        <div className="flex justify-end gap-3 pb-5 sm:hidden">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-[#ff6b00] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#e85f00]"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
