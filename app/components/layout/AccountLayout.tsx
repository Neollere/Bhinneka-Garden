import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useAuth } from "../../lib/AuthContext";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { ADMIN_EMAILS } from '~/lib/admins';

type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
  provider: string | null;
};

const AccountLayout: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      navigate('/auth');
    }
  }, [user]);

  async function fetchProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex justify-center items-start min-h-[100vh] bg-gradient-to-br from-gray-50 to-gray-200"
    >
      <div
        ref={cardRef}
        className="bg-white rounded-t-3xl shadow-xl w-full max-w-md mx-auto pb-8 pt-6 px-0"
        style={{ minHeight: "100vh" }}
      >
        {/* Header */}
        <div className="px-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Account</h1>
          <div className="flex items-center gap-3 mb-4">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name || 'Profile'}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-lg text-gray-600">
                  {(profile?.full_name?.[0] || user?.email?.[0] || '?').toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <div className="font-semibold text-gray-800">
                {profile?.full_name || user?.email?.split('@')[0] || 'User'}
              </div>
              <div className="text-xs text-gray-500">
                {profile?.provider ? `Signed in with ${profile.provider}` : 'Email user'}
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/profile')}
            className="w-full bg-black text-white rounded-full py-3 font-semibold text-base mb-4 hover:bg-gray-900 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Admin Menu */}
        {user && ADMIN_EMAILS.includes(user.email ?? '') && (
          <div className="bg-yellow-50 py-2 px-6 text-xs font-semibold tracking-wide mb-2 rounded">
            <div className="text-yellow-700 mb-2">Admin Menu</div>
            <MenuItem label="Admin: News Management" onClick={() => navigate('/admin/news')} className="text-yellow-800 hover:text-yellow-900" />
          </div>
        )}

        {/* Menu */}
        <div className="divide-y divide-gray-200 mt-2 bg-white">
          <div>
            <MenuItem label="My bookings" onClick={() => navigate('/bookings')} />
            <MenuItem label="My messages" onClick={() => navigate('/messages')} />
          </div>
          <div className="bg-gray-50 py-2 px-6 text-xs text-gray-500 font-semibold tracking-wide">
            Support
          </div>
          <div>
            <MenuItem label="App feedback" onClick={() => navigate('/feedback')} />
            <MenuItem label="Help centre" onClick={() => navigate('/help')} />
            <MenuItem 
              label="Sign Out" 
              onClick={handleSignOut}
              className="text-red-500 hover:text-red-600"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MenuItem: React.FC<{ 
  label: string; 
  onClick?: () => void;
  className?: string;
}> = ({ label, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition text-left ${className}`}
    style={{ fontSize: "1rem" }}
  >
    <span className="text-gray-800">{label}</span>
    <span className="text-gray-400">
      <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  </button>
);

export default AccountLayout;