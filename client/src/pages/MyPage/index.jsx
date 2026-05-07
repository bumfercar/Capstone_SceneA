import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

export default function MyPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    navigate(
      user?.role === "mentor" ? "/mentor/mypage" : "/mentee/mypage",
      { replace: true }
    );
  }, [user, navigate]);

  return null;
}
