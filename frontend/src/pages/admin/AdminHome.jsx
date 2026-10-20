import React, { useState } from 'react';
import { Save, RefreshCw, Upload, Plus, Monitor, Rocket, Image as ImageIcon, SlidersHorizontal, Star, Clock, Flame, ArrowRight, GripHorizontal, Trash2, Camera, FileImage, Eye } from 'lucide-react';
import heroVideo from '../../assets/hero-video.mp4';

const AdminHome = () => {
  const [homeData, setHomeData] = useState({
    mainHeadline: 'Flame & Crust',
    tagline: 'Where urban fire meets gourmet craft. Burgers seared over open flame, pizzas born in 900-degree ovens, and loaded fries that redefine indulgence',
    cta1Label: 'Reserve a Table',
    cta1Url: '/',
    cta2Label: 'Explore Menu',
    cta2Url: '/',
    
    highlight1Title: 'Customer Rating',
    highlight1Value: '4.9',
    highlight1Sub: '',
    
    highlight2Title: 'Open Daily',
    highlight2Value: '12pm - 12am',
    highlight2Sub: '',
    
    highlight3Title: 'Open-Flame',
    highlight3Value: '100%',
    highlight3Sub: '',
    
    promoActive: true,
    promoHeadline: '20% off your first online order',
    promoCode: 'GLOW20',
    promoDescription: 'Use code GLOW20 at checkout. Valid through the end of the month.',
    promoCta: 'Claim Offer',
    promoUrl: '/',
    promoStart: '07/10/2026',
    promoEnd: '06/11/2026',
    
    bottomHeading: 'READY FOR THE WOOD-FIRED EXPERIENCE?',
    bottomSubtext: 'Reserve your spot or order online now. Every dish is a masterpiece born in the fire.',
    bottomBtn1Label: 'Reserve a Table',
    bottomBtn1Url: '/',
    bottomBtn2Label: 'Order Online',
    bottomBtn2Url: '/'
  });

  const featuredDishesList = [
    { id: 1, slot: '01', name: 'The Blaze Classic Burger', price: 'Rs. 1,900.00', image: '/Images/food 2.jpeg' },
    { id: 2, slot: '02', name: 'Wood-Fired Glazed Wings', price: 'Rs. 1,200.00', image: '/Images/food 4.jpeg' },
    { id: 3, slot: '03', name: 'Wood-Fired Supreme Pizza', price: 'Rs. 2,500.00', image: '/Images/food 5.jpeg' },
    { id: 4, slot: '04', name: 'The Volcano Double Burger', price: 'Rs. 2,200.00', image: '/Images/food1.jpeg' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHomeData({
      ...homeData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = (section) => {
    alert(`${section} changes saved successfully!`);
  };

  const handleAction = (action) => {
    alert(`${action} action triggered!`);
  };

  return (
    <div className="min-h-screen p-6 font-sans text-gray-900 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section (Messages page style - Clean & Flat) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-green-600 font-semibold">Published (Synced 18m ago)</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Home Management</h1>
            <p className="text-gray-500 text-sm mt-1">Curate hero storytelling, real-time highlights, active seasonal promotions, curated dishes, and conversion touchpoints.</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => handleAction('Discard Draft')} className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 shadow-sm">
              <RefreshCw size={16} /> Discard Draft
            </button>
            <button type="button" onClick={() => handleSave('Publish All')} className="flex items-center gap-2 bg-[#ff5100] hover:bg-[#e04800] text-white px-5 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-md shadow-orange-500/20">
              <Rocket size={16} /> Publish All Changes
            </button>
          </div>
        </div>

        {/* 1. Hero Banner */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Hero Banner</h2>
              <p className="text-xs text-gray-500 mt-1">Manage opening headline, background visual asset, and primary conversion links.</p>
            </div>
            <span className="text-[10px] bg-[#f8f9fc] border border-gray-200 text-gray-600 px-2.5 py-1.5 rounded-md font-medium flex items-center gap-1.5">
               <Monitor size={12} className="text-[#ff5100]" /> Desktop & Mobile Fold
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-1.5">Main Headline</label>
              <input type="text" name="mainHeadline" value={homeData.mainHeadline} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#ff5100] focus:ring-1 focus:ring-[#ff5100] outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-1.5">Tagline / Introduction</label>
              <textarea name="tagline" rows="2" value={homeData.tagline} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#ff5100] focus:ring-1 focus:ring-[#ff5100] outline-none resize-none transition-all" />
            </div>

            <div>
               <label className="block text-xs font-semibold text-gray-900 mb-1.5">Hero Background Visual Asset (Video)</label>
               <div className="bg-[#fff9f5] border border-[#ffeadb] rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-32 h-20 bg-gray-200 rounded-lg overflow-hidden relative border border-gray-300">
                    <video src={heroVideo} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-medium tracking-wider">16:9</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">hero-video.mp4</h4>
                    <p className="text-xs text-gray-500 mt-0.5">1920 × 1080 px • 12.4 MB • MP4 Optimized</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-2 h-2 bg-[#10b981] rounded-full"></span>
                      <span className="text-[11px] text-[#10b981] font-semibold tracking-wide">High-Resolution Active</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
                  <button type="button" onClick={() => handleAction('Crop / Focal Point')} className="bg-white border border-gray-200 text-[#0f172a] text-xs px-3 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-1.5 shadow-sm">
                    <SlidersHorizontal size={14} className="text-gray-500" /> Crop / Focal Point
                  </button>
                  <button type="button" onClick={() => handleAction('Upload Photo')} className="bg-white border border-gray-200 text-gray-800 text-xs px-3 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-1.5 shadow-sm">
                    <ImageIcon size={14} className="text-gray-500" /> Upload Photo
                  </button>
                  <button type="button" onClick={() => handleAction('Replace Video')} className="bg-[#ff5100] text-white text-xs px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 hover:bg-[#e04800] transition-all active:scale-95 shadow-sm">
                    <Upload size={14} /> Replace Video
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#ff5100]">PRIMARY CTA LINK</span>
                  <span className="text-[10px] text-gray-500 font-medium">Solid Button</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="block text-[10px] text-gray-500 mb-1 font-medium">Button Label</label>
                      <input type="text" name="cta1Label" value={homeData.cta1Label} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#ff5100]" />
                   </div>
                   <div>
                      <label className="block text-[10px] text-gray-500 mb-1 font-medium">Target URL</label>
                      <input type="text" name="cta1Url" value={homeData.cta1Url} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#ff5100]" />
                   </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-600">SECONDARY CTA LINK</span>
                  <span className="text-[10px] text-gray-500 font-medium">Outline Ghost</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="block text-[10px] text-gray-500 mb-1 font-medium">Button Label</label>
                      <input type="text" name="cta2Label" value={homeData.cta2Label} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#ff5100]" />
                   </div>
                   <div>
                      <label className="block text-[10px] text-gray-500 mb-1 font-medium">Target URL</label>
                      <input type="text" name="cta2Url" value={homeData.cta2Url} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#ff5100]" />
                   </div>
                </div>
              </div>
            </div>

          </div>
          
          <div className="flex justify-end pt-2">
            <button type="button" onClick={() => handleSave('Hero Banner')} className="bg-[#ff5100] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95">✓ Save Changes</button>
          </div>
        </div>

        {/* 2. Stats & Highlights */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 shadow-sm relative">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
             <div>
              <h2 className="text-lg font-bold text-gray-900">Stats & Highlights</h2>
              <p className="text-xs text-gray-500 mt-1">Quick metrics prominently displayed below the hero fold.</p>
             </div>
             <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5 cursor-pointer hover:text-gray-700 transition-colors">
               <RefreshCw size={12} className="text-gray-400" /> Live Frontpage Ribbon
             </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f8f9fc] border border-transparent p-5 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                   <span className="text-xs font-extrabold text-gray-800 tracking-wider">HIGHLIGHT 01</span>
                   <div className="bg-white p-1.5 rounded shadow-sm border border-gray-100">
                     <Star size={14} className="text-[#ff5100] fill-[#ff5100]" />
                   </div>
                </div>
                <div className="space-y-3">
                   <div>
                     <label className="block text-[11px] font-semibold text-gray-500 mb-1">Metric Title / Label</label>
                     <input type="text" name="highlight1Title" value={homeData.highlight1Title} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium focus:border-[#ff5100] outline-none transition-all shadow-sm" />
                   </div>
                   <div>
                     <label className="block text-[11px] font-semibold text-gray-500 mb-1">Stat Value</label>
                     <input type="text" name="highlight1Value" value={homeData.highlight1Value} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-[#ff5100] focus:border-[#ff5100] outline-none transition-all shadow-sm" />
                   </div>
                   <div>
                     <label className="block text-[11px] font-semibold text-gray-500 mb-1">Sub-label / Proof</label>
                     <input type="text" name="highlight1Sub" value={homeData.highlight1Sub} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:border-[#ff5100] outline-none transition-all shadow-sm" />
                   </div>
                </div>
            </div>

            <div className="bg-[#f8f9fc] border border-transparent p-5 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                   <span className="text-xs font-extrabold text-gray-800 tracking-wider">HIGHLIGHT 02</span>
                   <div className="bg-white p-1.5 rounded shadow-sm border border-gray-100">
                     <Clock size={14} className="text-[#ff5100]" />
                   </div>
                </div>
                <div className="space-y-3">
                   <div>
                     <label className="block text-[11px] font-semibold text-gray-500 mb-1">Metric Title / Label</label>
                     <input type="text" name="highlight2Title" value={homeData.highlight2Title} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium focus:border-[#ff5100] outline-none transition-all shadow-sm" />
                   </div>
                   <div>
                     <label className="block text-[11px] font-semibold text-gray-500 mb-1">Stat Value</label>
                     <input type="text" name="highlight2Value" value={homeData.highlight2Value} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-[#ff5100] focus:border-[#ff5100] outline-none transition-all shadow-sm" />
                   </div>
                   <div>
                     <label className="block text-[11px] font-semibold text-gray-500 mb-1">Sub-label / Proof</label>
                     <input type="text" name="highlight2Sub" value={homeData.highlight2Sub} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:border-[#ff5100] outline-none transition-all shadow-sm" />
                   </div>
                </div>
            </div>

            <div className="bg-[#f8f9fc] border border-transparent p-5 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                   <span className="text-xs font-extrabold text-gray-800 tracking-wider">HIGHLIGHT 03</span>
                   <div className="bg-white p-1.5 rounded shadow-sm border border-gray-100">
                     <Flame size={14} className="text-[#ff5100]" />
                   </div>
                </div>
                <div className="space-y-3">
                   <div>
                     <label className="block text-[11px] font-semibold text-gray-500 mb-1">Metric Title / Label</label>
                     <input type="text" name="highlight3Title" value={homeData.highlight3Title} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium focus:border-[#ff5100] outline-none transition-all shadow-sm" />
                   </div>
                   <div>
                     <label className="block text-[11px] font-semibold text-gray-500 mb-1">Stat Value</label>
                     <input type="text" name="highlight3Value" value={homeData.highlight3Value} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-[#ff5100] focus:border-[#ff5100] outline-none transition-all shadow-sm" />
                   </div>
                   <div>
                     <label className="block text-[11px] font-semibold text-gray-500 mb-1">Sub-label / Proof</label>
                     <input type="text" name="highlight3Sub" value={homeData.highlight3Sub} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:border-[#ff5100] outline-none transition-all shadow-sm" />
                   </div>
                </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button type="button" onClick={() => handleSave('Stats')} className="bg-[#ff5100] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95">✓ Save Changes</button>
          </div>
        </div>

        {/* 3. Limited Offer Banner */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
               <h2 className="text-lg font-bold text-gray-900">Limited Offer Banner</h2>
               <p className="text-xs text-gray-500 mt-1">Promotional header ribbon and discount incentives.</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="promoActive" checked={homeData.promoActive} onChange={handleChange} className="sr-only peer" />
                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ff5100]"></div>
              </label>
              <span className="text-xs font-semibold text-gray-700">Show active banner on public site</span>
            </div>
          </div>

          <div className="bg-[#2c1a11] text-white p-3 rounded-lg flex justify-between items-center shadow-inner">
             <div className="flex items-center gap-2.5 text-sm font-medium">
               <Flame size={14} className="text-gray-300" />
               <span>{homeData.promoHeadline} <span className="text-gray-400 mx-1">•</span> PROMO: {homeData.promoCode}</span>
             </div>
             <button type="button" className="bg-white text-gray-900 hover:bg-gray-100 text-[11px] font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors">
               {homeData.promoCta} <ArrowRight size={12} />
             </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1.5">Offer Title / Headline</label>
                <input type="text" name="promoHeadline" value={homeData.promoHeadline} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-[#ff5100] outline-none transition-all shadow-sm" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1.5">Promo Code / Description</label>
                <input type="text" name="promoDescription" value={homeData.promoDescription} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-[#ff5100] outline-none transition-all shadow-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1.5">CTA Button Label</label>
                <input type="text" name="promoCta" value={homeData.promoCta} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-[#ff5100] outline-none transition-all shadow-sm" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1.5">CTA Destination Link</label>
                <input type="text" name="promoUrl" value={homeData.promoUrl} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-[#ff5100] outline-none transition-all shadow-sm" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1.5">Campaign Start Date</label>
                <input type="text" name="promoStart" value={homeData.promoStart} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-[#ff5100] outline-none transition-all shadow-sm" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1.5">Expiration Date</label>
                <input type="text" name="promoEnd" value={homeData.promoEnd} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-[#ff5100] outline-none transition-all shadow-sm" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="button" onClick={() => handleSave('Offer')} className="bg-[#ff5100] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95">✓ Save Changes</button>
          </div>
        </div>

        {/* 4. Featured Dishes */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
               <h2 className="text-lg font-bold text-gray-900">Featured Dishes (Most Loved)</h2>
               <p className="text-xs text-gray-500 mt-1">Curate the 4 flagship culinary creations featured on the main landing page.</p>
            </div>
            <button type="button" onClick={() => handleAction('Add New Dish')} className="flex items-center gap-1.5 text-gray-700 bg-gray-100 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-all active:scale-95">
              <Plus size={14} className="text-[#ff5100]" /> Add New Dish
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishesList.map((dish, index) => (
              <div key={dish.id} className="bg-[#f8f9fc] border border-transparent p-4 rounded-xl space-y-3 relative group">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${index === 0 ? 'bg-[#ffeadb] text-[#ff5100]' : 'bg-gray-200 text-gray-600'}`}>
                    Slot {dish.slot}
                  </span>
                  <div className="flex items-center gap-2 text-gray-400">
                    <GripHorizontal size={14} className="cursor-pointer hover:text-gray-600 transition-colors" />
                    <Trash2 size={14} className="cursor-pointer hover:text-red-500 transition-colors" />
                  </div>
                </div>

                <div className="h-36 bg-gray-200 rounded-lg overflow-hidden relative border border-gray-200">
                   <img src={dish.image} className="w-full h-full object-cover" alt={dish.name} />
                   <button type="button" onClick={() => handleAction(`Replace Image for ${dish.name}`)} className="absolute bottom-2 right-2 bg-black/70 hover:bg-black text-white text-[10px] font-medium px-2.5 py-1.5 rounded-md flex items-center gap-1.5 transition-all active:scale-95 shadow-sm">
                     <Camera size={12} /> Replace
                   </button>
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">Dish Name</label>
                    <input type="text" defaultValue={dish.name} className="w-full bg-white border border-gray-100 rounded-md px-3 py-2 text-xs font-bold text-gray-800 outline-none shadow-sm focus:border-[#ff5100] transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Price</label>
                      <input type="text" defaultValue={dish.price} className="w-full bg-white border border-gray-100 rounded-md px-3 py-2 text-xs font-bold text-gray-800 outline-none shadow-sm focus:border-[#ff5100] transition-all" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Badge Tag</label>
                      <input type="text" defaultValue="" className="w-full bg-white border border-gray-100 rounded-md px-3 py-2 text-xs outline-none shadow-sm focus:border-[#ff5100] transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end pt-4">
            <button type="button" onClick={() => handleSave('Dishes')} className="bg-[#ff5100] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95">✓ Save Changes</button>
          </div>
        </div>

        {/* 5. Bottom CTA (Experience) */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Bottom CTA (Experience)</h2>
              <p className="text-xs text-gray-500 mt-1">Manage the high-conversion closing section that drives reservations and direct orders.</p>
            </div>
            <span className="text-[10px] bg-[#f8f9fc] border border-gray-200 text-gray-600 px-3 py-1.5 rounded-md font-bold">
               Anchor: #experience-footer
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
             <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Main Heading</label>
                  <input type="text" name="bottomHeading" value={homeData.bottomHeading} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold focus:border-[#ff5100] outline-none shadow-sm transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Sub-text / Narrative</label>
                  <textarea name="bottomSubtext" rows="3" value={homeData.bottomSubtext} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 focus:border-[#ff5100] outline-none resize-none shadow-sm transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-[#f8f9fc] p-4 rounded-xl border border-transparent">
                      <label className="block text-[11px] font-extrabold text-[#ff5100] mb-3">Button 01 (Primary)</label>
                      <div className="space-y-3">
                         <input type="text" name="bottomBtn1Label" value={homeData.bottomBtn1Label} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-medium focus:border-[#ff5100] outline-none shadow-sm transition-all" />
                         <input type="text" name="bottomBtn1Url" value={homeData.bottomBtn1Url} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs focus:border-[#ff5100] outline-none shadow-sm transition-all" />
                      </div>
                   </div>
                   <div className="bg-[#f8f9fc] p-4 rounded-xl border border-transparent">
                      <label className="block text-[11px] font-extrabold text-gray-600 mb-3">Button 02 (Secondary)</label>
                      <div className="space-y-3">
                         <input type="text" name="bottomBtn2Label" value={homeData.bottomBtn2Label} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-medium focus:border-[#ff5100] outline-none shadow-sm transition-all" />
                         <input type="text" name="bottomBtn2Url" value={homeData.bottomBtn2Url} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs focus:border-[#ff5100] outline-none shadow-sm transition-all" />
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-[#1e1e24] rounded-xl p-5 flex flex-col justify-between shadow-md relative overflow-hidden">
                <div className="flex justify-between items-center mb-4 relative z-10">
                   <span className="text-[10px] font-extrabold text-gray-300 tracking-wider">BACKGROUND CANVAS PREVIEW</span>
                   <span className="text-[10px] font-bold text-[#ff5100]">Live State</span>
                </div>
                
                <div className="w-full h-40 bg-gradient-to-br from-[#3a1c0d] to-[#1a0c05] rounded-lg mb-4 shadow-inner border border-white/5 relative z-10"></div>

                <div className="grid grid-cols-2 gap-3 relative z-10">
                   <button type="button" onClick={() => handleAction('Change Backdrop')} className="bg-white/10 hover:bg-white/20 text-gray-200 text-xs py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10">
                     <FileImage size={14} className="text-gray-400" /> Change Backdrop
                   </button>
                   <button type="button" onClick={() => handleAction('Simulate View')} className="bg-white/10 hover:bg-white/20 text-gray-200 text-xs py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10">
                     <Eye size={14} className="text-gray-400" /> Simulate View
                   </button>
                </div>
             </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100 mt-6">
            <button type="button" onClick={() => handleSave('Bottom CTA')} className="bg-[#ff5100] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95">✓ Save Changes</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;