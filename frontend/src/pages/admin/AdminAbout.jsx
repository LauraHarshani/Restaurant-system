import React, { useState } from 'react';
import { 
  RefreshCw, Rocket, Upload, Bold, Italic, 
  Heading, List, ListOrdered, Quote, Link as LinkIcon, 
  MapPin, Trash2, Eye, Pencil 
} from 'lucide-react';

import woodFireVideo from '../../assets/wood-fire_about.mp4';

const AdminAbout = () => {
  const [aboutData, setAboutData] = useState({
    heroTitle: 'OUR STORY',
    subtitle: 'Discover the journey behind our wood-fired perfection',
    storyText: 'Born from a passion for authentic open-flame cooking, Flame & Crust began as a single wood-fired oven in a quiet urban corner. We believe fire is not just a method — it is the soul of every dish. Each pizza, each grill mark, each wisp of smoke carries the character of the flame that shaped it.\n\nOur chefs source heritage grains, seasonal produce, and aged woods — oak, hickory, and cherry — to craft flavors that can only exist when heat, smoke, and patience meet.',
    
    stat1Label: 'Years of Fire',
    stat1Value: '12',
    stat2Label: 'Wood Varieties',
    stat2Value: '48',
    stat3Label: 'Oven Heat',
    stat3Value: '900°F',

    pillar1Title: 'Open-Flame Craft',
    pillar1Desc: 'very dish is kissed by live fire. Our ovens run at 900°F, searing flavor into every crust and cut in under 90 seconds.',
    pillar2Title: 'Sourced with Intent',
    pillar2Desc: 'Heritage grains, heirloom tomatoes, and farm-direct produce. We partner with growers who share our obsession with quality.',
    pillar3Title: 'No Shortcuts',
    pillar3Desc: 'Dough ferments for 48 hours. Woods are aged for seasons. Sauces are built from scratch. Excellence cannot be rushed.',

    streetAddress: '123 Road , Colombo 03',
    mapUrl: 'https://',

    hours: [
      { day: 'Monday', time: '12:00 PM – 11:00 PM', active: true },
      { day: 'Tuesday', time: '12:00 PM – 11:00 PM', active: true },
      { day: 'Wednesday', time: '12:00 PM – 11:00 PM', active: true },
      { day: 'Thursday', time: '12:00 PM – 11:30 PM', active: true },
      { day: 'Friday', time: '12:00 PM – 12:30 AM', active: true },
      { day: 'Saturday', time: '11:30 AM – 12:30 AM', active: true },
      { day: 'Sunday', time: '11:30 AM – 10:30 PM', active: true }
    ]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAboutData({
      ...aboutData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleHourToggle = (index) => {
    const updatedHours = [...aboutData.hours];
    updatedHours[index].active = !updatedHours[index].active;
    setAboutData({ ...aboutData, hours: updatedHours });
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
        
        {/* Header Section (Clean & Flat Style) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-green-600 font-semibold">Published (Synced 22m ago)</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">About Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage brand heritage narrative, core culinary mission values, operational schedules, and flagship photography gallery.</p>
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

        {/* 1. Hero & Story Management */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Hero & Story Management</h2>
              <p className="text-xs text-gray-500 mt-1">Manage the opening brand statement and heritage story.</p>
            </div>
            <span className="text-[10px] bg-[#f8f9fc] border border-gray-200 text-gray-600 px-3 py-1.5 rounded-md font-bold">
               Section ID: #story-hero
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-1.5">Hero Title</label>
              <input type="text" name="heroTitle" value={aboutData.heroTitle} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#ff5100] outline-none transition-all shadow-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-1.5">Subtitle</label>
              <input type="text" name="subtitle" value={aboutData.subtitle} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#ff5100] outline-none transition-all shadow-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-900">Story Text (Rich Content)</label>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center justify-between text-gray-500">
                  <div className="flex items-center gap-3">
                    <button type="button" className="hover:text-gray-900"><Bold size={14} /></button>
                    <button type="button" className="hover:text-gray-900"><Italic size={14} /></button>
                    <button type="button" className="hover:text-gray-900"><Heading size={14} /></button>
                    <span className="w-px h-4 bg-gray-300"></span>
                    <button type="button" className="hover:text-gray-900"><List size={14} /></button>
                    <button type="button" className="hover:text-gray-900"><ListOrdered size={14} /></button>
                    <button type="button" className="hover:text-gray-900"><Quote size={14} /></button>
                    <button type="button" className="hover:text-gray-900"><LinkIcon size={14} /></button>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">Markdown Enabled</span>
                </div>
                <textarea name="storyText" rows="9" value={aboutData.storyText} onChange={handleChange} className="w-full p-4 text-xs text-gray-700 outline-none resize-none leading-relaxed" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-900">Story Media Asset</label>
              <div className="h-[268px] bg-[#1e1e24] rounded-xl relative overflow-hidden flex flex-col justify-between p-4 shadow-md border border-gray-200">
                <div className="flex justify-between items-center relative z-10">
                  <span className="bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded">Primary Banner (16:9)</span>
                  <span className="bg-[#ff5100] text-white text-[10px] font-bold px-2 py-0.5 rounded">MP4 Optimized</span>
                </div>
                
                <div className="absolute inset-0">
                   <video src={woodFireVideo} className="w-full h-full object-cover opacity-80" autoPlay muted loop playsInline />
                </div>

                <div className="flex justify-between items-end relative z-10">
                   <span className="text-[11px] text-gray-200 font-semibold">1920 × 1080 px</span>
                   <button type="button" onClick={() => handleAction('Replace Video')} className="bg-white hover:bg-gray-100 text-gray-900 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-md transition-all active:scale-95">
                     <Upload size={14} /> Replace Video
                   </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <label className="block text-xs font-semibold text-gray-900">Key Metrics / Showcase Stats</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#f8f9fc] p-4 rounded-xl border border-gray-100 space-y-3">
                <span className="text-[10px] font-extrabold text-gray-500 tracking-wider">STAT 1</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Label</label>
                    <input type="text" name="stat1Label" value={aboutData.stat1Label} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-medium outline-none focus:border-[#ff5100]" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Value</label>
                    <input type="text" name="stat1Value" value={aboutData.stat1Value} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-extrabold text-[#ff5100] outline-none focus:border-[#ff5100]" />
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f9fc] p-4 rounded-xl border border-gray-100 space-y-3">
                <span className="text-[10px] font-extrabold text-gray-500 tracking-wider">STAT 2</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Label</label>
                    <input type="text" name="stat2Label" value={aboutData.stat2Label} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-medium outline-none focus:border-[#ff5100]" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Value</label>
                    <input type="text" name="stat2Value" value={aboutData.stat2Value} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-extrabold text-[#ff5100] outline-none focus:border-[#ff5100]" />
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f9fc] p-4 rounded-xl border border-gray-100 space-y-3">
                <span className="text-[10px] font-extrabold text-gray-500 tracking-wider">STAT 3</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Label</label>
                    <input type="text" name="stat3Label" value={aboutData.stat3Label} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-medium outline-none focus:border-[#ff5100]" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Value</label>
                    <input type="text" name="stat3Value" value={aboutData.stat3Value} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-extrabold text-[#ff5100] outline-none focus:border-[#ff5100]" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="button" onClick={() => handleSave('Hero & Story')} className="bg-[#ff5100] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95">✓ Save Changes</button>
          </div>
        </div>

        {/* 2. Mission Manager — What Drives Us */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Mission Manager — What Drives Us</h2>
              <p className="text-xs text-gray-500 mt-1">Core pillars displayed on the About page narrative.</p>
            </div>
            <span className="text-[10px] bg-[#f8f9fc] border border-gray-200 text-gray-600 px-3 py-1.5 rounded-md font-bold">
               3 Active Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f8f9fc] border border-gray-100 p-5 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                 <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-[#ff5100] font-bold">🔥</div>
                 <button type="button" onClick={() => handleAction('Replace Icon 1')} className="bg-white border border-gray-200 text-gray-700 text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 shadow-sm transition-all flex items-center gap-1.5">
                   <Pencil size={12} className="text-gray-500" /> Replace Icon
                 </button>
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">PILLAR TITLE</label>
                <input type="text" name="pillar1Title" value={aboutData.pillar1Title} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-bold text-gray-900 outline-none focus:border-[#ff5100]" />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">DESCRIPTION</label>
                <textarea name="pillar1Desc" rows="4" value={aboutData.pillar1Desc} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 outline-none resize-none focus:border-[#ff5100]" />
              </div>
              <div className="flex justify-between items-center pt-2 text-xs font-semibold text-gray-500">
                <span>Order #1</span>
                <span className="text-[#ff5100]">Live in View</span>
              </div>
            </div>

            <div className="bg-[#f8f9fc] border border-gray-100 p-5 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">⭐</div>
                 <button type="button" onClick={() => handleAction('Replace Icon 2')} className="bg-white border border-gray-200 text-gray-700 text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 shadow-sm transition-all flex items-center gap-1.5">
                   <Pencil size={12} className="text-gray-500" /> Replace Icon
                 </button>
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">PILLAR TITLE</label>
                <input type="text" name="pillar2Title" value={aboutData.pillar2Title} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-bold text-gray-900 outline-none focus:border-[#ff5100]" />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">DESCRIPTION</label>
                <textarea name="pillar2Desc" rows="4" value={aboutData.pillar2Desc} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 outline-none resize-none focus:border-[#ff5100]" />
              </div>
              <div className="flex justify-between items-center pt-2 text-xs font-semibold text-gray-500">
                <span>Order #2</span>
                <span className="text-[#ff5100]">Live in View</span>
              </div>
            </div>

            <div className="bg-[#f8f9fc] border border-gray-100 p-5 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                 <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold">⏱️</div>
                 <button type="button" onClick={() => handleAction('Replace Icon 3')} className="bg-white border border-gray-200 text-gray-700 text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 shadow-sm transition-all flex items-center gap-1.5">
                   <Pencil size={12} className="text-gray-500" /> Replace Icon
                 </button>
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">PILLAR TITLE</label>
                <input type="text" name="pillar3Title" value={aboutData.pillar3Title} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-bold text-gray-900 outline-none focus:border-[#ff5100]" />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">DESCRIPTION</label>
                <textarea name="pillar3Desc" rows="4" value={aboutData.pillar3Desc} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 outline-none resize-none focus:border-[#ff5100]" />
              </div>
              <div className="flex justify-between items-center pt-2 text-xs font-semibold text-gray-500">
                <span>Order #3</span>
                <span className="text-[#ff5100]">Live in View</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="button" onClick={() => handleSave('Mission Manager')} className="bg-[#ff5100] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95">✓ Save Changes</button>
          </div>
        </div>

        {/* 3. Location & Operating Hours */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Location & Operating Hours</h2>
              <p className="text-xs text-gray-500 mt-1">Physical restaurant address, map coordinates, and dining room service timetable.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1.5">Street Address</label>
                <input type="text" name="streetAddress" value={aboutData.streetAddress} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#ff5100] outline-none shadow-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1.5">Map Coordinate / Embed URL</label>
                <input type="text" name="mapUrl" value={aboutData.mapUrl} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#ff5100] outline-none shadow-sm" />
              </div>

              <div className="h-44 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl relative overflow-hidden flex items-center justify-center shadow-inner border border-gray-300">
                <div className="absolute bottom-3 left-3 bg-[#ff5100] text-white p-2 rounded-full shadow-md">
                  <MapPin size={16} />
                </div>
                <button type="button" onClick={() => handleAction('Preview on Map')} className="absolute bottom-3 right-3 bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1 hover:bg-gray-100 transition-all">
                  <Eye size={14} /> Preview on Map
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-1">
                <span className="text-xs font-bold text-gray-900">Service Timetable</span>
                <span className="text-xs font-semibold text-emerald-600">7 of 7 Days Active</span>
              </div>

              <div className="space-y-2.5">
                {aboutData.hours.map((item, index) => (
                  <div key={index} className="bg-[#f8f9fc] border border-gray-100 p-3 rounded-lg flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-gray-900 w-24">{item.day}</span>
                    <input type="text" value={item.time} readOnly className="bg-white border border-gray-200 rounded px-3 py-1.5 text-xs font-medium text-gray-700 w-44 outline-none" />
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-gray-500">{item.active ? 'Active' : 'Closed'}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={item.active} onChange={() => handleHourToggle(index)} className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ff5100]"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="button" onClick={() => handleSave('Location & Hours')} className="bg-[#ff5100] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95">✓ Save Changes</button>
          </div>
        </div>

        {/* 4. The Gallery */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">The Gallery</h2>
              <p className="text-xs text-gray-500 mt-1">Every detail, shaped by the fire.</p>
            </div>
            <span className="text-[10px] bg-[#f8f9fc] border border-gray-200 text-gray-600 px-3 py-1.5 rounded-md font-bold">
               3 Published • 1 Slot Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="h-52 bg-gray-200 rounded-xl relative overflow-hidden group shadow-sm border border-gray-200">
              <img src="/Images/gallery1.jpeg" alt="Gallery 1" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-end">
                  <button type="button" onClick={() => handleAction('Delete Image 1')} className="bg-red-600 text-white p-1.5 rounded-lg hover:bg-red-700 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="text-white">
                  <p className="text-xs font-bold">jpg</p>
                  <p className="text-[10px] text-gray-200">Order #1 • 1.8 MB</p>
                </div>
              </div>
            </div>

            <div className="h-52 bg-gray-200 rounded-xl relative overflow-hidden group shadow-sm border border-gray-200">
              <img src="/Images/gallery2.jpeg" alt="Gallery 2" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-end">
                  <button type="button" onClick={() => handleAction('Delete Image 2')} className="bg-red-600 text-white p-1.5 rounded-lg hover:bg-red-700 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="text-white">
                  <p className="text-xs font-bold">jpg</p>
                  <p className="text-[10px] text-gray-200">Order #2 • 3.1 MB</p>
                </div>
              </div>
            </div>

            <div className="h-52 bg-gray-200 rounded-xl relative overflow-hidden group shadow-sm border border-gray-200">
              <img src="/Images/gallery3.jpeg" alt="Gallery 3" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-end">
                  <button type="button" onClick={() => handleAction('Delete Image 3')} className="bg-red-600 text-white p-1.5 rounded-lg hover:bg-red-700 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="text-white">
                  <p className="text-xs font-bold">jpg</p>
                  <p className="text-[10px] text-gray-200">Order #3 • 2.6 MB</p>
                </div>
              </div>
            </div>

            <div onClick={() => handleAction('Add New Gallery Image')} className="h-52 bg-[#f8f9fc] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-[#ff5100] transition-all group">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-500 mb-2 group-hover:text-[#ff5100]">
                +
              </div>
              <p className="text-xs font-bold text-gray-800">+ Add Image</p>
              <p className="text-[10px] text-gray-400 mt-1">Drop image here or Browse (PNG, JPG up to 10MB)</p>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="button" onClick={() => handleSave('Gallery')} className="bg-[#ff5100] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95">✓ Save Changes</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAbout;