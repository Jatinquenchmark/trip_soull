import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Camera, Save, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config';
import DashboardLayout from '../components/DashboardLayout';

const UserProfile = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', profilePicture: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        profilePicture: user.profilePicture || ''
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      if (response.ok) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        login(); // Refresh user context
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <DashboardLayout title="Account Settings">
      <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
        
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden mb-8">
          {/* Header Profile Section */}
          <div className="h-32 bg-gradient-to-r from-slate-900 to-slate-800 relative">
            <div className="absolute inset-0 bg-white/5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
          
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-12 mb-8">
              <div className="flex items-end gap-6 relative z-10">
                <div className="relative group">
                  {formData.profilePicture ? (
                    <img src={formData.profilePicture} alt="Profile" className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-xl bg-white" />
                  ) : (
                    <div className="w-28 h-28 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center border-4 border-white shadow-xl">
                      <Camera size={32} />
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 border-4 border-white rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm">
                      <Camera className="text-white w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="pb-2">
                  <h2 className="text-2xl font-black text-slate-800">{user.name}</h2>
                  <p className="text-slate-500 font-medium">{user.email}</p>
                </div>
              </div>
              
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all shadow-sm shrink-0"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information Group */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">Personal Information</h3>
                  
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium text-sm"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 focus:outline-none transition-colors opacity-70 cursor-not-allowed font-medium text-sm"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">Email address cannot be changed.</p>
                  </div>
                </div>

                {/* Contact & Display Group */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">Contact & Display</h3>
                  
                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        disabled={!isEditing}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="Add your phone number"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium text-sm"
                      />
                    </div>
                  </div>

                  {/* Avatar URL Input */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Profile Image URL</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Camera className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="url"
                        disabled={!isEditing}
                        value={formData.profilePicture}
                        onChange={(e) => setFormData({...formData, profilePicture: e.target.value})}
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-end gap-4">
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user.name, phone: user.phone || '', profilePicture: user.profilePicture || '' });
                    }}
                    className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="px-8 py-3 bg-soul-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all disabled:opacity-70 flex items-center gap-2 text-sm"
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
