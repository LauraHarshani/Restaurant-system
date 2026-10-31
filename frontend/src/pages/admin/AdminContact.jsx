import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, CheckCircle2 } from "lucide-react";
import { getAdminAuthHeaders } from "../../utils/adminAuth";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const DEFAULT_CONTACT = {
  email: "hello@flameandcrust.lk",
  phone: "+94 11 520 1245",
  address: "123 Road, Colombo 03",
  mapUrl: "",
};

function mapApiToForm(details) {
  return {
    email: details.email || "",
    phone: details.phone || "",
    address: details.address || "",
    mapUrl: details.googleMapsLocation || "",
  };
}

export default function AdminContact() {
  const navigate = useNavigate();

  const [contact, setContact] = useState(DEFAULT_CONTACT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Load contact information from the backend.
  useEffect(() => {
    const fetchContactInformation = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/contact/details`
        );

        const data = await response.json().catch(() => ({}));

        // No contact details have been saved yet.
        if (response.status === 404) {
          setContact(DEFAULT_CONTACT);
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load contact information."
          );
        }

        if (!data.details) {
          setContact(DEFAULT_CONTACT);
          return;
        }

        setContact(mapApiToForm(data.details));
      } catch (fetchError) {
        console.error(
          "Unable to load contact information:",
          fetchError
        );
        setError(
          fetchError.message ||
            "Unable to load contact information. Please check your backend connection."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContactInformation();
  }, []);

  const updateField = (field, value) => {
    setContact((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
    setError("");
  };

  function getMapEmbedUrl(url) {
    if (!url.trim()) {
      return "";
    }

    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname.toLowerCase();

      if (!["https:", "http:"].includes(parsedUrl.protocol)) {
        return null;
      }

      // Google Maps embed URL.
      if (
        ["www.google.com", "google.com"].includes(hostname) &&
        parsedUrl.pathname.startsWith("/maps/embed")
      ) {
        return parsedUrl.href;
      }

      // Google Maps search or location URL.
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

        // Convert a maps URL containing a place/path into a search.
        const path = parsedUrl.pathname;

        if (path && path !== "/") {
          return `https://maps.google.com/maps?q=${encodeURIComponent(
            `https://www.google.com${path}`
          )}&output=embed`;
        }

        return null;
      }

      // Short Google Maps links may not work directly in an iframe.
      if (hostname === "maps.app.goo.gl") {
        return null;
      }

      return null;
    } catch {
      // Allow a plain location/address as an alternative.
      if (!/^https?:\/\//i.test(url.trim())) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(
          url.trim()
        )}&output=embed`;
      }

      return null;
    }
  }

  const mapEmbedUrl = getMapEmbedUrl(contact.mapUrl);

  const handleSave = async (event) => {
    event.preventDefault();

    if (contact.mapUrl.trim() && !mapEmbedUrl) {
      setError(
        "Please enter a valid Google Maps URL or a location/address."
      );
      return;
    }

    try {
      setSaving(true);
      setSaved(false);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/contact/details`,
        {
          method: "PATCH",
          headers: getAdminAuthHeaders(true),
          body: JSON.stringify({
            email: contact.email.trim(),
            phone: contact.phone.trim(),
            address: contact.address.trim(),
            googleMapsLocation: contact.mapUrl.trim(),
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save contact information."
        );
      }

      // Use the saved backend data when it is returned.
      if (data.details) {
        setContact(mapApiToForm(data.details));
      }

      setSaved(true);
    } catch (saveError) {
      console.error(
        "Unable to save contact information:",
        saveError
      );

      setError(
        saveError.message ||
          "Unable to save changes. Please check your backend connection."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/messages");
  };

  return (
    <div className="min-h-full text-gray-900">
      {/* Page heading and actions */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Contact Information
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage the contact details of Flame &amp; Crust
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="inline-flex min-w-[105px] items-center justify-center rounded-lg border border-gray-300 bg-[#f1f1f1] px-5 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="contact-information-form"
            disabled={loading || saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff6b00] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#e85f00] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Loading message */}
      {loading && (
        <p
          role="status"
          className="mx-auto mb-5 max-w-[910px] text-sm text-gray-500"
        >
          Loading contact information...
        </p>
      )}

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
                disabled={loading || saving}
                value={contact.email}
                onChange={(event) =>
                  updateField("email", event.target.value)
                }
                placeholder="Enter restaurant email"
                className="h-[46px] w-full rounded-md border border-gray-400 bg-white px-4 text-sm outline-none transition focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 disabled:bg-gray-100"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Phone No
              </span>

              <input
                type="tel"
                required
                disabled={loading || saving}
                value={contact.phone}
                onChange={(event) =>
                  updateField("phone", event.target.value)
                }
                placeholder="Enter restaurant phone number"
                className="h-[46px] w-full rounded-md border border-gray-400 bg-white px-4 text-sm outline-none transition focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 disabled:bg-gray-100"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Address
              </span>

              <input
                type="text"
                required
                disabled={loading || saving}
                value={contact.address}
                onChange={(event) =>
                  updateField("address", event.target.value)
                }
                placeholder="Enter restaurant address"
                className="h-[46px] w-full rounded-md border border-gray-400 bg-white px-4 text-sm outline-none transition focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 disabled:bg-gray-100"
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
                Google map URL or location
              </span>

              <input
                type="text"
                disabled={loading || saving}
                value={contact.mapUrl}
                onChange={(event) =>
                  updateField("mapUrl", event.target.value)
                }
                placeholder="Paste a Google Maps URL or enter a location"
                className="h-[46px] w-full rounded-md border border-gray-400 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/10 disabled:bg-gray-100"
              />
            </label>

            {contact.mapUrl.trim() && !mapEmbedUrl && (
              <p className="text-sm text-red-600">
                Enter a valid Google Maps URL or a location/address.
                Short maps.app.goo.gl links should be replaced with a
                full Google Maps URL.
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
                  Enter a Google Maps URL or location to preview the map.
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
            disabled={saving}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading || saving}
            className="inline-flex items-center gap-2 rounded-lg bg-[#ff6b00] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#e85f00] disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
