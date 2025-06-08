import React, { useEffect, useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { supabase } from "../../lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
};

export default function MainHeader() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
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
    }
  }

  return (
    <div className="flex items-center justify-between py-2 p-2">
      <div>
        <h2 className="text-lg font-semibold">
          Hello, {profile?.full_name || user?.email?.split('@')[0] || 'User'}
        </h2>
        <p className="text-sm text-gray-500">Selamat datang di Bhinneka-1o</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.full_name || 'Profile'}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg text-gray-600">
            {(profile?.full_name?.[0] || user?.email?.[0] || '?').toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}