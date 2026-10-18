import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Upload, ChevronLeft, Image as ImageIcon } from "lucide-react";
import { menuItems } from "../../data/mockData";

export default function AddDish() {
  const navigate = useNavigate();
  const { id } = useParams(); // Check if we are in Edit mode
  const isEditMode = Boolean(id);

  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    chef: "",
    price: "",
    code: "",
    prepTime: "",
    portion: "",
    allergens: "",
    notes: "",
    available: true,
    published: false,
    featured: false,
  });

  // Load existing data if in Edit Mode
  useEffect(() => {
    if (isEditMode) {
      const existingDish = menuItems.find((item) => item.id === Number(id));
      if (existingDish) {
        setFormData({
          name: existingDish.name,
          description: existingDish.description,
          category: existingDish.category,
          chef: existingDish.chef,
          price: existingDish.price.toString(),
          code: existingDish.code,
          prepTime: existingDish.prepTime,
          portion: "",
          allergens: "",
          notes: "",
          available: existingDish.available,
          published: true,
          featured: existingDish.featured || false,
        });
        setImagePreview(existingDish.image);
      }
    }
  }, [id, isEditMode]);

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleImageUpload(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(isEditMode ? "Updating Dish:" : "Saving New Dish:", { ...formData, image: imagePreview });
    alert(isEditMode ? "Dish updated successfully! (Mock backend)" : "Dish saved successfully! (Mock backend)");
    navigate("/admin/menu");
  };

  return (
    <div className="text-[#1C1917]">
      <Link to="/admin/menu" className="text-gray-500 text-[13px] flex items-center gap-1 mb-4 hover:text-[#F97316] transition w-fit">
        <ChevronLeft size={14} /> Menu Management / {isEditMode ? "Edit Dish" : "Add Dish"}
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-[32px] font-bold text-[#1C1917] mb-1">
          {isEditMode ? "Edit Dish" : "Add Dish"}
        </h1>
        <p className="text-gray-500 text-[14px]">
          {isEditMode ? "Update this dish's details, pricing and availability." : "Add a new signature dish with its price, preparation details and menu availability."}
        </p>
      </div>

      <form onSubmit={handleSave} className="grid md:grid-cols-3 gap-6">
        {/* Left Column (Forms) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Dish Details */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="font-bold text-[15px] mb-1">Dish details</h2>
            <p className="text-[12px] text-gray-500 mb-5">This information appears on the customer-facing menu.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Dish name *</label>
                <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" placeholder="Enter dish name" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Description *</label>
                <textarea required rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316] resize-none" placeholder="Describe the flavours..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Category *</label>
                  <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316] text-gray-500 appearance-none bg-white">
                    <option value="">Select a category</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Wings">Wings</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Assigned chef *</label>
                  <select required value={formData.chef} onChange={(e) => setFormData({...formData, chef: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316] text-gray-500 appearance-none bg-white">
                    <option value="">Select a chef</option>
                    <option value="Arjun Perera">Arjun Perera</option>
                    <option value="Maya Fernando">Maya Fernando</option>
                    <option value="Daniel Silva">Daniel Silva</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Preparation */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="font-bold text-[15px] mb-1">Pricing & preparation</h2>
            <p className="text-[12px] text-gray-500 mb-5">Prices are shown in Sri Lankan rupees (LKR).</p>
            
            <div className="grid grid-cols-2 gap-5 mb-4">
              <div>
                <label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Selling price *</label>
                <input required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" placeholder="Rs. 0.00" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Dish code</label>
                <input value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" placeholder="e.g. FC-B03" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Preparation time *</label>
                <input required value={formData.prepTime} onChange={(e) => setFormData({...formData, prepTime: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" placeholder="e.g. 1520 min" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Portion / serving size</label>
                <input value={formData.portion} onChange={(e) => setFormData({...formData, portion: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" placeholder="e.g. 1 burger with fries" />
              </div>
            </div>

            <div>
               <label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Allergens</label>
               <input value={formData.allergens} onChange={(e) => setFormData({...formData, allergens: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]" placeholder="e.g. Gluten, dairy, eggs" />
            </div>
          </div>

          {/* Kitchen Notes */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="font-bold text-[15px] mb-4">Kitchen notes</h2>
            <label className="block text-[12px] font-medium text-[#1C1917] mb-1.5">Preparation instructions</label>
            <textarea rows="3" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316] resize-none" placeholder="Add plating instructions..."></textarea>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Food Photo */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="font-bold text-[15px] mb-1">Food photo</h2>
            <p className="text-[12px] text-gray-500 mb-4">Show the finished dish as it will be served.</p>
            
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={"border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer mb-4 " + (isDragging ? "border-[#F97316] bg-[#F97316]/5" : "border-gray-200 hover:bg-gray-50")}
            >
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-32 rounded-lg object-cover mb-3 border border-gray-200" />
                  <p className="text-[12px] font-medium text-green-600">Image selected!</p>
                  <p className="text-[11px] text-gray-400 mt-1">Drop a new image to replace</p>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ImageIcon size={20} className="text-[#F97316]" />
                  </div>
                  <p className="text-[12px] font-medium text-[#1C1917] mb-1">Drag & drop a food photo here</p>
                  <p className="text-[11px] text-gray-400 mb-3">or choose a file from your device</p>
                  <label className="bg-white border border-gray-200 px-4 py-1.5 rounded-lg text-[12px] font-medium text-[#1C1917] flex items-center gap-1.5 mx-auto shadow-sm w-fit hover:bg-gray-50 cursor-pointer">
                    <Upload size={12} /> Upload photo
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Availability & Visibility */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="font-bold text-[15px] mb-4">Availability & visibility</h2>
            
            <div className="flex items-center justify-between mb-5 cursor-pointer" onClick={() => setFormData({...formData, available: !formData.available})}>
              <div>
                <p className="text-[13px] font-medium text-[#1C1917]">Available to order</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Customers can add this dish to their order when available.</p>
              </div>
              <div className={"w-9 h-5 rounded-full relative transition-colors " + (formData.available ? "bg-[#F97316]" : "bg-gray-200")}>
                <div className={"w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform " + (formData.available ? "translate-x-4" : "translate-x-0.5")}></div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-5 cursor-pointer" onClick={() => setFormData({...formData, published: !formData.published})}>
              <div>
                <p className="text-[13px] font-medium text-[#1C1917]">Publish on menu</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Make this dish visible on the online menu after saving.</p>
              </div>
              <div className={"w-9 h-5 rounded-full relative transition-colors " + (formData.published ? "bg-[#F97316]" : "bg-gray-200")}>
                <div className={"w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform " + (formData.published ? "translate-x-4" : "translate-x-0.5")}></div>
              </div>
            </div>

            <div className="flex items-center justify-between cursor-pointer" onClick={() => setFormData({...formData, featured: !formData.featured})}>
              <div>
                <p className="text-[13px] font-medium text-[#1C1917]">Featured dish</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Highlight this item in the signature dishes section.</p>
              </div>
              <div className={"w-9 h-5 rounded-full relative transition-colors " + (formData.featured ? "bg-[#F97316]" : "bg-gray-200")}>
                <div className={"w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform " + (formData.featured ? "translate-x-4" : "translate-x-0.5")}></div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="col-span-1 md:col-span-3 flex justify-between items-center mt-4 pt-6 border-t border-gray-200">
          <p className="text-[12px] text-gray-400">* Required fields</p>
          <div className="flex gap-3">
            <Link to="/admin/menu" className="px-6 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1C1917] bg-white hover:bg-gray-50 transition flex items-center">Cancel</Link>
            <button type="submit" className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2 rounded-lg text-[13px] font-medium shadow-sm transition">
              {isEditMode ? "Update dish" : "Save dish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
