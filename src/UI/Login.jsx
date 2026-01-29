import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user.trim() || !pass.trim()) {
      setError("Vui lòng nhập đầy đủ User và Password");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      if (!data.success) {
        throw new Error(data.message || "Đăng nhập không thành công");
      }

      // Lưu trữ thông tin cần thiết
      localStorage.setItem("mssv", data.studentInfo.mssv);
      localStorage.setItem("studentData", JSON.stringify(data));

      // Pass data to parent
      onLogin(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="">
      {/* Hiệu ứng nền */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gray-50">
        <div className="absolute -top-10 -right-10 w-72 sm:w-96 h-72 sm:h-96 
        bg-gradient-to-br from-purple-300 to-pink-300 rounded-full 
        mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>

        <div className="absolute -bottom-16 -left-8 w-72 sm:w-96 h-72 sm:h-96 
        bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full 
        mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-emerald-300 to-teal-300 
        rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Card Login */}
      <div className="relative z-10 bg-white/80 backdrop-blur-lg border border-white/20 
      rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md text-center 
      transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2 gradient-text">
          🎓 Xem điểm TDTU
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base mt-3">
          Nhập MSSV để tiếp tục
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="mssv"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-4 py-3 bg-white/70 text-gray-800 placeholder-gray-400 
            rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 
            focus:outline-none text-sm sm:text-base"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full px-4 py-3 bg-white/70 text-gray-800 placeholder-gray-400 
              rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 
              focus:outline-none text-sm sm:text-base pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 
            text-white font-semibold shadow-md hover:opacity-90 transition text-sm sm:text-base gradient-bg"
          >
            Đăng nhập
          </button>

        </form>
      </div>
    </div>
  );

}

export default Login;
