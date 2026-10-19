import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Upload, ChevronLeft, User } from "lucide-react";
import { useChefs } from "../../context/ChefContext";

export default function AddChef() {
  const navigate = useNavigate(); const { id } = useParams(); const isEditMode = Boolean(id); const { chefs, updateChef, addChef } = useChefs();
  const [isDragging, setIsDragging] = useState(false); const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", role: "", specialty: "", bio: "", shiftStart: "12:00", shiftEnd: "20:00", publish: true, featured: false });

  useEffect(() => { if (isEditMode) { const existingChef = chefs.find((c) => c.id === Number(id)); if (existingChef) { const nameParts = existingChef.name.split(" "); setFormData({ firstName: nameParts[0], lastName: nameParts.slice(1).join(" "), email: existingChef.email, phone: existingChef.phone, role: existingChef.title, specialty: existingChef.specialty, bio: existingChef.bio, shiftStart: "12:00", shiftEnd: "20:00", publish: true, featured: existingChef.featured || false }); setImagePreview(existingChef.image); } } }, [id, isEditMode, chefs]);

  const handleImageUpload = (file) => { if (file) { const reader = new FileReader(); reader.onloadend = () => setImagePreview(reader.result); reader.readAsDataURL(file); } };
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if (file && file.type.startsWith("image/")) handleImageUpload(file); };
  const handleFileInput = (e) => { const file = e.target.files[0]; if (file) handleImageUpload(file); };

  const handleSave = (e) => { e.preventDefault(); const chefData = { name: `${formData.firstName} ${formData.lastName}`.trim(), title: formData.role, specialty: formData.specialty, bio: formData.bio, image: imagePreview || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800", status: "On duty", shift: "12:00 pm – 8:00 pm", email: formData.email, phone: formData.phone, featured: formData.featured }; if (isEditMode) { updateChef({ ...chefData, id: Number(id) }); alert("Chef updated successfully!"); } else { addChef(chefData); alert("Chef added successfully!"); } navigate("/admin/chefs"); };

  return (
    <div className="text-[#1C1917]">
      <Link to="/admin/chefs" className="text-gray-500 text-[13px] flex items-center gap-1 mb-4 hover:text-[#F97316] transition w-fit"><ChevronLeft size={14} /> Chef Management / {isEditMode ? "Edit Chef" : "Add Chef"}</Link>
      <div className="mb-8"><h1 className="font-display text-[32px] font-bold text-[#1C1917] mb-1">{isEditMode ? "Edit Chef Profile" : "Add Chef"}</h1><p className="text-gray-500 text-[14px]">{isEditMode ? "Update this chef's details, specialties and availability." : "Create a chef profile and set their role, specialties and kitchen availability."}</p></div>
      <form onSubmit={handleSave} className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="font-bold text-[15px] mb-1">Identity & contact</h2><p className="text-[12px] text-gray-500 mb-5">Contact details are for internal use and won't appear on the public profile.</p>
            <div className="grid grid-cols-2 gap-5">
              <div><label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">First name *</label><input required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" placeholder="Enter first name" /></div>
              <div><label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Last name *</label><input required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" placeholder="Enter last name" /></div>
              <div><label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Email address *</label><input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" placeholder="chef@flameandcrust.lk" /></div>
              <div><label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Phone number *</label><input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" placeholder="+94 77 123 4567" /></div>
              <div><label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Chef role *</label><select required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316] text-gray-500 appearance-none bg-white"><option value="">Select a role</option><option value="Executive Chef">Executive Chef</option><option value="Head Pizza Chef">Head Pizza Chef</option><option value="Grill Chef">Grill Chef</option></select></div>
              <div><label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Specialty *</label><input required value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" placeholder="e.g. Wood-fired dough & crust" /></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"><h2 className="font-bold text-[15px] mb-1">Biography</h2><p className="text-[12px] text-gray-500 mb-5">Introduce the chef to customers on the Chefs page.</p><label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">About the chef</label><textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} rows="4" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316] resize-none" placeholder="Share their experience..."></textarea></div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="font-bold text-[15px] mb-1">Profile photo</h2><p className="text-[12px] text-gray-500 mb-4">A clear portrait helps customers meet your kitchen team.</p>
            <div onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} className={"border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer mb-4 " + (isDragging ? "border-[#F97316] bg-[#F97316]/5" : "border-gray-200 hover:bg-gray-50")}>
              {imagePreview ? (<div className="relative"><img src={imagePreview} alt="Preview" className="w-24 h-24 mx-auto rounded-full object-cover mb-3 border border-gray-200" /><p className="text-[12px] font-medium text-green-600">Image selected!</p><p className="text-[11px] text-gray-400 mt-1">Drop a new image to replace</p></div>) : (<><div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3"><User size={20} className="text-gray-400" /></div><p className="text-[12px] font-medium text-[#1C1917] mb-1">Drag & drop a portrait here</p><p className="text-[11px] text-gray-400 mb-3">or choose a file from your device</p><label className="bg-white border border-gray-200 px-4 py-1.5 rounded-lg text-[12px] font-medium text-[#1C1917] flex items-center gap-1.5 mx-auto shadow-sm w-fit hover:bg-gray-50 cursor-pointer"><Upload size={12} /> Upload photo<input type="file" accept="image/*" className="hidden" onChange={handleFileInput} /></label></>)}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="font-bold text-[15px] mb-4">Publication settings</h2>
            <div className="flex items-center justify-between mb-5 cursor-pointer" onClick={() => setFormData({...formData, publish: !formData.publish})}><div><p className="text-[13px] font-medium text-[#1C1917]">Publish profile</p><p className="text-[11px] text-gray-500 mt-0.5">Show this chef on the public Chefs page after saving.</p></div><div className={"w-9 h-5 rounded-full relative transition-colors " + (formData.publish ? "bg-[#F97316]" : "bg-gray-200")}><div className={"w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform " + (formData.publish ? "translate-x-4" : "translate-x-0.5")}></div></div></div>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setFormData({...formData, featured: !formData.featured})}><div><p className="text-[13px] font-medium text-[#1C1917]">Featured chef</p><p className="text-[11px] text-gray-500 mt-0.5">Highlight this profile on the restaurant home page.</p></div><div className={"w-9 h-5 rounded-full relative transition-colors " + (formData.featured ? "bg-[#F97316]" : "bg-gray-200")}><div className={"w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform " + (formData.featured ? "translate-x-4" : "translate-x-0.5")}></div></div></div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 flex justify-between items-center mt-4 pt-6 border-t border-gray-200"><p className="text-[12px] text-gray-400">* Required fields</p><div className="flex gap-3"><Link to="/admin/chefs" className="px-6 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1C1917] bg-white hover:bg-gray-50 transition flex items-center">Cancel</Link><button type="submit" className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2 rounded-lg text-[13px] font-medium shadow-sm transition">{isEditMode ? "Update chef" : "Save chef"}</button></div></div>
      </form>
    </div>
  );
}
