import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LocketLoginPopup = ({ onClose, onLoginSuccess, disableNavigate = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 🧩 Hàm kiểm tra có phải link hay không
  const isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  // 🧩 Xử lý khi người dùng nhập vào ô username
  const handleUsernameChange = async (e) => {
    const value = e.target.value;
    setUsername(value);

    // Nếu là link → gọi API để lấy inviteToken & username
    if (isValidURL(value)) {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch("http://localhost:3000/api/getlink", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ link: value }),
        });

        if (!res.ok) throw new Error("Không thể lấy dữ liệu từ link");

        const data = await res.json();
        if (data.success && data.result?.uid) {
          // ✅ Điền username tạm là UID hoặc first_name
          const name =
            data.result.username ||
            data.result.uid ||
            "";
          setUsername(name);
        } else {
          throw new Error("Link không hợp lệ hoặc không tìm thấy người dùng");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 🧩 Hàm submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!username.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ username và mật khẩu");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/locket/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      if (!res.ok) throw new Error("Đăng nhập thất bại");

      const data = await res.json();
      const token = data.token || data?.data?.token;
      if (!token) throw new Error("Không nhận được token từ server");

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      if (onLoginSuccess) onLoginSuccess(username, token);
      if (!disableNavigate) {
        const redirectTo = location.state?.from || "/locket";
        navigate(redirectTo, { replace: true });
      }

      if (onClose) onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 🧩 UI
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="relative z-10 bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm text-center animate-fadeIn">
        <button
          onClick={() => {
            if (onClose) onClose();
            navigate("/home"); // 👈 Điều hướng sang trang home
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
          🎓 Xem điểm TDTU
        </h2>
        <p className="text-gray-600 mb-5 text-sm">Đăng nhập để tiếp tục xem bài viết</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username hoặc link mời"
            value={username}
            onChange={handleUsernameChange}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-white/70 text-gray-800 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:outline-none text-sm disabled:opacity-50"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-white/70 text-gray-800 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-400 focus:outline-none text-sm disabled:opacity-50"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:opacity-90 transition text-sm disabled:opacity-50"
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </button>


        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LocketLoginPopup;
