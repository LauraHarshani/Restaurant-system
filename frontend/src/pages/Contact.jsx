
import { useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialFormData = {
  fullName: "",
  email: "",
  contactNo: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [detailsError, setDetailsError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/contact/details`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load contact details."
          );
        }

        setRestaurantDetails(data.details);
      } catch (error) {
        console.error("Fetch contact details error:", error);
        setDetailsError(
          "Unable to load restaurant contact details. Please try again later."
        );
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setSubmitted(false);
    setSubmitError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/contact/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send your message."
        );
      }

      setSubmitted(true);
      setFormData({ ...initialFormData });
    } catch (error) {
      console.error("Contact form error:", error);

      setSubmitError(
        error.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-[#222222]/90 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 hover:border-white/30 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20";

  return (
    <div className="relative isolate bg-[#100302] font-sans text-white">
      {/* Background Video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/Images/cartBackground.jpg"
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source
            src="/Videos/restaurant-background2.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex min-h-[420px] justify-center px-5 text-center sm:min-h-[480px]">
          <div className="mx-auto w-full max-w-4xl px-6 pt-32 sm:pt-36">
            <h1 className="mb-4 font-display text-5xl font-bold leading-tight tracking-wide text-[#F5F2EB] md:text-7xl">
              Get In Touch
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-200 sm:text-lg">
              We’d love to hear from you! Whether you have
              questions, need support, or want to learn more
              about our services, our team is here to help.
            </p>
          </div>
        </section>

        {/* Contact Information and Form */}
        <section>
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 pb-16 pt-4 sm:px-8 sm:pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-12 lg:pb-24">
            {/* Left: Contact Information */}
            <div className="flex flex-col">
              
              <div className="space-y-8">
                {detailsLoading && (
                  <p className="text-sm text-gray-300">
                    Loading contact details...
                  </p>
                )}

                {detailsError && (
                  <p role="alert" className="text-sm text-red-400">
                    {detailsError}
                  </p>
                )}

                {restaurantDetails && (
                  <>
                    {[
                      {
                        icon: MapPin,
                        label: "Our Address:",
                        value: restaurantDetails.address,
                      },
                      {
                        icon: Mail,
                        label: "Email Us:",
                        value: restaurantDetails.email,
                      },
                      {
                        icon: Phone,
                        label: "Contact Us:",
                        value: restaurantDetails.phone,
                      },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-center gap-4 transition-transform duration-300 hover:translate-x-2"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#472719] text-[#ff6b00] transition-all duration-300 hover:scale-110 hover:bg-[#ff6b00] hover:text-white hover:shadow-lg hover:shadow-[#ff6b00]/30">
                          <Icon size={24} strokeWidth={2} />
                        </div>

                        <div>
                          <p className="text-sm text-gray-300">
                            {label}
                          </p>

                          <p className="mt-1 break-words text-sm font-medium text-white sm:text-base">
                            {value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>


              {/* Dark Google Map */}
              <div className="mt-10 sm:mt-12">
                <p className="mb-3 text-sm font-semibold text-white">
                  Locate Us
                </p>

                <div className="group h-[230px] overflow-hidden rounded-xl border border-white/20 shadow-lg shadow-black/20 transition-all duration-300 hover:border-[#ff6b00]/70 hover:shadow-xl hover:shadow-[#ff6b00]/10 sm:h-[280px] lg:max-w-[580px]">
                  <iframe
                    title="Flame and Crust location map"
                    src={
                      restaurantDetails?.googleMapsLocation
                        ? (() => {
                            const location = restaurantDetails.googleMapsLocation;

                            try {
                              const url = new URL(location);

                              if (url.searchParams.has("q")) {
                                return `https://maps.google.com/maps?q=${encodeURIComponent(
                                  url.searchParams.get("q")
                                )}&output=embed`;
                              }

                              if (url.searchParams.has("query")) {
                                return `https://maps.google.com/maps?q=${encodeURIComponent(
                                  url.searchParams.get("query")
                                )}&output=embed`;
                              }

                              return `https://maps.google.com/maps?q=${encodeURIComponent(
                                location
                              )}&output=embed`;
                            } catch {
                              return `https://maps.google.com/maps?q=${encodeURIComponent(
                                location
                              )}&output=embed`;
                            }
                          })()
                        : "https://maps.google.com/maps?q=Colombo%2C%20Sri%20Lanka&output=embed"
                    }
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter:
                        "invert(90%) hue-rotate(180deg) brightness(85%) contrast(90%)",
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="transition-all duration-500 group-hover:brightness-110"
                  />
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <div className="rounded-2xl border border-white/10 bg-[#171717]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-sm transition-all duration-300 hover:border-[#ff6b00]/30 hover:shadow-[#ff6b00]/10 sm:p-8">
                <h2 className="mb-7 text-lg font-semibold text-white">
                  Send us a message
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-medium text-gray-200"
                    >
                      Full Name
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputClass}
                      autoComplete="name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-200"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label
                      htmlFor="contactNo"
                      className="mb-2 block text-sm font-medium text-gray-200"
                    >
                      Contact Number
                    </label>

                    <input
                      id="contactNo"
                      name="contactNo"
                      type="tel"
                      placeholder="07XXXXXXXX"
                      value={formData.contactNo}
                      onChange={handleChange}
                      className={inputClass}
                      autoComplete="tel"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-gray-200"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What is your message about?"
                      value={formData.subject}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-gray-200"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Type your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-y`}
                      required
                    />
                  </div>
                  
                  {/*Failed submission feedback*/}
                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
                    >
                      {submitError}
                    </div>
                  )}

                  {/* Submission Feedback */}
                  {submitted && (
                    <div
                      role="status"
                      className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400"
                    >
                      <CheckCircle2 size={18} />
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ff7417] to-[#e5252a] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#ff6b00]/10 transition-all duration-300 hover:-translate-y-1 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
