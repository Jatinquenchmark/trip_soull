import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, PackageSearch, PlusCircle, CalendarDays, 
  Users, Settings, Search, Bell, HelpCircle, UploadCloud, 
  Check, Plus, X, LogOut, Edit, Trash2, ChevronLeft, ChevronRight
} from 'lucide-react';
import { destinations } from '../data/trips';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('manage_packages');
  
  const initialFormState = {
    name: '',
    countryId: destinations[0].id,
    category: 'luxury',
    price: '0',
    discountedPrice: '0',
    days: '',
    nights: '',
    inclusions: {
      flights: true,
      hotels: true,
      breakfast: true,
      transfers: false,
    },
    exclusions: ['Visa Fees', 'Travel Insurance'],
    experiences: {
      solo: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
      adventure: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
      couple: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] }
    },
    itinerary: [{ day: 1, title: 'Arrival & Orientation', description: '' }],
    overview: '',
    groupCapacity: 'Customizable',
    pricingTiers: {
      essential: '',
      comfort: '',
      luxury: ''
    }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [newExclusion, setNewExclusion] = useState('');
  const [bannerFile, setBannerFile] = useState(null);
  const [existingBanner, setExistingBanner] = useState('');
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubTab, setFormSubTab] = useState('general');

  // CRUD & Pagination states
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPackageId, setEditingPackageId] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(searchTerm);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const resetForm = () => {
    setFormData(initialFormState);
    setBannerFile(null);
    setExistingBanner('');
    setGalleryFiles([]);
    setExistingGallery([]);
    setEditingPackageId(null);
    setFormSubTab('general');
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
    const bannerInput = document.getElementById('banner-upload');
    if (bannerInput) bannerInput.value = '';
  };

  const fetchPackages = async () => {
    setLoadingPackages(true);
    try {
      const response = await fetch('http://localhost:5000/api/packages');
      if (response.ok) {
        const data = await response.json();
        setPackages(data);
      } else {
        showToast('Failed to fetch packages', 'error');
      }
    } catch (err) {
      showToast('Network error while loading packages', 'error');
    } finally {
      setLoadingPackages(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'manage_packages') {
      fetchPackages();
    }
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleEdit = (pkg) => {
    setFormData({
      name: pkg.name || '',
      countryId: pkg.countryId || destinations[0].id,
      category: pkg.category || 'luxury',
      price: pkg.price || '0',
      discountedPrice: pkg.discountedPrice || '0',
      days: pkg.days || '',
      nights: pkg.nights || '',
      inclusions: pkg.inclusions || {
        flights: false,
        hotels: false,
        breakfast: false,
        transfers: false,
      },
      exclusions: pkg.exclusions || [],
      experiences: {
        solo: {
          active: typeof pkg.experiences?.solo === 'object' ? pkg.experiences.solo.active : (pkg.experiences?.solo ?? true),
          overview: typeof pkg.experiences?.solo === 'object' ? (pkg.experiences.solo.overview || '') : '',
          pricingTiers: typeof pkg.experiences?.solo === 'object' ? (pkg.experiences.solo.pricingTiers || { essential: '', comfort: '', luxury: '' }) : { essential: '', comfort: '', luxury: '' },
          itinerary: typeof pkg.experiences?.solo === 'object' ? (pkg.experiences.solo.itinerary || []) : []
        },
        adventure: {
          active: typeof pkg.experiences?.adventure === 'object' ? pkg.experiences.adventure.active : (pkg.experiences?.adventure ?? true),
          overview: typeof pkg.experiences?.adventure === 'object' ? (pkg.experiences.adventure.overview || '') : '',
          pricingTiers: typeof pkg.experiences?.adventure === 'object' ? (pkg.experiences.adventure.pricingTiers || { essential: '', comfort: '', luxury: '' }) : { essential: '', comfort: '', luxury: '' },
          itinerary: typeof pkg.experiences?.adventure === 'object' ? (pkg.experiences.adventure.itinerary || []) : []
        },
        couple: {
          active: typeof pkg.experiences?.couple === 'object' ? pkg.experiences.couple.active : (pkg.experiences?.couple ?? true),
          overview: typeof pkg.experiences?.couple === 'object' ? (pkg.experiences.couple.overview || '') : '',
          pricingTiers: typeof pkg.experiences?.couple === 'object' ? (pkg.experiences.couple.pricingTiers || { essential: '', comfort: '', luxury: '' }) : { essential: '', comfort: '', luxury: '' },
          itinerary: typeof pkg.experiences?.couple === 'object' ? (pkg.experiences.couple.itinerary || []) : []
        }
      },
      itinerary: pkg.itinerary && pkg.itinerary.length > 0 ? pkg.itinerary : [{ day: 1, title: 'Arrival & Orientation', description: '' }],
      overview: pkg.overview || '',
      groupCapacity: pkg.groupCapacity || 'Customizable',
      pricingTiers: pkg.pricingTiers || {
        essential: '',
        comfort: '',
        luxury: ''
      }
    });
    setExistingBanner(pkg.images?.[0] || '');
    setExistingGallery(pkg.images?.slice(1) || []);
    setBannerFile(null);
    setGalleryFiles([]);
    setEditingPackageId(pkg._id);
    setActiveTab('add_package');
  };

  const handleDelete = async (pkgId) => {
    if (!window.confirm('Bhai, are you sure you want to delete this package?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/packages/${pkgId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        showToast('Your session has expired. Redirecting to login...', 'error');
        setTimeout(() => {
          handleLogout();
        }, 1500);
        return;
      }

      if (response.ok) {
        showToast('Package deleted successfully!', 'success');
        fetchPackages();
      } else {
        const err = await response.json();
        showToast(err.message || 'Failed to delete package', 'error');
      }
    } catch (err) {
      showToast('Network error while deleting package', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePricingTierChange = (tier, value) => {
    setFormData(prev => ({
      ...prev,
      pricingTiers: { ...prev.pricingTiers, [tier]: value }
    }));
  };

  const toggleInclusion = (key) => {
    setFormData(prev => ({
      ...prev,
      inclusions: { ...prev.inclusions, [key]: !prev.inclusions[key] }
    }));
  };

  const toggleExperience = (styleKey) => {
    setFormData(prev => {
      const currentExps = prev.experiences || {
        solo: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        adventure: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        couple: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] }
      };
      const targetExp = currentExps[styleKey] || { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] };
      return {
        ...prev,
        experiences: {
          ...currentExps,
          [styleKey]: {
            ...targetExp,
            active: !targetExp.active
          }
        }
      };
    });
  };

  const handleExperienceChange = (styleKey, field, value) => {
    setFormData(prev => {
      const currentExps = prev.experiences || {
        solo: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        adventure: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        couple: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] }
      };
      const targetExp = currentExps[styleKey] || { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] };
      return {
        ...prev,
        experiences: {
          ...currentExps,
          [styleKey]: {
            ...targetExp,
            [field]: value
          }
        }
      };
    });
  };

  const handleExperiencePricingChange = (styleKey, tier, value) => {
    setFormData(prev => {
      const currentExps = prev.experiences || {
        solo: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        adventure: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        couple: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] }
      };
      const targetExp = currentExps[styleKey] || { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] };
      const currentPricing = targetExp.pricingTiers || { essential: '', comfort: '', luxury: '' };
      return {
        ...prev,
        experiences: {
          ...currentExps,
          [styleKey]: {
            ...targetExp,
            pricingTiers: {
              ...currentPricing,
              [tier]: value
            }
          }
        }
      };
    });
  };

  const handleExperienceItineraryChange = (styleKey, idx, field, value) => {
    setFormData(prev => {
      const currentExps = prev.experiences || {
        solo: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        adventure: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        couple: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] }
      };
      const targetExp = currentExps[styleKey] || { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] };
      const currentItin = [...(targetExp.itinerary || [])];
      
      if (currentItin[idx]) {
        currentItin[idx] = { ...currentItin[idx], [field]: value };
      }
      
      return {
        ...prev,
        experiences: {
          ...currentExps,
          [styleKey]: {
            ...targetExp,
            itinerary: currentItin
          }
        }
      };
    });
  };

  const addExperienceItineraryDay = (styleKey) => {
    setFormData(prev => {
      const currentExps = prev.experiences || {
        solo: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        adventure: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        couple: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] }
      };
      const targetExp = currentExps[styleKey] || { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] };
      const currentItin = [...(targetExp.itinerary || [])];
      const nextDay = currentItin.length + 1;
      currentItin.push({ day: nextDay, title: `Day ${nextDay} - Activity`, description: '' });
      return {
        ...prev,
        experiences: {
          ...currentExps,
          [styleKey]: {
            ...targetExp,
            itinerary: currentItin
          }
        }
      };
    });
  };

  const removeExperienceItineraryDay = (styleKey, idx) => {
    setFormData(prev => {
      const currentExps = prev.experiences || {
        solo: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        adventure: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        couple: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] }
      };
      const targetExp = currentExps[styleKey] || { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] };
      let currentItin = [...(targetExp.itinerary || [])];
      currentItin.splice(idx, 1);
      currentItin = currentItin.map((item, i) => ({ ...item, day: i + 1 }));
      return {
        ...prev,
        experiences: {
          ...currentExps,
          [styleKey]: {
            ...targetExp,
            itinerary: currentItin
          }
        }
      };
    });
  };

  const copyGlobalToExperience = (styleKey) => {
    setFormData(prev => {
      const currentExps = prev.experiences || {
        solo: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        adventure: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] },
        couple: { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] }
      };
      const targetExp = currentExps[styleKey] || { active: true, overview: '', pricingTiers: { essential: '', comfort: '', luxury: '' }, itinerary: [] };
      return {
        ...prev,
        experiences: {
          ...currentExps,
          [styleKey]: {
            ...targetExp,
            overview: prev.overview || '',
            pricingTiers: { ...prev.pricingTiers },
            itinerary: prev.itinerary.map(item => ({ ...item }))
          }
        }
      };
    });
  };

  const addExclusion = () => {
    if (newExclusion.trim() && !formData.exclusions.includes(newExclusion.trim())) {
      setFormData(prev => ({
        ...prev,
        exclusions: [...prev.exclusions, newExclusion.trim()]
      }));
      setNewExclusion('');
    }
  };

  const removeExclusion = (tag) => {
    setFormData(prev => ({
      ...prev,
      exclusions: prev.exclusions.filter(e => e !== tag)
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary, 
        { day: prev.itinerary.length + 1, title: `Day ${prev.itinerary.length + 1}`, description: '' }
      ]
    }));
  };

  const handleItineraryChange = (index, field, value) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[index][field] = value;
    setFormData(prev => ({ ...prev, itinerary: updatedItinerary }));
  };

  const handleFileChange = (e) => {
    setImageFiles(e.target.files);
  };

  const showToast = (message, type = 'error') => {
    toast.custom((t) => (
      <div className={`flex items-center gap-4 px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 ${
        type === 'error' 
          ? 'bg-red-50 border-red-200 text-red-950 shadow-red-100/50' 
          : 'bg-green-50 border-green-200 text-green-950 shadow-green-100/50'
      } max-w-md w-full`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
        }`}>
          {type === 'error' ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold tracking-tight">
            {type === 'error' ? 'Action Failed' : 'Success!'}
          </p>
          <p className="text-xs opacity-90 font-medium mt-0.5">{message}</p>
        </div>
        <button 
          onClick={() => toast.dismiss(t.id)} 
          className={`p-1.5 rounded-lg transition-colors ${
            type === 'error' ? 'hover:bg-red-100 text-red-400 hover:text-red-700' : 'hover:bg-green-100 text-green-400 hover:text-green-700'
          }`}
        >
          <X size={16} />
        </button>
      </div>
    ), { duration: 4000 });
  };

  const handleSubmit = async () => {
    const isEdit = !!editingPackageId;
    if (!formData.name.trim() || !formData.countryId || (!bannerFile && !existingBanner)) {
      showToast('Please fill all required details (Title and Banner Image) before saving!', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const data = new FormData();
      
      data.append('name', formData.name);
      data.append('countryId', formData.countryId);
      data.append('category', formData.category);
      data.append('price', formData.price);
      data.append('discountedPrice', formData.discountedPrice);
      data.append('days', formData.days);
      data.append('nights', formData.nights);
      data.append('overview', formData.overview);
      data.append('groupCapacity', formData.groupCapacity);
      data.append('pricingTiers', JSON.stringify(formData.pricingTiers));
      data.append('inclusions', JSON.stringify(formData.inclusions));
      data.append('exclusions', JSON.stringify(formData.exclusions));
      data.append('experiences', JSON.stringify(formData.experiences || { solo: true, adventure: true, couple: true }));
      data.append('itinerary', JSON.stringify(formData.itinerary));
      
      if (bannerFile) {
        data.append('bannerImage', bannerFile);
      }
      if (existingBanner) {
        data.append('existingBanner', existingBanner);
      }
      
      for (let i = 0; i < galleryFiles.length; i++) {
        data.append('galleryImages', galleryFiles[i]);
      }
      data.append('existingGallery', JSON.stringify(existingGallery));

      const url = isEdit 
        ? `http://localhost:5000/api/packages/${editingPackageId}`
        : 'http://localhost:5000/api/packages';
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      if (response.status === 401) {
        showToast('Your session has expired. Redirecting to login...', 'error');
        setTimeout(() => {
          handleLogout();
        }, 1500);
        return;
      }

      if (response.ok) {
        showToast(isEdit ? 'Package updated successfully!' : 'Package published successfully!', 'success');
        resetForm();
        setActiveTab('manage_packages');
      } else {
        const err = await response.json();
        showToast(err.message || 'Error saving package', 'error');
      }
    } catch (err) {
      showToast('Network error. Please ensure backend is running.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-poppins">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-black">
              T
            </div>
            <div>
              <h1 className="text-white font-bold leading-tight">TravelAdmin</h1>
              <p className="text-[10px] text-slate-500">Tour Operations</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<PackageSearch size={18} />} label="Manage Packages" active={activeTab === 'manage_packages'} onClick={() => setActiveTab('manage_packages')} />
          <NavItem icon={<PlusCircle size={18} />} label="Add New Package" active={activeTab === 'add_package'} onClick={() => { resetForm(); setActiveTab('add_package'); }} />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg w-full transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Dashboard</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">
              {activeTab === 'dashboard' && 'Overview'}
              {activeTab === 'manage_packages' && 'Manage Packages'}
              {activeTab === 'add_package' && (editingPackageId ? 'Edit Package' : 'Add New Package')}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <button className="hover:text-slate-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="hover:text-slate-600"><HelpCircle className="w-5 h-5" /></button>
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden ml-2">
                <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {/* Dashboard Page Header */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
                  <p className="text-slate-500 text-sm mt-1">Quick summary of tour operations and assets.</p>
                </div>

                {/* Dashboard Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <PackageSearch size={24} />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Packages</span>
                      <span className="text-2xl font-bold text-slate-800">{packages.length}</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                      <Users size={24} />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Destinations</span>
                      <span className="text-2xl font-bold text-slate-800">
                        {new Set(packages.map(p => p.countryId)).size}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                      <PlusCircle size={24} />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Categories</span>
                      <span className="text-2xl font-bold text-slate-800">
                        {new Set(packages.map(p => p.category).filter(Boolean)).size || 4}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick actions & welcome */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-slate-200/80">
                  <div className="relative z-10 max-w-xl">
                    <h3 className="text-2xl font-bold mb-2">Welcome to Tour Operations</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Manage your customized tour itineraries, set luxury tier pricings, and publish travel blueprints instantly.
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => { resetForm(); setActiveTab('add_package'); }}
                        className="px-5 py-2.5 bg-white text-slate-900 font-semibold rounded-xl text-sm hover:bg-slate-50 transition-colors"
                      >
                        Create Package
                      </button>
                      <button 
                        onClick={() => setActiveTab('manage_packages')}
                        className="px-5 py-2.5 bg-white/10 text-white font-semibold rounded-xl text-sm hover:bg-white/20 transition-colors border border-white/10"
                      >
                        Manage Active List
                      </button>
                    </div>
                  </div>
                  <div className="absolute right-[-10%] bottom-[-20%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                </div>
              </div>
            )}

            {activeTab === 'manage_packages' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Manage Packages</h2>
                    <p className="text-slate-500 text-sm mt-1">View, edit, and delete travel itineraries stored in MongoDB.</p>
                  </div>
                  <button 
                    onClick={() => { resetForm(); setActiveTab('add_package'); }} 
                    className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-xl text-sm hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-lg shadow-slate-200"
                  >
                    <Plus size={16} /> Add New Package
                  </button>
                </div>

                {loadingPackages ? (
                  <div className="bg-white border border-slate-200 rounded-2xl py-20 flex flex-col items-center justify-center shadow-sm">
                    <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 text-sm font-semibold">Loading active packages...</p>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    {/* Packages Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-xs font-black uppercase text-slate-400 tracking-wider">
                            <th className="px-6 py-4">Package Details</th>
                            <th className="px-6 py-4">Destination</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-600 font-medium">
                          {(() => {
                            const filtered = packages.filter(p => 
                              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (p.countryId || '').toLowerCase().includes(searchQuery.toLowerCase())
                            );

                            const totalPages = Math.ceil(filtered.length / itemsPerPage);
                            const validCurrentPage = Math.min(currentPage, totalPages || 1);
                            const indexOfLastItem = validCurrentPage * itemsPerPage;
                            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                            const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

                            if (filtered.length === 0) {
                              return (
                                <tr>
                                  <td colSpan="4" className="text-center py-12 text-slate-400">
                                    No packages found matching your criteria.
                                  </td>
                                </tr>
                              );
                            }

                            return currentItems.map((pkg) => (
                              <tr key={pkg._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                  <div className="w-14 h-10 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                    <img 
                                      src={pkg.images && pkg.images.length > 0 ? pkg.images[0] : 'https://placehold.co/100x70/png'} 
                                      alt="" 
                                      className="w-full h-full object-cover" 
                                    />
                                  </div>
                                  <div>
                                    <span className="font-bold text-slate-800 block line-clamp-1">{pkg.name}</span>
                                    <span className="text-[10px] text-slate-400 capitalize">{pkg.groupCapacity || 'Customizable'}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 capitalize">{pkg.countryId}</td>
                                <td className="px-6 py-4">
                                  {pkg.days ? `${pkg.nights}N / ${pkg.days}D` : pkg.duration || 'Flexible'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button 
                                      onClick={() => handleEdit(pkg)}
                                      className="p-2 border border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200 rounded-lg transition-all"
                                      title="Edit Package"
                                    >
                                      <Edit size={14} />
                                    </button>
                                    <button 
                                      onClick={() => handleDelete(pkg._id)}
                                      className="p-2 border border-slate-200 text-red-600 hover:bg-red-50 hover:border-red-200 rounded-lg transition-all"
                                      title="Delete Package"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    {(() => {
                      const filtered = packages.filter(p => 
                        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (p.countryId || '').toLowerCase().includes(searchQuery.toLowerCase())
                      );
                      const totalPages = Math.ceil(filtered.length / itemsPerPage);
                      const validCurrentPage = Math.min(currentPage, totalPages || 1);
                      const indexOfLastItem = validCurrentPage * itemsPerPage;
                      const indexOfFirstItem = indexOfLastItem - itemsPerPage;

                      if (filtered.length === 0) return null;

                      return (
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold bg-slate-50/50">
                          <span>
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filtered.length)} of {filtered.length} packages
                          </span>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                              disabled={validCurrentPage === 1}
                              className="p-2 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                              <ChevronLeft size={14} />
                            </button>
                            <span className="px-2">Page {validCurrentPage} of {totalPages || 1}</span>
                            <button 
                              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                              disabled={validCurrentPage === totalPages || totalPages === 0}
                              className="p-2 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'add_package' && (
              <div className="animate-in fade-in duration-500">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {editingPackageId ? 'Edit Package' : 'Publish Package'}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      {editingPackageId ? 'Modify active travel itinerary and tiers details.' : 'Create a new travel itinerary and set pricing details.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => { resetForm(); setActiveTab('manage_packages'); }}
                      className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg text-sm hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting} 
                      className="px-6 py-2 bg-slate-900 text-white font-semibold rounded-lg text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Saving...' : (editingPackageId ? 'Update Package' : 'Publish Package')}
                    </button>
                  </div>
                </div>

                {/* Form Tabs */}
                <div className="flex border-b border-slate-200 mb-6 overflow-x-auto">
                  {[
                    { id: 'general', label: 'General Info' },
                    { id: 'solo', label: 'Solo Traveler Style' },
                    { id: 'adventure', label: 'Adventure Seeker Style' },
                    { id: 'couple', label: 'Romantic Couple Style' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setFormSubTab(tab.id)}
                      className={`px-5 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                        formSubTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {tab.label}
                      {tab.id !== 'general' && (
                        <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${
                          formData.experiences?.[tab.id]?.active 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          {formData.experiences?.[tab.id]?.active ? 'Active' : 'Disabled'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column (Wider) */}
                  <div className="lg:col-span-2 space-y-6">
                    {formSubTab === 'general' ? (
                      <>
                        {/* Basic Information Card */}
                        <Card title="Basic Information">
                          <div className="space-y-5">
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Package Title</label>
                              <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="e.g. 7-Day Alpine Adventure"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Destination</label>
                              <select 
                                name="countryId"
                                value={formData.countryId}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                              >
                                <option value="" disabled>Select destination</option>
                                {destinations.map(d => (
                                  <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </Card>

                        {/* Overview & Capacity */}
                        <Card title="Overview & Details">
                          <div className="space-y-5">
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Overview Description</label>
                              <textarea 
                                name="overview"
                                rows="4"
                                value={formData.overview}
                                onChange={handleInputChange}
                                placeholder="Experience the pinnacle of modern luxury..."
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                              ></textarea>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Group Capacity</label>
                              <input 
                                type="text"
                                name="groupCapacity"
                                value={formData.groupCapacity}
                                onChange={handleInputChange}
                                placeholder="e.g. Customizable or 2-10 People"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </Card>



                        {/* Itinerary Card */}
                        <Card title="Itinerary" action={<button type="button" onClick={addItineraryDay} className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"><Plus size={16}/> Add Day</button>}>
                          <div className="space-y-4">
                            {formData.itinerary.map((item, idx) => (
                              <div key={idx} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                                    D{item.day}
                                  </div>
                                  <input 
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => handleItineraryChange(idx, 'title', e.target.value)}
                                    placeholder="Day title..."
                                    className="flex-1 bg-transparent border-none font-semibold text-slate-800 focus:outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Description</label>
                                  <textarea 
                                    rows="3"
                                    value={item.description}
                                    onChange={(e) => handleItineraryChange(idx, 'description', e.target.value)}
                                    placeholder={`Describe the activities for Day ${item.day}...`}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                  ></textarea>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </>
                    ) : (
                      <>
                        {/* Experience Status Card */}
                        <Card title={`${formSubTab === 'solo' ? 'Solo Traveler' : formSubTab === 'adventure' ? 'Adventure Seeker' : 'Romantic Couple'} Style Configuration`}>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                              <div>
                                <h4 className="font-bold text-slate-800 text-sm">Enable this Style</h4>
                                <p className="text-xs text-slate-500 mt-0.5">Allow users to select this travel style version.</p>
                              </div>
                              <button 
                                type="button"
                                onClick={() => toggleExperience(formSubTab)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                                  formData.experiences?.[formSubTab]?.active ? 'bg-blue-500' : 'bg-slate-300'
                                }`}
                              >
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                                  formData.experiences?.[formSubTab]?.active ? 'translate-x-6' : 'translate-x-0'
                                }`} />
                              </button>
                            </div>

                            {formData.experiences?.[formSubTab]?.active && (
                              <div className="flex justify-end">
                                <button 
                                  type="button"
                                  onClick={() => copyGlobalToExperience(formSubTab)}
                                  className="px-4 py-2 border border-blue-200 text-blue-600 bg-blue-50/50 font-bold rounded-lg text-xs hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                                >
                                  Copy from General Info
                                </button>
                              </div>
                            )}
                          </div>
                        </Card>

                        {formData.experiences?.[formSubTab]?.active && (
                          <>
                            {/* Custom Overview override */}
                            <Card title="Custom Style Overview Override">
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Overview Description (Optional)</label>
                                <textarea 
                                  rows="4"
                                  value={formData.experiences?.[formSubTab]?.overview || ''}
                                  onChange={(e) => handleExperienceChange(formSubTab, 'overview', e.target.value)}
                                  placeholder="Enter style-specific overview description. If empty, general package overview will be used."
                                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                ></textarea>
                              </div>
                            </Card>

                            {/* Custom Itinerary Day by Day */}
                            <Card 
                              title="Custom Itinerary for this Style" 
                              action={
                                <button 
                                  type="button" 
                                  onClick={() => addExperienceItineraryDay(formSubTab)} 
                                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
                                >
                                  <Plus size={16}/> Add Day
                                </button>
                              }
                            >
                              <div className="space-y-4">
                                {(!formData.experiences?.[formSubTab]?.itinerary || formData.experiences[formSubTab].itinerary.length === 0) ? (
                                  <div className="text-center py-6 text-slate-400 text-xs">
                                    No custom itinerary days defined. Falling back to the General package itinerary.
                                  </div>
                                ) : (
                                  formData.experiences[formSubTab].itinerary.map((item, idx) => (
                                    <div key={idx} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 relative group">
                                      <button
                                        type="button"
                                        onClick={() => removeExperienceItineraryDay(formSubTab, idx)}
                                        className="absolute top-3 right-3 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <X size={16} />
                                      </button>
                                      <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                                          D{item.day}
                                        </div>
                                        <input 
                                          type="text"
                                          value={item.title}
                                          onChange={(e) => handleExperienceItineraryChange(formSubTab, idx, 'title', e.target.value)}
                                          placeholder="Day title..."
                                          className="flex-1 bg-transparent border-none font-semibold text-slate-800 focus:outline-none"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Description</label>
                                        <textarea 
                                          rows="3"
                                          value={item.description}
                                          onChange={(e) => handleExperienceItineraryChange(formSubTab, idx, 'description', e.target.value)}
                                          placeholder={`Describe the activities for Day ${item.day}...`}
                                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        ></textarea>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </Card>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {/* Right Column (Narrower) */}
                  <div className="space-y-6">
                    {formSubTab === 'general' ? (
                      <>
                        {/* Media & Gallery Card */}
                        <Card title="Media & Gallery">
                          <div className="space-y-6">
                            
                            {/* Section 1: Package Cover / Banner Image */}
                            <div className="border-b border-slate-100 pb-6">
                              <label className="block text-xs font-bold text-slate-700 mb-2.5">
                                Cover / Banner Image <span className="text-red-500">*</span>
                              </label>
                              
                              {(existingBanner || bannerFile) ? (
                                <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden border border-slate-200 group">
                                  <img 
                                    src={bannerFile ? URL.createObjectURL(bannerFile) : existingBanner} 
                                    alt="Package Banner" 
                                    className="w-full h-full object-cover" 
                                  />
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setExistingBanner('');
                                      setBannerFile(null);
                                    }}
                                    className="absolute top-3 right-3 bg-black/60 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ) : (
                                <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer relative overflow-hidden block">
                                  <input 
                                    type="file" 
                                    id="banner-upload"
                                    accept="image/*" 
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        setBannerFile(e.target.files[0]);
                                      }
                                    }} 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                    <UploadCloud className="text-slate-500 w-5 h-5" />
                                  </div>
                                  <p className="text-xs font-semibold text-slate-700 mb-0.5">Upload Cover Image</p>
                                  <p className="text-[10px] text-slate-400">Single image for package listing & background</p>
                                </label>
                              )}
                            </div>

                            {/* Section 2: Visual Journey Gallery */}
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-2.5">
                                Visual Journey Gallery Images (Optional)
                              </label>

                              {/* Listing Existing Gallery & New Selected Files */}
                              {((existingGallery && existingGallery.length > 0) || (galleryFiles && galleryFiles.length > 0)) && (
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                  {existingGallery.map((img, idx) => (
                                    <div key={`exist-${idx}`} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group">
                                      <img src={img} alt="" className="w-full h-full object-cover" />
                                      <button 
                                        type="button"
                                        onClick={() => setExistingGallery(prev => prev.filter((_, i) => i !== idx))}
                                        className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  ))}
                                  {galleryFiles.map((file, idx) => (
                                    <div key={`new-${idx}`} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group">
                                      <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                                      <button 
                                        type="button"
                                        onClick={() => setGalleryFiles(prev => prev.filter((_, i) => i !== idx))}
                                        className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <label className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer relative overflow-hidden block">
                                <input 
                                  type="file" 
                                  id="image-upload"
                                  multiple 
                                  accept="image/*" 
                                  onChange={(e) => {
                                    if (e.target.files) {
                                      setGalleryFiles(prev => [...prev, ...Array.from(e.target.files)]);
                                    }
                                  }} 
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                  <UploadCloud className="text-slate-500 w-6 h-6" />
                                </div>
                                <p className="text-sm font-semibold text-slate-700 mb-1">
                                  {galleryFiles.length > 0 ? `${galleryFiles.length} new gallery` : 'Upload Gallery Images'}
                                </p>
                                <p className="text-xs text-slate-500 mb-4">or click to browse</p>
                                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Supports JPG, PNG, WEBP (Max 5MB each)</p>
                              </label>
                            </div>

                          </div>
                        </Card>

                        {/* Pricing & Duration */}
                        <Card title="Pricing & Duration">
                          <div className="space-y-5">
                            <div className="space-y-4">
                              <h4 className="text-sm font-bold text-slate-800">Travel Tiers Pricing</h4>
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Essential Soul</label>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
                                  <input type="text" value={formData.pricingTiers.essential} onChange={(e) => handlePricingTierChange('essential', e.target.value)} placeholder="20,000"
                                    className="w-full pl-7 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Comfort Soul</label>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
                                  <input type="text" value={formData.pricingTiers.comfort} onChange={(e) => handlePricingTierChange('comfort', e.target.value)} placeholder="45,000"
                                    className="w-full pl-7 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Luxury Soul</label>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
                                  <input type="text" value={formData.pricingTiers.luxury} onChange={(e) => handlePricingTierChange('luxury', e.target.value)} placeholder="85,000"
                                    className="w-full pl-7 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Days</label>
                                <input 
                                  type="number"
                                  name="days"
                                  value={formData.days}
                                  onChange={handleInputChange}
                                  placeholder="7"
                                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nights</label>
                                <input 
                                  type="number"
                                  name="nights"
                                  value={formData.nights}
                                  onChange={handleInputChange}
                                  placeholder="6"
                                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        </Card>


                      </>
                    ) : (
                      <>
                        {formData.experiences?.[formSubTab]?.active && (
                          <Card title="Pricing Tiers Override">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Essential Soul Price Override</label>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
                                  <input 
                                    type="text" 
                                    value={formData.experiences?.[formSubTab]?.pricingTiers?.essential || ''} 
                                    onChange={(e) => handleExperiencePricingChange(formSubTab, 'essential', e.target.value)} 
                                    placeholder="Leave blank to use default price"
                                    className="w-full pl-7 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Comfort Soul Price Override</label>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
                                  <input 
                                    type="text" 
                                    value={formData.experiences?.[formSubTab]?.pricingTiers?.comfort || ''} 
                                    onChange={(e) => handleExperiencePricingChange(formSubTab, 'comfort', e.target.value)} 
                                    placeholder="Leave blank to use default price"
                                    className="w-full pl-7 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Luxury Soul Price Override</label>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
                                  <input 
                                    type="text" 
                                    value={formData.experiences?.[formSubTab]?.pricingTiers?.luxury || ''} 
                                    onChange={(e) => handleExperiencePricingChange(formSubTab, 'luxury', e.target.value)} 
                                    placeholder="Leave blank to use default price"
                                    className="w-full pl-7 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </Card>
                        )}
                      </>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Components for Admin Panel
const NavItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-6 py-3 border-l-2 transition-colors ${
    active 
      ? 'border-blue-500 bg-slate-800/50 text-white' 
      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
  }`}>
    <div className={`${active ? 'text-blue-500' : ''}`}>{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const Card = ({ title, action, children }) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
      {action}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
      checked ? 'bg-blue-500 border-blue-500' : 'border-slate-300 bg-white group-hover:border-blue-400'
    }`}>
      {checked && <Check size={14} className="text-white" />}
    </div>
    <span className="text-sm text-slate-600 font-medium select-none">{label}</span>
  </label>
);

export default AdminDashboard;
