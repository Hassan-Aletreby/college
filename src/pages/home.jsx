import React from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "../style/main.css";
import axiosInstance from "../api/axiosInstance";

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/v1/logout");
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="home_content">
        <h1 className="main_head">
          كلية الدراسات الإسلامية والعربية
          <br />
          بنين بدمياط الجديدة
        </h1>
        <p className="main_text">
          من هنا يمكنك إدارة بيانات الطلاب ومتابعة سجلاتهم
        </p>
        <div className="buttons">
          <div className="main_button">
            <Link to="/students/addstudent">
              <button>إضافة طالب جديد</button>
            </Link>
          </div>
          <div className="main_button">
            <Link to="/students">
              <button>عرض قائمة الطلاب</button>
            </Link>
          </div>
          <div className="main_button">
            <button className="logout-button" onClick={handleLogout}>
              تسجيل خروج
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
