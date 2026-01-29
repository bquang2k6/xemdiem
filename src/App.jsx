import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // thêm router
import Login from "./UI/Login";
import Home from "./UI/Home";
import "./App.css";
import { verifyToken } from "./api/auth";
import LoadingPage from "./UI/pages/LoadingPage";

function App() {
  const [studentId, setStudentId] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mssv");
    localStorage.removeItem("studentData");
    setStudentId(null);
    setStudentData(null);
  };

  // Khi app load → check token với server
  useEffect(() => {
    const mssv = localStorage.getItem("mssv");
    const storedData = localStorage.getItem("studentData");

    if (mssv) {
      // Vì hiện tại server login trả về full data thay vì chỉ token, 
      // ta tạm thời dùng studentData từ localStorage nếu có.
      if (storedData) {
        setStudentData(JSON.parse(storedData));
        setStudentId(mssv);
        setLoading(false);
      } else {
        // Fallback or verify if token exists
        verifyToken().then((isValid) => {
          if (isValid) {
            setStudentId(mssv);
          } else {
            handleLogout();
          }
          setLoading(false);
        });
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Hàm login
  const handleLogin = (data) => {
    setStudentId(data.studentInfo.mssv);
    setStudentData(data);
  };

  // Loading
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chính */}
        <Route
          path="/"
          element={
            !studentId ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Home studentId={studentId} studentData={studentData} onLogout={handleLogout} />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
