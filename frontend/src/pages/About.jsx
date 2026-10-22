import React from 'react';
import { motion } from 'framer-motion';

// Import video files from assets
import aboutHeroVideo from '../assets/about-hero.mp4';
import woodFireVideo from '../assets/wood-fire_about.mp4';

const About = () => {
  return (
    <div className="bg-[#0a0503] text-white min-h-screen font-sans">
      
      {/* 1. Hero Section with Dark Restaurant Atmosphere Video Background */}
      <section className="relative flex min-h-[420px] justify-center overflow-hidden px-5 text-center sm:min-h-[480px]">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            src={aboutHeroVideo} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-60"
          />
          {/* Dark gradient overlay to make it look dim and moody */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0a0503]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-32 sm:pt-36">
          <h1 className="mb-4 font-display text-5xl font-bold leading-tight tracking-wide text-[#F5F2EB] md:text-7xl">
            OUR STORY
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-200 sm:text-lg">
            Discover the journey behind our wood-fired perfection
          </p>
        </div>
      </section>

      {/* 2. Story Content & Stats Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Video Box without Orange Border/Glow */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-full lg:w-1/2 bg-[#120905] rounded-2xl overflow-hidden p-2"
          >
            <video 
              src={woodFireVideo} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-[380px] object-cover rounded-xl"
            />
          </motion.div>

          {/* Right Text Description */}
          <div className="w-full lg:w-1/2">
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10">
              Born from a passion for authentic open-flame cooking, Flame & Crust began as a single wood-fired oven in a quiet urban corner. We believe fire is not just a method — it is the soul of every dish. Each pizza, each grill mark, each wisp of smoke carries the character of the flame that shaped it. Our chefs source heritage grains, seasonal produce, and aged woods — oak, hickory, and cherry — to craft flavors that can only exist when heat, smoke, and patience meet.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#ff5100] mb-1">12</h3>
                <p className="text-gray-400 text-xs md:text-sm">Years of Fire</p>
              </div>
              <div className="border-x border-white/10">
                <h3 className="text-3xl md:text-4xl font-bold text-[#ff5100] mb-1">48</h3>
                <p className="text-gray-400 text-xs md:text-sm">Wood Varieties</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#ff5100] mb-1">900°F</h3>
                <p className="text-gray-400 text-xs md:text-sm">Oven Heat</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Mission Section (3 Cards with Popup and Hover Border Effect) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-[#ff5100] font-bold uppercase tracking-widest mb-2 text-sm">What Drives Us</h4>
          <h2 className="text-4xl font-serif font-bold">Mission</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 bg-[#100202] rounded-2xl p-8 cursor-pointer"
          >
            <div className="text-[#ff5100] text-2xl mb-4 bg-[#ff5100]/10 w-12 h-12 flex items-center justify-center rounded-full">🔥</div>
            <h3 className="text-xl font-bold mb-3">Open-Flame Craft</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every dish is kissed by live fire. Our ovens run at 900°F, searing flavor into every crust and cut in under 90 seconds.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 bg-[#100202] rounded-2xl p-8 cursor-pointer"
          >
            <div className="text-[#ff5100] text-2xl mb-4 bg-[#ff5100]/10 w-12 h-12 flex items-center justify-center rounded-full">⭐</div>
            <h3 className="text-xl font-bold mb-3">Sourced with Intent</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Heritage grains, heirloom tomatoes, and farm-direct produce. We partner with growers who share our obsession with quality.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 bg-[#100202] rounded-2xl p-8 cursor-pointer"
          >
            <div className="text-[#ff5100] text-2xl mb-4 bg-[#ff5100]/10 w-12 h-12 flex items-center justify-center rounded-full">🕒</div>
            <h3 className="text-xl font-bold mb-3">No Shortcuts</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dough ferments for 48 hours. Woods are aged for seasons. Sauces are built from scratch. Excellence cannot be rushed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Find Us Section (Location & Opening Hours) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-[#ff5100] font-bold uppercase tracking-widest mb-2 text-sm">Find Us</h4>
          <h2 className="text-4xl font-serif font-bold">Visit the Flame</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Location Box with Dark Themed Map */}
          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 bg-[#100202] rounded-2xl p-8 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="text-[#ff5100] text-2xl mb-4 bg-[#ff5100]/10 w-12 h-12 flex items-center justify-center rounded-full">📍</div>
              <h3 className="text-2xl font-bold mb-4">Location</h3>
              <p className="text-gray-300 text-lg mb-6">
                123 Road<br />
                Colombo 03.
              </p>

              {/* Dark Theme Styled Google Map */}
              <div className="w-full h-52 rounded-xl overflow-hidden mb-6 border border-white/10 bg-[#120905] relative shadow-lg">
                <iframe
                  title="Flame & Crust Location"
                  src="https://maps.google.com/maps?q=Colombo%2003,%20Sri%20Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 0, 
                    filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)' 
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <motion.a 
              href="https://maps.google.com/?q=Colombo+03"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1f120c] border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm w-fit flex items-center gap-2 hover:border-[#ff5100] transition-all"
            >
              Get Directions <span>→</span>
            </motion.a>
          </motion.div>

          {/* Opening Hours Box */}
          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 bg-[#100202] rounded-2xl p-8 cursor-pointer"
          >
            <div className="text-[#ff5100] text-2xl mb-4 bg-[#ff5100]/10 w-12 h-12 flex items-center justify-center rounded-full">🕒</div>
            <h3 className="text-2xl font-bold mb-6">Opening Hours</h3>
            <div className="space-y-2 text-gray-300 text-sm md:text-base">
              <div className="flex justify-between py-1 border-b border-white/5"><span>Monday</span> <span className="text-[#ff5100] font-medium">12pm-12am</span></div>
              <div className="flex justify-between py-1 border-b border-white/5"><span>Tuesday</span> <span className="text-[#ff5100] font-medium">12pm-12am</span></div>
              <div className="flex justify-between py-1 border-b border-white/5"><span>Wednesday</span> <span className="text-[#ff5100] font-medium">12pm-12am</span></div>
              <div className="flex justify-between py-1 border-b border-white/5"><span>Thursday</span> <span className="text-[#ff5100] font-medium">12pm-12am</span></div>
              <div className="flex justify-between py-1 border-b border-white/5"><span>Friday</span> <span className="text-[#ff5100] font-medium">12pm-12am</span></div>
              <div className="flex justify-between py-1 border-b border-white/5"><span>Saturday</span> <span className="text-[#ff5100] font-medium">12pm-12am</span></div>
              <div className="flex justify-between py-1"><span>Sunday</span> <span className="text-[#ff5100] font-medium">12pm-12am</span></div>
            </div>
            <p className="text-gray-400 text-xs mt-4">Open daily for dine-in, takeout, and online delivery across Colombo.</p>
          </motion.div>
        </div>
      </section>

      {/* 5. Gallery Section */}
      <section className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-[#ff5100] font-bold uppercase tracking-widest mb-2 text-sm">The Gallery</h4>
          <h2 className="text-3xl font-serif font-bold">Every detail, shaped by the fire.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gallery Card 1 */}
          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 rounded-2xl overflow-hidden h-80 bg-[#100202] cursor-pointer"
          >
            <img src="/Images/gallery1.jpeg" alt="Gallery 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Gallery Card 2 */}
          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 rounded-2xl overflow-hidden h-80 bg-[#100202] cursor-pointer"
          >
            <img src="/Images/gallery2.jpeg" alt="Gallery 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Gallery Card 3 */}
          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 rounded-2xl overflow-hidden h-80 bg-[#100202] cursor-pointer"
          >
            <img src="/Images/gallery3.jpeg" alt="Gallery 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;