
import { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
} from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    label: "Our Address:",
    value: "123 Road, Colombo 03.",
  },
  {
    icon: Mail,
    label: "Email Us:",
    value: "hello@flameandcrust.lk",
  },
  {
    icon: Phone,
    label: "Contact Us:",
    value: "+94 11 234 5678",
  },
];

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend demo only. Connect to your backend later.
    console.log("Contact form submission:", formData);

    setSubmitted(true);
    setFormData({ ...initialFormData });
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
        <section className="flex min-h-[280px] items-center justify-center px-5 pb-12 pt-28 sm:min-h-[300px] sm:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-serif text-5xl font-bold tracking-wide text-white md:text-7xl">
              Get In Touch
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-200 sm:text-lg">
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
                {contactDetails.map(
                  ({ icon: Icon, label, value }) => (
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

                        <p className="mt-1 text-sm font-medium text-white transition-colors duration-300 hover:text-[#ff6b00] sm:text-base">
                          {value}
                        </p>
                      </div>
                    </div>
                  )
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
                    src="https://maps.google.com/maps?q=Colombo%2003%2C%20Sri%20Lanka&t=&z=12&ie=UTF8&iwloc=&output=embed"
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
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ff7417] to-[#e5252a] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#ff6b00]/10 transition-all duration-300 hover:-translate-y-1 hover:brightness-110 hover:shadow-xl hover:shadow-[#ff6b00]/25 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:ring-offset-2 focus:ring-offset-[#171717]"
                  >
                    Send Message
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
