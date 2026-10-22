import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import heroVideo from '../assets/hero-video.mp4';

const Home = () => {
  const navigate = useNavigate(); 

  const handleAddToCart = (dish) => {
    alert(`${dish.name} added to cart! 🛒`);
  };

  const featuredDishes = [
    { id: 1, name: "The Blaze Classic Burger", price: "Rs.1900.00", img: "/Images/food 2.jpeg" },
    { id: 2, name: "Wood-Fired Glazed Wings", price: "Rs.1200.00", img: "/Images/food 4.jpeg" },
    { id: 3, name: "Wood-Fired Supreme Pizza", price: "Rs.2500.00", img: "/Images/food 5.jpeg" },
    { id: 4, name: "The Volcano Double Burger", price: "Rs.2200.00", img: "/Images/food1.jpeg" },
  ];

  return (
    <div className="bg-[#0a0503] text-white min-h-screen font-sans">
      
      {/* 1. Hero Section with Video Background */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            src={heroVideo} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0503]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto mt-20">
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-2 mb-6 bg-black/30 backdrop-blur-sm">
            <span className="text-orange-500">🔥</span>
            <span className="text-sm font-medium tracking-wider">Wood-Fired · Flame-Grilled</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight">
            Flame <br />
            <span className="text-[#ff5100]">&</span> <br />
            <span className="text-[#ff5100]">Crust</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-medium">
            Where urban fire meets gourmet craft. Burgers seared over open flame, pizzas born in 900-degree ovens, and loaded fries that redefine indulgence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px 3px rgba(255, 122, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#ff7a00] to-[#d12200] text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300"
            >
              Reserve a Table
            </motion.button>
            {/* Explore Menu button updated to /menu */}
            <motion.button 
              onClick={() => navigate('/menu')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/50 bg-transparent text-white px-8 py-3 rounded-full font-bold text-lg hover:border-[#ff5100] transition-all duration-300"
            >
              Explore Menu
            </motion.button>
          </div>
        </div>
      </section>

      {/* 2. Info Banner Section */}
      <section className="bg-[#100202] border-y border-[#191818] py-10 relative z-10">
        <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center px-12 md:px-32 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="text-[#ff5100] text-3xl mb-2">⭐</div>
            <h3 className="text-xl font-bold">4.9</h3>
            <p className="text-gray-400 text-sm">Customer Rating</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#ff5100] text-3xl mb-2">🕒</div>
            <h3 className="text-xl font-bold">12pm - 12am</h3>
            <p className="text-gray-400 text-sm">Open Daily</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#ff5100] text-3xl mb-2">🔥</div>
            <h3 className="text-xl font-bold">100%</h3>
            <p className="text-gray-400 text-sm">Open-Flame</p>
          </div>
        </div>
      </section>

      {/* 3. Limited Offer Section */}
      <section className="py-20 px-4 max-w-[1274px] mx-auto relative z-10 cursor-pointer">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="border border-[#fe6405] bg-[#100202] rounded-[25px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(254,100,5,0.3)]"
        >
          <div>
            <h3 className="text-[#fe6405] text-xl md:text-2xl font-bold mb-3">Limited offer</h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">20% off your first online order</h2>
            <p className="text-gray-300 text-lg">Use code <span className="text-white font-bold">GLOW20</span> at checkout. Valid through the end of the month.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px 3px rgba(255, 122, 0, 0.4)" }}
            whileTap={{ scale: 0.95, boxShadow: "0px 0px 20px 5px rgba(255, 122, 0, 0.8)" }}
            className="bg-gradient-to-r from-[#ff7a00] to-[#d12200] whitespace-nowrap text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300"
          >
            Claim Offer
          </motion.button>
        </motion.div>
      </section>

      {/* 4. Featured Dishes Section */}
      <section 
        className="py-16 px-4 bg-cover bg-center relative" 
        style={{ backgroundImage: `url('/Images/fire fire.avif')` }}
      >
        <div className="absolute inset-0 bg-[#0a0503]/80"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-[#ff5100] font-bold tracking-widest uppercase mb-2">Most Loved</h3>
            <h2 className="text-4xl font-serif font-bold mb-4">Featured Dishes</h2>
            <p className="text-gray-400 text-sm">Handpicked from our flame. Each dish is a testament to fire, craft, and flavor.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="bg-[#120905] border border-white/10 rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(255,81,0,0.4)] transition-all duration-300"
              >
                <div className="h-56 w-full overflow-hidden">
                  <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-bold mb-4 h-12">{dish.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-semibold">{dish.price}</span>
                    <motion.button 
                      onClick={() => handleAddToCart(dish)}
                      whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px 2px rgba(255, 122, 0, 0.4)" }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-gradient-to-r from-[#ff7a00] to-[#d12200] text-white px-5 py-1.5 rounded-full text-sm font-bold transition-all duration-300"
                    >
                      + Add
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View Full Menu button updated to /menu */}
          <div className="text-center mt-10 mb-8">
            <motion.button 
              onClick={() => navigate('/menu')}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-bold text-lg hover:text-[#ff5100] transition-all flex items-center justify-center gap-2 mx-auto"
            >
              View Full Menu <span className="text-[#ff5100]">→</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-12 px-4 relative z-10 bg-[#0a0503]">
        <div className="max-w-4xl mx-auto border border-[#FE6405] bg-[#100202] rounded-[30px] p-10 text-center shadow-[0_0_30px_rgba(254,100,5,0.15)]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wider font-serif">Ready for the Wood-Fired Experience?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-sm md:text-base">Reserve your spot or order online now. Every dish is a masterpiece born in the fire.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px 3px rgba(255, 122, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#ff7a00] to-[#d12200] text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300"
            >
              Reserve a Table
            </motion.button>
            {/* Order Online button updated to /menu */}
            <motion.button 
              onClick={() => navigate('/menu')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/50 bg-transparent text-white px-8 py-3.5 rounded-full font-bold hover:border-[#ff5100] transition-all duration-300"
            >
              Order Online
            </motion.button>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;