import React, { useEffect } from "react";

function Home({ studentId, studentData, onLogout }) {
  const { studentInfo, grades, currentSemester } = studentData || {};

  function usePageMeta(title, description) {
    useEffect(() => {
      if (title) document.title = title;
      if (description) {
        let el = document.querySelector('meta[name="description"]');
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute("name", "description");
          document.head.appendChild(el);
        }
        el.setAttribute("content", description);
      }
    }, [title, description]);
  }

  return (
    <div className="">
      {usePageMeta(
        "Xem Điểm TDTU",
        "Xem kết quả học tập sinh viên TDTU một cách nhanh chóng và chính xác."
      )}

      {/* Background động */}
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

      <div className="relative z-10 p-4">
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg absolute top-4 right-4 z-20 shadow-lg transition-all"
        >
          Đăng xuất
        </button>
        <div className="container mx-auto px-4 py-8">
          {/* Thông tin sinh viên */}
          {studentInfo && (
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 mb-8 border border-white/20 transform transition-all hover:scale-[1.01]">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {studentInfo.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-gray-800">{studentInfo.fullName}</h2>
                    <p className="text-gray-500">MSSV: {studentInfo.mssv} | Lớp: {studentInfo.lop}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {currentSemester}
                  </span>
                  <p className="text-xs text-gray-400 mt-2">Hệ đào tạo: {studentInfo.hedaotao}</p>
                </div>
              </div>
            </div>
          )}

          {/* Bảng điểm */}
          {grades && grades.length > 0 ? (
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Kết quả học tập</h3>
                <div className="flex gap-2">
                  <span className="text-sm text-gray-500">Tổng số môn: {grades.length}</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Mã môn</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tên môn học</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">TC</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Điểm 1</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Điểm 2</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Thi 1</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Thi 2</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center font-bold text-purple-600">ĐTB</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {grades.map((grade, idx) => (
                      <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                        <td className="p-4 text-sm font-medium text-gray-600">{grade.MonHocID}</td>
                        <td className="p-4">
                          <div className="text-sm font-bold text-gray-800">{grade.TenMH}</div>
                          {grade.TenMH_TA && <div className="text-xs text-gray-400 italic">{grade.TenMH_TA}</div>}
                        </td>
                        <td className="p-4 text-sm text-center font-semibold text-gray-700">{grade.SoTC || "-"}</td>
                        <td className="p-4 text-sm text-center">{grade.Diem1 || "-"}</td>
                        <td className="p-4 text-sm text-center">{grade.Diem2 || "-"}</td>
                        <td className="p-4 text-sm text-center text-blue-600 font-semibold">{grade.DiemThi1 || "-"}</td>
                        <td className="p-4 text-sm text-center">{grade.DiemThi2 || "-"}</td>
                        <td className="p-4 text-sm text-center font-bold text-purple-600">{grade.DTB || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-20 text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-800">Không có dữ liệu điểm</h3>
              <p className="text-gray-500">Vui lòng kiểm tra lại tài khoản hoặc học kỳ.</p>
            </div>
          )}

          <div className="h-20"></div>
        </div>
      </div>

      <style>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

export default Home;
