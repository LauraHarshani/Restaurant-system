import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (Mock — backend later)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <section className="bg-flame-darker text-white py-20 px-6 text-center">
        <p className="text-flame-orange text-xs tracking-widest mb-3">GET IN TOUCH</p>
        <h1 className="font-display text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-400">We'd love to hear from you.</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
            required
          />
          <textarea
            rows="5"
            placeholder="Your message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input-field"
            required
          />
          <button type="submit" className="btn-primary w-full">Send Message</button>
        </form>

        <div className="space-y-6">
          <div className="card p-6 flex items-start gap-4">
            <MapPin className="text-flame-orange" />
            <div>
              <h4 className="font-bold text-flame-dark">Address</h4>
              <p className="text-gray-600 text-sm">123 Food Street, Colombo 03</p>
            </div>
          </div>
          <div className="card p-6 flex items-start gap-4">
            <Phone className="text-flame-orange" />
            <div>
              <h4 className="font-bold text-flame-dark">Phone</h4>
              <p className="text-gray-600 text-sm">+94 11 234 5678</p>
            </div>
          </div>
          <div className="card p-6 flex items-start gap-4">
            <Mail className="text-flame-orange" />
            <div>
              <h4 className="font-bold text-flame-dark">Email</h4>
              <p className="text-gray-600 text-sm">hello@flameandcrust.lk</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
