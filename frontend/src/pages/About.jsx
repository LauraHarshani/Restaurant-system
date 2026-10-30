import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import video files from assets
import aboutHeroVideo from '../assets/about-hero.mp4';
import woodFireVideo from '../assets/wood-fire_about.mp4';

const About = () => {
  const [aboutData, setAboutData] = useState({
    heroTitle: 'OUR STORY',
    subtitle: 'Discover the journey behind our wood-fired perfection',
    storyText: '',
    stat1Label: 'Years of Fire',
    stat1Value: '12',
    stat2Label: 'Wood Varieties',
    stat2Value: '48',
    stat3Label: 'Oven Heat',
    stat3Value: '900°F',
    pillar1Title: 'Open-Flame Craft',
    pillar1Desc: '',
    pillar2Title: 'Sourced with Intent',
    pillar2Desc: '',
    pillar3Title: 'No Shortcuts',
    pillar3Desc: '',
    streetAddress: '',
    mapUrl: '',
    hours: [],
    gallery: []
  });

  // Fetch updated data from backend database
  useEffect(() => {
    fetch('http://localhost:5000/api/content/about')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAboutData(prev => ({ ...prev, ...data.data }));
        }
      })
      .catch(err => console.error("Error fetching about content:", err));
  }, []);

  return (
    <div className="bg-[#0a0503] text-white min-h-screen font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative flex min-h-[420px] justify-center overflow-hidden px-5 text-center sm:min-h-[480px]">
        <div className="absolute inset-0 z-0">
          <video 
            src={aboutHeroVideo} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0a0503]"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-32 sm:pt-36">
          <h1 className="mb-4 font-display text-5xl font-bold leading-tight tracking-wide text-[#F5F2EB] md:text-7xl">
            {aboutData.heroTitle}
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-200 sm:text-lg">
            {aboutData.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Story Content & Stats Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
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

          <div className="w-full lg:w-1/2">
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 whitespace-pre-line">
              {aboutData.storyText}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#ff5100] mb-1">{aboutData.stat1Value}</h3>
                <p className="text-gray-400 text-xs md:text-sm">{aboutData.stat1Label}</p>
              </div>
              <div className="border-x border-white/10">
                <h3 className="text-3xl md:text-4xl font-bold text-[#ff5100] mb-1">{aboutData.stat2Value}</h3>
                <p className="text-gray-400 text-xs md:text-sm">{aboutData.stat2Label}</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#ff5100] mb-1">{aboutData.stat3Value}</h3>
                <p className="text-gray-400 text-xs md:text-sm">{aboutData.stat3Label}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-[#ff5100] font-bold uppercase tracking-widest mb-2 text-sm">What Drives Us</h4>
          <h2 className="text-4xl font-serif font-bold">Mission</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 bg-[#100202] rounded-2xl p-8 cursor-pointer"
          >
            <div className="text-[#ff5100] text-2xl mb-4 bg-[#ff5100]/10 w-12 h-12 flex items-center justify-center rounded-full">🔥</div>
            <h3 className="text-xl font-bold mb-3">{aboutData.pillar1Title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{aboutData.pillar1Desc}</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 bg-[#100202] rounded-2xl p-8 cursor-pointer"
          >
            <div className="text-[#ff5100] text-2xl mb-4 bg-[#ff5100]/10 w-12 h-12 flex items-center justify-center rounded-full">⭐</div>
            <h3 className="text-xl font-bold mb-3">{aboutData.pillar2Title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{aboutData.pillar2Desc}</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 bg-[#100202] rounded-2xl p-8 cursor-pointer"
          >
            <div className="text-[#ff5100] text-2xl mb-4 bg-[#ff5100]/10 w-12 h-12 flex items-center justify-center rounded-full">🕒</div>
            <h3 className="text-xl font-bold mb-3">{aboutData.pillar3Title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{aboutData.pillar3Desc}</p>
          </motion.div>
        </div>
      </section>

      {/* 4. Find Us Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-[#ff5100] font-bold uppercase tracking-widest mb-2 text-sm">Find Us</h4>
          <h2 className="text-4xl font-serif font-bold">Visit the Flame</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 bg-[#100202] rounded-2xl p-8 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="text-[#ff5100] text-2xl mb-4 bg-[#ff5100]/10 w-12 h-12 flex items-center justify-center rounded-full">📍</div>
              <h3 className="text-2xl font-bold mb-4">Location</h3>
              <p className="text-gray-300 text-lg mb-6 whitespace-pre-line">{aboutData.streetAddress}</p>

              <div className="w-full h-52 rounded-xl overflow-hidden mb-6 border border-white/10 bg-[#120905] relative shadow-lg">
                <iframe
                  title="Flame & Crust Location"
                  src="https://maps.google.com/maps?q=Colombo%2003,%20Sri%20Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)' }}
                  allowFullScreen=""
                  loading="lazy"
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

          <motion.div 
            whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 bg-[#100202] rounded-2xl p-8 cursor-pointer"
          >
            <div className="text-[#ff5100] text-2xl mb-4 bg-[#ff5100]/10 w-12 h-12 flex items-center justify-center rounded-full">🕒</div>
            <h3 className="text-2xl font-bold mb-6">Opening Hours</h3>
            <div className="space-y-2 text-gray-300 text-sm md:text-base">
              {aboutData.hours?.map((item, index) => (
                item.active && (
                  <div key={index} className="flex justify-between py-1 border-b border-white/5">
                    <span>{item.day}</span> 
                    <span className="text-[#ff5100] font-medium">{item.time}</span>
                  </div>
                )
              ))}
            </div>
            <p className="text-gray-400 text-xs mt-4">Open daily for dine-in, takeout, and online delivery across Colombo.</p>
          </motion.div>
        </div>
      </section>

      {/* 5. Gallery Section (Dynamically Rendered from Database) */}
      <section className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-[#ff5100] font-bold uppercase tracking-widest mb-2 text-sm">The Gallery</h4>
          <h2 className="text-3xl font-serif font-bold">Every detail, shaped by the fire.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutData.gallery?.map((imgItem, index) => (
            <motion.div 
              key={imgItem.id || index} 
              whileHover={{ y: -8, borderColor: "#F97316", boxShadow: "0px 10px 25px rgba(249,115,22,0.25)" }} 
              transition={{ duration: 0.3 }} 
              className="border border-white/10 rounded-2xl overflow-hidden h-80 bg-[#100202] cursor-pointer"
            >
              <img src={imgItem.url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;