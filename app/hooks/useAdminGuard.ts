import { useAuth } from "~/lib/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_EMAILS } from "~/lib/admins";

export function useAdminGuard() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user || !ADMIN_EMAILS.includes(user.email)) {
        navigate("/not-authorized", { replace: true });
      } else {
        setIsAdmin(true);
      }
    }
  }, [user, loading, navigate]);

  return isAdmin;
} 