import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

export default function MyPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    navigate(
      user?.role === "mentor" ? "/dashboard/mentor" : "/dashboard/mentee",
      { replace: true }
    );
  }, [user, navigate]);

  return null;
}
