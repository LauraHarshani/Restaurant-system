import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import heroVideo from '../assets/hero-video.mp4';

const Home = () => {
  const navigate = useNavigate(); 
  const [homeData, setHomeData] = useState({
    mainHeadline: "Flame & Crust",
    tagline: "Where urban fire meets gourmet craft. Burgers seared over open flame, pizzas born in 900-degree ovens, and loaded fries that redefine indulgence.",
    cta1Label: "Reserve a Table",
    cta1Url: "/contact",
    cta2Label: "Explore Menu",
    cta2Url: "/menu",
    highlight1Title: "Customer Rating",
    highlight1Value: "4.9",
    highlight1Sub: "",
    highlight2Title: "Open Daily",
    highlight2Value: "12pm - 12am",
    highlight2Sub: "",
    highlight3Title: "Open-Flame",
    highlight3Value: "100%",
    highlight3Sub: "",
    promoActive: true,
    promoHeadline: "20% off your first online order",
    promoCode: "GLOW20",
    promoDescription: "Use code GLOW20 at checkout. Valid through the end of the month.",
    promoCta: "Claim Offer",
    bottomHeading: "READY FOR THE WOOD-FIRED EXPERIENCE?",
    bottomSubtext: "Reserve your spot or order online now. Every dish is a masterpiece born in the fire.",
    bottomBtn1Label: "Reserve a Table",
    bottomBtn1Url: "/contact",
    bottomBtn2Label: "Order Online",
    bottomBtn2Url: "/menu"
  });

  // Dynamic Featured Dishes State from Admin/Database
  const [featuredDishes, setFeaturedDishes] = useState([
    { id: 1, name: "The Blaze Classic Burger", price: "Rs. 1,900.00", image: "/Images/food 2.jpeg" },
    { id: 2, name: "Wood-Fired Glazed Wings", price: "Rs. 1,200.00", image: "/Images/food 4.jpeg" },
    { id: 3, name: "Wood-Fired Supreme Pizza", price: "Rs. 2,500.00", image: "/Images/food 5.jpeg" },
    { id: 4, name: "The Volcano Double Burger", price: "Rs. 2,200.00", image: "/Images/food1.jpeg" },
  ]);

  useEffect(() => {
    fetch('http://localhost:5000/api/content/home')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setHomeData(prev => ({
            ...prev,
            ...data.data
          }));
          if (data.data.featuredDishes && Array.isArray(data.data.featuredDishes)) {
            // Map admin keys (image) to user panel keys (img)
            const mappedDishes = data.data.featuredDishes.map(dish => ({
              ...dish,
              img: dish.image || dish.img
            }));
            setFeaturedDishes(mappedDishes);
          }
        }
      })
      .catch(err => {
        console.error("Error fetching home content:", err);
      });
  }, []);

  // Add to Cart functionality saving to LocalStorage
  const handleAddToCart = (dish) => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = [...existingCart, { ...dish, quantity: 1 }];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    alert(`${dish.name} added to cart successfully! 🛒`);
  };

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
            {homeData.mainHeadline.includes('&') ? (
              <>
                {homeData.mainHeadline.split('&')[0].trim()} <br />
                <span className="text-[#ff5100]">&</span> <br />
                <span className="text-[#ff5100]">{homeData.mainHeadline.split('&')[1]?.trim() || 'Crust'}</span>
              </>
            ) : (
              homeData.mainHeadline
            )}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-medium">
            {homeData.tagline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              onClick={() => navigate(homeData.cta1Url || '/contact')}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px 3px rgba(255, 122, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#ff7a00] to-[#d12200] text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300"
            >
              {homeData.cta1Label}
            </motion.button>
            <motion.button 
              onClick={() => navigate(homeData.cta2Url || '/menu')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/50 bg-transparent text-white px-8 py-3 rounded-full font-bold text-lg hover:border-[#ff5100] transition-all duration-300"
            >
              {homeData.cta2Label}
            </motion.button>
          </div>
        </div>
      </section>

      {/* 2. Info Banner Section */}
      <section className="bg-[#100202] border-y border-[#191818] py-10 relative z-10">
        <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center px-12 md:px-32 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="text-[#ff5100] text-3xl mb-2">⭐</div>
            <h3 className="text-xl font-bold">{homeData.highlight1Value}</h3>
            <p className="text-gray-400 text-sm">{homeData.highlight1Title}</p>
            {homeData.highlight1Sub && <p className="text-xs text-gray-500 mt-1">{homeData.highlight1Sub}</p>}
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#ff5100] text-3xl mb-2">🕒</div>
            <h3 className="text-xl font-bold">{homeData.highlight2Value}</h3>
            <p className="text-gray-400 text-sm">{homeData.highlight2Title}</p>
            {homeData.highlight2Sub && <p className="text-xs text-gray-500 mt-1">{homeData.highlight2Sub}</p>}
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#ff5100] text-3xl mb-2">🔥</div>
            <h3 className="text-xl font-bold">{homeData.highlight3Value}</h3>
            <p className="text-gray-400 text-sm">{homeData.highlight3Title}</p>
            {homeData.highlight3Sub && <p className="text-xs text-gray-500 mt-1">{homeData.highlight3Sub}</p>}
          </div>
        </div>
      </section>

      {/* 3. Limited Offer Section */}
      {(homeData.promoActive === true || homeData.promoActive === "true" || homeData.promoActive === 1) && (
        <section className="py-20 px-4 max-w-[1274px] mx-auto relative z-10 cursor-pointer">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="border border-[#fe6405] bg-[#100202] rounded-[25px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(254,100,5,0.3)]"
          >
            <div>
              <h3 className="text-[#fe6405] text-xl md:text-2xl font-bold mb-3">Limited offer</h3>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{homeData.promoHeadline}</h2>
              <p className="text-gray-300 text-lg">Use code <span className="text-white font-bold">{homeData.promoCode}</span> at checkout. {homeData.promoDescription}</p>
            </div>
            <motion.button 
              onClick={() => navigate('/menu')}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px 3px rgba(255, 122, 0, 0.4)" }}
              whileTap={{ scale: 0.95, boxShadow: "0px 0px 20px 5px rgba(255, 122, 0, 0.8)" }}
              className="bg-gradient-to-r from-[#ff7a00] to-[#d12200] whitespace-nowrap text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300"
            >
              {homeData.promoCta}
            </motion.button>
          </motion.div>
        </section>
      )}

      {/* 4. Featured Dishes Section (Dynamic from Database) */}
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
                key={dish.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="bg-[#120905] border border-white/10 rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(255,81,0,0.4)] transition-all duration-300"
              >
                <div className="h-56 w-full overflow-hidden">
                  <img src={dish.img || dish.image} alt={dish.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-bold mb-4 h-12">{dish.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-semibold">{dish.price}</span>
                    <motion.button 
                      onClick={() => handleAddToCart(dish)}
                      whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px 2px rgba(255, 122, 0, 0.4)" }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-gradient-to-r from-[#ff7a00] to-[#d12200] text-white px-5 py-1.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer"
                    >
                      + Add
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10 mb-8">
            <motion.button 
              onClick={() => navigate('/menu')}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-bold text-lg hover:text-[#ff5100] transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              View Full Menu <span className="text-[#ff5100]">→</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-12 px-4 relative z-10 bg-[#0a0503]">
        <div className="max-w-4xl mx-auto border border-[#FE6405] bg-[#100202] rounded-[30px] p-10 text-center shadow-[0_0_30px_rgba(254,100,5,0.15)]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wider font-serif">{homeData.bottomHeading}</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-sm md:text-base">{homeData.bottomSubtext}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              onClick={() => navigate(homeData.bottomBtn1Url || '/contact')}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px 3px rgba(255, 122, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#ff7a00] to-[#d12200] text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300"
            >
              {homeData.bottomBtn1Label}
            </motion.button>
            <motion.button 
              onClick={() => navigate(homeData.bottomBtn2Url || '/menu')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/50 bg-transparent text-white px-8 py-3.5 rounded-full font-bold hover:border-[#ff5100] transition-all duration-300"
            >
              {homeData.bottomBtn2Label}
            </motion.button>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;