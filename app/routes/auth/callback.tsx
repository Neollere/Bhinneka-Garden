import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
          // Check if this is a password reset
          const params = new URLSearchParams(window.location.hash.substring(1));
          const type = params.get('type');
          
          if (type === 'recovery') {
            navigate('/auth/reset-password');
          } else {
            navigate('/account');
          }
        } else {
          navigate('/auth');
        }
      } catch (err: any) {
        setError(err.message || 'Authentication failed');
        setTimeout(() => navigate('/auth'), 3000);
      }
    };
    
    checkSession();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
        <p className="mt-4 text-gray-600">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-gray-600">Completing authentication...</p>
    </div>
  );
} 