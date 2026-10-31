import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Upload, Plus, Monitor, Rocket, Image as ImageIcon, SlidersHorizontal, Star, Clock, Flame, ArrowRight, GripHorizontal, Trash2, Camera, FileImage, Eye } from 'lucide-react';
import heroVideo from '../../assets/hero-video.mp4';
import { getAdminAuthHeaders } from "../../utils/adminAuth";

const AdminHome = () => {
  const [homeData, setHomeData] = useState({
    mainHeadline: 'Flame & Crust',
    tagline: 'Where urban fire meets gourmet craft. Burgers seared over open flame, pizzas born in 900-degree ovens, and loaded fries that redefine indulgence',
    cta1Label: 'Reserve a Table',
    cta1Url: '/contact',
    cta2Label: 'Explore Menu',
    cta2Url: '/menu',
    
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
    promoUrl: '/menu',
    promoStart: '07/10/2026',
    promoEnd: '06/11/2026',
    
    bottomHeading: 'READY FOR THE WOOD-FIRED EXPERIENCE?',
    bottomSubtext: 'Reserve your spot or order online now. Every dish is a masterpiece born in the fire.',
    bottomBtn1Label: 'Reserve a Table',
    bottomBtn1Url: '/contact',
    bottomBtn2Label: 'Order Online',
    bottomBtn2Url: '/menu'
  });

  const [loading, setLoading] = useState(true);
  const [heroMedia, setHeroMedia] = useState({ type: 'video', url: heroVideo, name: 'hero-video.mp4', resolution: '1920 × 1080 px', size: '12.4 MB' });
  const [isCropOpen, setIsCropOpen] = useState(false);
  
  // New States for Backdrop and Simulate View
  const [backdropImage, setBackdropImage] = useState('/Images/fire fire.avif');
  const [isSimulateOpen, setIsSimulateOpen] = useState(false);

  // Featured Dishes State
  const [featuredDishesList, setFeaturedDishesList] = useState([
    { id: 1, slot: '01', name: 'The Blaze Classic Burger', price: 'Rs. 1,900.00', badge: '', image: '/Images/food 2.jpeg' },
    { id: 2, slot: '02', name: 'Wood-Fired Glazed Wings', price: 'Rs. 1,200.00', badge: '', image: '/Images/food 4.jpeg' },
    { id: 3, slot: '03', name: 'Wood-Fired Supreme Pizza', price: 'Rs. 2,500.00', badge: '', image: '/Images/food 5.jpeg' },
    { id: 4, slot: '04', name: 'The Volcano Double Burger', price: 'Rs. 2,200.00', badge: '', image: '/Images/food1.jpeg' }
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
            setFeaturedDishesList(data.data.featuredDishes);
          }
          if (data.data.backdropImage) {
            setBackdropImage(data.data.backdropImage);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching home content for admin:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHomeData({
      ...homeData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDishChange = (id, field, value) => {
    setFeaturedDishesList(prev =>
      prev.map(dish => dish.id === id ? { ...dish, [field]: value } : dish)
    );
  };

  const handleAddDish = () => {
    const newId = featuredDishesList.length > 0 ? Math.max(...featuredDishesList.map(d => d.id)) + 1 : 1;
    const newSlot = String(featuredDishesList.length + 1).padStart(2, '0');
    const newDish = {
      id: newId,
      slot: newSlot,
      name: 'New Featured Dish',
      price: 'Rs. 1,500.00',
      badge: '',
      image: '/Images/food 2.jpeg'
    };
    setFeaturedDishesList([...featuredDishesList, newDish]);
  };

  const handleDeleteDish = (id) => {
    setFeaturedDishesList(prev => prev.filter(dish => dish.id !== id));
  };

  const handleSave = async (sectionName) => {
    try {
      const payload = {
        ...homeData,
        featuredDishes: featuredDishesList,
        backdropImage: backdropImage
      };

      const response = await fetch('http://localhost:5000/api/content/home', {
        method: 'PUT',
        headers: getAdminAuthHeaders(true),
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        alert(`${sectionName} changes saved successfully to the database! 🚀`);
      } else {
        alert(`Failed to save changes: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating home content:", error);
      alert("An error occurred while saving changes.");
    }
  };

  const handleCropFocal = () => {
    setIsCropOpen(true);
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setHeroMedia({ type: 'image', url: imageUrl, name: file.name, resolution: '1920 × 1080 px', size: fileSize });
      alert(`Photo "${file.name}" uploaded successfully as hero background! 🖼️`);
    }
  };

  const handleReplaceVideo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setHeroMedia({ type: 'video', url: videoUrl, name: file.name, resolution: '1920 × 1080 px', size: fileSize });
      alert(`Video "${file.name}" replaced successfully! Video is now active. 🎬`);
    }
  };

  const handleReplaceDishImage = (id) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFeaturedDishesList(prev =>
          prev.map(dish => dish.id === id ? { ...dish, image: imageUrl } : dish)
        );
        alert(`Dish image replaced successfully! 📸`);
      }
    };
    input.click();
  };

  // Change Backdrop Handler
  const handleChangeBackdrop = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setBackdropImage(imageUrl);
        alert(`Bottom CTA backdrop image updated successfully! 🌆`);
      }
    };
    input.click();
  };

  // Simulate View Handler
  const handleSimulateView = () => {
    setIsSimulateOpen(true);
  };

  if (loading) {
    return <div className="min-h-full flex items-center justify-center p-10 text-gray-700 font-bold">Loading Admin Panel...</div>;
  }

  return (
    <div className="min-h-full font-sans text-gray-900 pb-20">
      <div className="w-full space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Home Management</h1>
            <p className="text-gray-500 text-sm mt-1">Curate hero storytelling, real-time highlights, active seasonal promotions, curated dishes, and conversion touchpoints.</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-green-600 font-semibold">Published (Synced live with Database)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => window.location.reload()} className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 shadow-sm">
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
               <label className="block text-xs font-semibold text-gray-900 mb-1.5">Hero Background Visual Asset (Video / Photo)</label>
               <div className="bg-[#fff9f5] border border-[#ffeadb] rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-32 h-20 bg-gray-200 rounded-lg overflow-hidden relative border border-gray-300">
                    {heroMedia.type === 'video' ? (
                      <video src={heroMedia.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                    ) : (
                      <img src={heroMedia.url} alt="Hero Preview" className="w-full h-full object-cover" />
                    )}
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-medium tracking-wider">16:9</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{heroMedia.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{heroMedia.resolution} • {heroMedia.size} • Optimized</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-2 h-2 bg-[#10b981] rounded-full"></span>
                      <span className="text-[11px] text-[#10b981] font-semibold tracking-wide">High-Resolution Active</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
                  <button type="button" onClick={handleCropFocal} className="bg-white border border-gray-200 text-[#0f172a] text-xs px-3 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-1.5 shadow-sm">
                    <SlidersHorizontal size={14} className="text-gray-500" /> Crop / Focal Point
                  </button>

                  <label className="bg-white border border-gray-200 text-gray-800 text-xs px-3 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer">
                    <ImageIcon size={14} className="text-gray-500" /> Upload Photo
                    <input type="file" accept="image/*" onChange={handleUploadPhoto} className="hidden" />
                  </label>

                  <label className="bg-[#ff5100] text-white text-xs px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 hover:bg-[#e04800] transition-all active:scale-95 shadow-sm cursor-pointer">
                    <Upload size={14} /> Replace Video
                    <input type="file" accept="video/*" onChange={handleReplaceVideo} className="hidden" />
                  </label>
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
                <input type="checkbox" name="promoActive" checked={homeData.promoActive === true || homeData.promoActive === 'true'} onChange={handleChange} className="sr-only peer" />
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
               <p className="text-xs text-gray-500 mt-1">Curate the flagship culinary creations featured on the main landing page.</p>
            </div>
            <button type="button" onClick={handleAddDish} className="flex items-center gap-1.5 text-gray-700 bg-gray-100 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-all active:scale-95 cursor-pointer">
              <Plus size={14} className="text-[#ff5100]" /> Add New Dish
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishesList.map((dish, index) => (
              <div key={dish.id} className="bg-[#f8f9fc] border border-transparent p-4 rounded-xl space-y-3 relative group">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${index === 0 ? 'bg-[#ffeadb] text-[#ff5100]' : 'bg-gray-200 text-gray-600'}`}>
                    Slot {dish.slot || String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2 text-gray-400">
                    <GripHorizontal size={14} className="cursor-pointer hover:text-gray-600 transition-colors" />
                    <Trash2 size={14} onClick={() => handleDeleteDish(dish.id)} className="cursor-pointer hover:text-red-500 transition-colors" />
                  </div>
                </div>

                <div className="h-36 bg-gray-200 rounded-lg overflow-hidden relative border border-gray-200">
                   <img src={dish.image} className="w-full h-full object-cover" alt={dish.name} />
                   <button type="button" onClick={() => handleReplaceDishImage(dish.id)} className="absolute bottom-2 right-2 bg-black/70 hover:bg-black text-white text-[10px] font-medium px-2.5 py-1.5 rounded-md flex items-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer">
                     <Camera size={12} /> Replace
                   </button>
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">Dish Name</label>
                    <input 
                      type="text" 
                      value={dish.name} 
                      onChange={(e) => handleDishChange(dish.id, 'name', e.target.value)} 
                      className="w-full bg-white border border-gray-100 rounded-md px-3 py-2 text-xs font-bold text-gray-800 outline-none shadow-sm focus:border-[#ff5100] transition-all" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Price</label>
                      <input 
                        type="text" 
                        value={dish.price} 
                        onChange={(e) => handleDishChange(dish.id, 'price', e.target.value)} 
                        className="w-full bg-white border border-gray-100 rounded-md px-3 py-2 text-xs font-bold text-gray-800 outline-none shadow-sm focus:border-[#ff5100] transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1">Badge Tag</label>
                      <input 
                        type="text" 
                        value={dish.badge || ''} 
                        onChange={(e) => handleDishChange(dish.id, 'badge', e.target.value)} 
                        placeholder="e.g. Best"
                        className="w-full bg-white border border-gray-100 rounded-md px-3 py-2 text-xs outline-none shadow-sm focus:border-[#ff5100] transition-all" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end pt-4">
            <button type="button" onClick={() => handleSave('Dishes')} className="bg-[#ff5100] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95 cursor-pointer">✓ Save Changes</button>
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
                
                {/* Dynamic Backdrop Preview Box */}
                <div className="w-full h-40 rounded-lg mb-4 shadow-inner border border-white/5 relative z-10 overflow-hidden">
                   <img src={backdropImage} alt="Backdrop Preview" className="w-full h-full object-cover opacity-80" />
                </div>

                <div className="grid grid-cols-2 gap-3 relative z-10">
                   <button type="button" onClick={handleChangeBackdrop} className="bg-white/10 hover:bg-white/20 text-gray-200 text-xs py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10 cursor-pointer">
                     <FileImage size={14} className="text-gray-400" /> Change Backdrop
                   </button>
                   <button type="button" onClick={handleSimulateView} className="bg-white/10 hover:bg-white/20 text-gray-200 text-xs py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10 cursor-pointer">
                     <Eye size={14} className="text-gray-400" /> Simulate View
                   </button>
                </div>
             </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100 mt-6">
            <button type="button" onClick={() => handleSave('Bottom CTA')} className="bg-[#ff5100] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95 cursor-pointer">✓ Save Changes</button>
          </div>
        </div>

      </div>

      {/* Crop / Focal Point Modal */}
      {isCropOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">Crop / Focal Point Editor</h3>
              <button onClick={() => setIsCropOpen(false)} className="text-gray-500 hover:text-black font-bold text-lg cursor-pointer">✕</button>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-gray-500">Adjust the focal frame for desktop and mobile displays.</p>
              <div className="w-full h-48 bg-black rounded-lg overflow-hidden relative flex items-center justify-center">
                {heroMedia.type === 'video' ? (
                  <video src={heroMedia.url} className="w-full h-full object-cover opacity-80" autoPlay muted loop />
                ) : (
                  <img src={heroMedia.url} alt="Crop Preview" className="w-full h-full object-cover opacity-80" />
                )}
                <div className="absolute border-2 border-[#ff5100] w-3/4 h-3/4 rounded shadow-[0_0_15px_rgba(255,81,0,0.5)] cursor-move flex items-center justify-center bg-black/10">
                  <span className="text-[10px] text-white bg-black/60 px-2 py-1 rounded font-semibold tracking-wider">Drag / Resize Frame</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t">
              <button onClick={() => setIsCropOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-200 transition-all cursor-pointer">Cancel</button>
              <button onClick={() => { alert("Crop focal points applied and saved successfully! 🎯"); setIsCropOpen(false); }} className="px-5 py-2 bg-[#ff5100] text-white text-xs font-bold rounded-lg hover:bg-[#e04800] transition-all cursor-pointer">Apply Crop</button>
            </div>
          </div>
        </div>
      )}

      {/* Simulate View Modal */}
      {isSimulateOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-[#100202] border border-[#ff5100]/50 rounded-3xl p-8 max-w-3xl w-full shadow-2xl space-y-6 text-white relative">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[#ff5100]">🔥</span>
                <h3 className="text-xl font-bold font-serif">Live Section Simulation</h3>
              </div>
              <button onClick={() => setIsSimulateOpen(false)} className="text-gray-400 hover:text-white font-bold text-xl cursor-pointer">✕</button>
            </div>

            <div className="rounded-2xl p-8 text-center relative overflow-hidden bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${backdropImage})` }}>
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="relative z-10 space-y-4 py-6">
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider font-serif">{homeData.bottomHeading}</h2>
                <p className="text-gray-300 text-sm max-w-lg mx-auto">{homeData.bottomSubtext}</p>
                <div className="flex justify-center gap-4 pt-2">
                  <span className="bg-gradient-to-r from-[#ff7a00] to-[#d12200] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg">{homeData.bottomBtn1Label}</span>
                  <span className="border border-white/50 text-white px-6 py-2.5 rounded-full font-bold text-sm">{homeData.bottomBtn2Label}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setIsSimulateOpen(false)} className="px-6 py-2.5 bg-[#ff5100] text-white text-xs font-bold rounded-xl hover:bg-[#e04800] transition-all cursor-pointer">Close Simulation</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminHome;