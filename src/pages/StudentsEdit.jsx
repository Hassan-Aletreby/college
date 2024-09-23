import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { RingLoader } from "react-spinners";
import { toast, Toaster } from "react-hot-toast";
import "../style/allStudents.css";

const EditStudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/rest/v1/students", {
          params: { id: `eq.${id}` },
        });
        setFormData(response.data[0]);
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`/rest/v1/students?id=eq.${id}`, formData);
      toast.success("تم تعديل بيانات الطالب بنجاح!"); // رسالة نجاح
      navigate("/students");
    } catch (error) {
      toast.error("حدث خطأ أثناء تعديل البيانات!"); // رسالة خطأ
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <RingLoader color="#4A90E2" />
        <p className="loading-message">جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (error) {
    return <p>حدث خطأ: {error}</p>;
  }

  return (
    <div className="container">
      <Toaster />
      <h1 className="students_header">تعديل بيانات الطالب</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>الاسم:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled
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
            disabled
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
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
            disabled
          />
        </div>
        <div className="form-group">
          <label>انتظام/انتساب:</label>
          <select
            name="fullTime"
            value={formData.fullTime}
            onChange={handleChange}
            className="select_edit"
          >
            <option value="">اختر</option>
            <option value="انتظام">انتظام</option>
            <option value="انتساب">انتساب</option>
          </select>
        </div>
        <div className="form-group">
          <label>الفرقة الدراسية:</label>
          <input
            type="text"
            name="AcademicBand"
            value={formData.AcademicBand}
            onChange={handleChange}
            required
            disabled
          />
        </div>
        <button type="submit" className="edit_button">
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
};

export default EditStudentPage;
