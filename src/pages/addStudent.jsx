import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { RingLoader } from "react-spinners";
import { toast, Toaster } from "react-hot-toast";
import "../style/allStudents.css";

const AddStudentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    major: "",
    fullTime: "",
    AcademicBand: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/rest/v1/students", formData);
      toast.success("تم إضافة الطالب بنجاح!");
      navigate("/students");
    } catch (error) {
      toast.error("حدث خطأ أثناء إضافة الطالب!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <RingLoader color="#4A90E2" />
        <p className="loading-message">جاري إضافة الطالب...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Toaster />
      <h1 className="students_header">إضافة طالب جديد</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>الاسم:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>الرقم القومي:</label>
          <input
            type="text"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>تاريخ الميلاد:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>العنوان:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>رقم التليفون:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>الشعبة:</label>
          <select
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="select_edit"
            required
          >
            <option value="">اختر</option>
            <option value="الشريعة الإسلامية">الشريعة الإسلامية</option>
            <option value="اللغة العربية">اللغة العربية</option>
            <option value="أصول الدين">أصول الدين</option>
          </select>
        </div>
        <div className="form-group">
          <label>انتظام/انتساب:</label>
          <select
            name="fullTime"
            value={formData.fullTime}
            onChange={handleChange}
            className="select_edit"
            required
          >
            <option value="">اختر</option>
            <option value="انتظام">انتظام</option>
            <option value="انتساب">انتساب</option>
          </select>
        </div>
        <div className="form-group">
          <label>الفرقة الدراسية:</label>
          <select
            name="AcademicBand"
            value={formData.AcademicBand}
            onChange={handleChange}
            className="select_edit"
            required
          >
            <option value="">اختر</option>
            <option value="الأولى">الأولى</option>
            <option value="الثانية">الثانية</option>
            <option value="الثالثة">الثالثة</option>
            <option value="الرابعة">الرابعة</option>
          </select>
        </div>
        <button type="submit" className="edit_button">
          إضافة الطالب
        </button>
      </form>
    </div>
  );
};

export default AddStudentPage;
