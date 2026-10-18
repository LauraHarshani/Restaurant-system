export default function About() {
  return (
    <div>
      <section className="bg-flame-darker text-white py-24 px-6 text-center">
        <p className="text-flame-orange text-xs tracking-widest mb-3">OUR STORY</p>
        <h1 className="font-display text-5xl font-bold mb-4">Born in flame. Served with soul.</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          From a small wood-fired kitchen to a beloved urban dining room.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800"
          className="rounded-2xl"
          alt="Restaurant interior"
        />
        <div>
          <h2 className="font-display text-3xl font-bold mb-4 text-flame-dark">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            To bring people together over food that is honest, fire-kissed and unforgettable.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Every dish starts with seasonal produce and ends with a flame.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        <div className="card p-8">
          <h3 className="font-display text-xl font-bold mb-2">📍 Location</h3>
          <p className="text-gray-600 text-sm">123 Food Street, Colombo 03</p>
        </div>
        <div className="card p-8">
          <h3 className="font-display text-xl font-bold mb-2">🕐 Hours</h3>
          <p className="text-gray-600 text-sm">Open Daily: 12pm – 11pm</p>
        </div>
        <div className="card p-8">
          <h3 className="font-display text-xl font-bold mb-2">📞 Contact</h3>
          <p className="text-gray-600 text-sm">+94 11 234 5678</p>
        </div>
      </section>
    </div>
  );
}