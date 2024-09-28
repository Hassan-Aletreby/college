import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import "../style/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/auth/v1/token?grant_type=password",
        {
          email,
          password,
        }
      );

      if (response.data) {
        const user = response.data;
        localStorage.setItem("authToken", JSON.stringify(user.access_token));
        toast.success("تم تسجيل الدخول بنجاح!");
        navigate("/");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="login-container">
      <Toaster />

      <div className="login_content">
        <h2 className="login-title">تسجيل الدخول</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">البريد الإلكتروني:</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">كلمة المرور:</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-button" type="submit">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
