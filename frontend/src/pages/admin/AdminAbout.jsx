import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, Rocket, Upload, Bold, Italic, 
  Heading, List, ListOrdered, Quote, Link as LinkIcon, 
  MapPin, Trash2, Eye, Pencil, Plus 
} from 'lucide-react';

import woodFireVideo from '../../assets/wood-fire_about.mp4';
import { getAdminAuthHeaders } from "../../utils/adminAuth";

const AdminAbout = () => {
  const [aboutData, setAboutData] = useState({
    heroTitle: 'OUR STORY',
    subtitle: 'Discover the journey behind our wood-fired perfection',
    storyText: '',
    stat1Label: '',
    stat1Value: '',
    stat2Label: '',
    stat2Value: '',
    stat3Label: '',
    stat3Value: '',
    
    pillar1Title: '',
    pillar1Desc: '',
    pillar1Icon: '🔥',

    pillar2Title: '',
    pillar2Desc: '',
    pillar2Icon: '⭐',

    pillar3Title: '',
    pillar3Desc: '',
    pillar3Icon: '⏱️',

    streetAddress: '',
    mapUrl: '',
    hours: [],
    gallery: [
      { id: 1, url: '/Images/gallery1.jpeg', size: '1.8 MB' },
      { id: 2, url: '/Images/gallery2.jpeg', size: '3.1 MB' },
      { id: 3, url: '/Images/gallery3.jpeg', size: '2.6 MB' }
    ]
  });

  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(woodFireVideo);

  // Fetch live database content when admin panel loads
  useEffect(() => {
    fetch('http://localhost:5000/api/content/about')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAboutData(prev => ({
            ...prev,
            ...data.data,
            gallery: data.data.gallery || prev.gallery
          }));
          if (data.data.videoUrl) {
            setSelectedVideo(data.data.videoUrl);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching about content for admin:", err);
        setLoading(false);
      });
  }, []);

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

  // Function to replace Pillar Icon dynamically
  const handleReplaceIcon = (pillarNum) => {
    const currentIcon = pillarNum === 1 ? aboutData.pillar1Icon : pillarNum === 2 ? aboutData.pillar2Icon : aboutData.pillar3Icon;
    const newIcon = prompt("Enter new icon or emoji (e.g. 🍕, 🌿, 🔥, 🏆):", currentIcon || '🔥');
    if (newIcon !== null) {
      setAboutData({
        ...aboutData,
        [`pillar${pillarNum}Icon`]: newIcon
      });
    }
  };

  // Rich Text Formatting helper functions for Toolbar Icons
  const applyFormatting = (tagStart, tagEnd = '') => {
    const textarea = document.getElementById('storyTextarea');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    const replacement = tagStart + selectedText + tagEnd;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    
    setAboutData({ ...aboutData, storyText: newText });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagStart.length, end + tagStart.length);
    }, 0);
  };

  // Handle Video file upload & replacement
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setSelectedVideo(videoURL);
      setAboutData({ ...aboutData, videoUrl: videoURL });
      alert('Video selected successfully! Click "Publish All Changes" to save.');
    }
  };

  // Handle Adding New Gallery Image
  const handleAddGalleryImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      const newGalleryItem = {
        id: Date.now(),
        url: imageUrl,
        size: fileSize
      };
      setAboutData({
        ...aboutData,
        gallery: [...aboutData.gallery, newGalleryItem]
      });
    }
  };

  // Handle Deleting Gallery Image
  const handleDeleteGalleryImage = (indexToDelete) => {
    const updatedGallery = aboutData.gallery.filter((_, index) => index !== indexToDelete);
    setAboutData({ ...aboutData, gallery: updatedGallery });
  };

  // Save changes to backend database via PUT request
  const handleSave = async (section) => {
    try {
      const response = await fetch('http://localhost:5000/api/content/about', {
        method: 'PUT',
        headers: getAdminAuthHeaders(true),
        body: JSON.stringify({ ...aboutData, videoUrl: selectedVideo }),
      });

      const result = await response.json();
      if (result.success) {
        alert(`${section} changes saved successfully to database! 🚀`);
      } else {
        alert(`Failed to save changes: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating about content:", error);
      alert("An error occurred while saving changes.");
    }
  };

  const handleAction = (action) => {
    alert(`${action} action triggered!`);
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
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">About Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage brand heritage narrative, core culinary mission values, operational schedules, and flagship photography gallery.</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-green-600 font-semibold">Published (Synced live with Database)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => window.location.reload()} className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 shadow-sm cursor-pointer">
              <RefreshCw size={16} /> Discard Draft
            </button>
            <button type="button" onClick={() => handleSave('Publish All')} className="flex items-center gap-2 bg-[#ff5100] hover:bg-[#e04800] text-white px-5 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-md shadow-orange-500/20 cursor-pointer">
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
              <input type="text" name="heroTitle" value={aboutData.heroTitle || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#ff5100] outline-none transition-all shadow-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-1.5">Subtitle</label>
              <input type="text" name="subtitle" value={aboutData.subtitle || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#ff5100] outline-none transition-all shadow-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            
            {/* Rich Text Editor with Working Toolbar Icons */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-900">Story Text (Rich Content)</label>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center justify-between text-gray-500">
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => applyFormatting('**', '**')} className="hover:text-gray-900 cursor-pointer" title="Bold"><Bold size={14} /></button>
                    <button type="button" onClick={() => applyFormatting('*', '*')} className="hover:text-gray-900 cursor-pointer" title="Italic"><Italic size={14} /></button>
                    <button type="button" onClick={() => applyFormatting('### ')} className="hover:text-gray-900 cursor-pointer" title="Heading"><Heading size={14} /></button>
                    <span className="w-px h-4 bg-gray-300"></span>
                    <button type="button" onClick={() => applyFormatting('- ')} className="hover:text-gray-900 cursor-pointer" title="Bullet List"><List size={14} /></button>
                    <button type="button" onClick={() => applyFormatting('1. ')} className="hover:text-gray-900 cursor-pointer" title="Numbered List"><ListOrdered size={14} /></button>
                    <button type="button" onClick={() => applyFormatting('> ')} className="hover:text-gray-900 cursor-pointer" title="Quote"><Quote size={14} /></button>
                    <button type="button" onClick={() => applyFormatting('[', '](url)')} className="hover:text-gray-900 cursor-pointer" title="Link"><LinkIcon size={14} /></button>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">Markdown Enabled</span>
                </div>
                <textarea 
                  id="storyTextarea"
                  name="storyText" 
                  rows="9" 
                  value={aboutData.storyText || ''} 
                  onChange={handleChange} 
                  className="w-full p-4 text-xs text-gray-700 outline-none resize-none leading-relaxed" 
                />
              </div>
            </div>

            {/* Video Upload & Replacement Asset Box */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-900">Story Media Asset</label>
              <div className="h-[268px] bg-[#1e1e24] rounded-xl relative overflow-hidden flex flex-col justify-between p-4 shadow-md border border-gray-200">
                <div className="flex justify-between items-center relative z-10">
                  <span className="bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded">Primary Banner (16:9)</span>
                  <span className="bg-[#ff5100] text-white text-[10px] font-bold px-2 py-0.5 rounded">MP4 Optimized</span>
                </div>
                
                <div className="absolute inset-0">
                   <video src={selectedVideo} className="w-full h-full object-cover opacity-80" autoPlay muted loop playsInline />
                </div>

                <div className="flex justify-between items-end relative z-10">
                   <span className="text-[11px] text-gray-200 font-semibold">1920 × 1080 px</span>
                   
                   <label className="bg-white hover:bg-gray-100 text-gray-900 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer">
                     <Upload size={14} /> Replace Video
                     <input type="file" accept="video/mp4,video/webm" onChange={handleVideoUpload} className="hidden" />
                   </label>
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
                    <input type="text" name="stat1Label" value={aboutData.stat1Label || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-medium outline-none focus:border-[#ff5100]" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Value</label>
                    <input type="text" name="stat1Value" value={aboutData.stat1Value || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-extrabold text-[#ff5100] outline-none focus:border-[#ff5100]" />
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f9fc] p-4 rounded-xl border border-gray-100 space-y-3">
                <span className="text-[10px] font-extrabold text-gray-500 tracking-wider">STAT 2</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Label</label>
                    <input type="text" name="stat2Label" value={aboutData.stat2Label || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-medium outline-none focus:border-[#ff5100]" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Value</label>
                    <input type="text" name="stat2Value" value={aboutData.stat2Value || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-extrabold text-[#ff5100] outline-none focus:border-[#ff5100]" />
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f9fc] p-4 rounded-xl border border-gray-100 space-y-3">
                <span className="text-[10px] font-extrabold text-gray-500 tracking-wider">STAT 3</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Label</label>
                    <input type="text" name="stat3Label" value={aboutData.stat3Label || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-medium outline-none focus:border-[#ff5100]" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Value</label>
                    <input type="text" name="stat3Value" value={aboutData.stat3Value || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-extrabold text-[#ff5100] outline-none focus:border-[#ff5100]" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="button" onClick={() => handleSave('Hero & Story')} className="bg-[#ff5100] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95 cursor-pointer">✓ Save Changes</button>
          </div>
        </div>

        {/* 2. Mission Manager */}
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
            
            {/* Pillar 1 */}
            <div className="bg-[#f8f9fc] border border-gray-100 p-5 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                 <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-[#ff5100] font-bold text-lg">
                   {aboutData.pillar1Icon || '🔥'}
                 </div>
                 <button type="button" onClick={() => handleReplaceIcon(1)} className="bg-white border border-gray-200 text-gray-700 text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
                   <Pencil size={12} className="text-gray-500" /> Replace Icon
                 </button>
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">PILLAR TITLE</label>
                <input type="text" name="pillar1Title" value={aboutData.pillar1Title || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-bold text-gray-900 outline-none focus:border-[#ff5100]" />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">DESCRIPTION</label>
                <textarea name="pillar1Desc" rows="4" value={aboutData.pillar1Desc || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 outline-none resize-none focus:border-[#ff5100]" />
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#f8f9fc] border border-gray-100 p-5 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
                   {aboutData.pillar2Icon || '⭐'}
                 </div>
                 <button type="button" onClick={() => handleReplaceIcon(2)} className="bg-white border border-gray-200 text-gray-700 text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
                   <Pencil size={12} className="text-gray-500" /> Replace Icon
                 </button>
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">PILLAR TITLE</label>
                <input type="text" name="pillar2Title" value={aboutData.pillar2Title || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-bold text-gray-900 outline-none focus:border-[#ff5100]" />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">DESCRIPTION</label>
                <textarea name="pillar2Desc" rows="4" value={aboutData.pillar2Desc || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 outline-none resize-none focus:border-[#ff5100]" />
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#f8f9fc] border border-gray-100 p-5 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                 <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold text-lg">
                   {aboutData.pillar3Icon || '⏱️'}
                 </div>
                 <button type="button" onClick={() => handleReplaceIcon(3)} className="bg-white border border-gray-200 text-gray-700 text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
                   <Pencil size={12} className="text-gray-500" /> Replace Icon
                 </button>
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">PILLAR TITLE</label>
                <input type="text" name="pillar3Title" value={aboutData.pillar3Title || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-bold text-gray-900 outline-none focus:border-[#ff5100]" />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">DESCRIPTION</label>
                <textarea name="pillar3Desc" rows="4" value={aboutData.pillar3Desc || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-700 outline-none resize-none focus:border-[#ff5100]" />
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="button" onClick={() => handleSave('Mission Manager')} className="bg-[#ff5100] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95 cursor-pointer">✓ Save Changes</button>
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
                <input type="text" name="streetAddress" value={aboutData.streetAddress || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#ff5100] outline-none shadow-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1.5">Map Coordinate / Embed URL</label>
                <input type="text" name="mapUrl" value={aboutData.mapUrl || ''} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#ff5100] outline-none shadow-sm" />
              </div>

              <div className="h-44 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl relative overflow-hidden flex items-center justify-center shadow-inner border border-gray-300">
                <iframe
                  title="Admin Location Preview"
                  src={aboutData.mapUrl || "https://maps.google.com/maps?q=Colombo%2003,%20Sri%20Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed"}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)' }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-1">
                <span className="text-xs font-bold text-gray-900">Service Timetable</span>
                <span className="text-xs font-semibold text-emerald-600">7 of 7 Days Active</span>
              </div>

              <div className="space-y-2.5">
                {aboutData.hours?.map((item, index) => (
                  <div key={index} className="bg-[#f8f9fc] border border-gray-100 p-3 rounded-lg flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-gray-900 w-24">{item.day}</span>
                    <input 
                      type="text" 
                      value={item.time || ''} 
                      onChange={(e) => {
                        const updatedHours = [...aboutData.hours];
                        updatedHours[index].time = e.target.value;
                        setAboutData({ ...aboutData, hours: updatedHours });
                      }}
                      className="bg-white border border-gray-200 rounded px-3 py-1.5 text-xs font-medium text-gray-700 w-44 outline-none focus:border-[#ff5100]" 
                    />
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
            <button type="button" onClick={() => handleSave('Location & Hours')} className="bg-[#ff5100] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#e04800] transition-all active:scale-95 cursor-pointer">✓ Save Changes</button>
          </div>
        </div>

        {/* 4. Gallery Management Section (Matching your design screenshot) */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">The Gallery</h2>
              <p className="text-xs text-gray-500 mt-1">Every detail, shaped by the fire.</p>
            </div>
            <span className="text-xs font-semibold text-gray-600">
               {aboutData.gallery?.length || 0} Published • {Math.max(0, 5 - (aboutData.gallery?.length || 0))} Slots Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Existing Gallery Images */}
            {aboutData.gallery?.map((imgItem, index) => (
              <div key={imgItem.id || index} className="bg-[#120905] rounded-2xl overflow-hidden relative flex flex-col justify-between p-3 shadow-md border border-white/10 group h-64">
                <div className="absolute top-4 right-4 z-10">
                  <button 
                    type="button" 
                    onClick={() => handleDeleteGalleryImage(index)}
                    className="w-8 h-8 bg-white/90 hover:bg-white text-red-600 rounded-lg flex items-center justify-center shadow transition-all cursor-pointer"
                    title="Delete Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="absolute inset-0">
                  <img src={imgItem.url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover opacity-80" />
                </div>

                <div className="relative z-10 mt-auto bg-black/60 backdrop-blur-sm p-2.5 rounded-xl">
                  <span className="text-xs font-bold text-white block">.jpg</span>
                  <span className="text-[11px] text-gray-300 font-medium">Order #{index + 1} • {imgItem.size || '1.8 MB'}</span>
                </div>
              </div>
            ))}

            {/* Add Image Card Slot */}
            <label className="border-2 border-dashed border-gray-200 hover:border-[#ff5100] bg-[#f8f9fc] rounded-2xl h-64 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all group">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#ff5100] mb-3 group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <span className="text-xs font-bold text-gray-900 mb-1">+ Add Image</span>
              <span className="text-[10px] text-gray-400 leading-relaxed">Drop image here or Browse<br/>(PNG, JPG up to 10MB)</span>
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleAddGalleryImage} className="hidden" />
            </label>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="button" onClick={() => handleSave('Gallery')} className="bg-[#ff5100] hover:bg-[#e04800] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer">✓ Save Changes</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAbout;