import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../api/axiosInstance";
import "../style/details.css";
const StudentDetailPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axiosInstance.get(
          `/rest/v1/students?id=eq.${id}`
        );
        setStudent(response.data[0]);
      } catch (error) {
        setError("حدث خطأ أثناء جلب البيانات");
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => document.getElementById("certificate"),
    documentTitle: `Certificate_${id}`,
  });

  if (loading) {
    return (
      <div className="loading-container">
        <RingLoader color="#4A90E2" />
        <p className="loading-message">جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      {student ? (
        <div>
          <div id="certificate" className="certificate">
            <div className="header">
              <div className="logo1">
                <img src="/images/الجامعة1.jpeg" alt="جامعة الأزهر " />
                <p>جامعة الأزهر </p>
              </div>
              <div className="logo1">
                <img
                  src="/images/الكلية.jpeg"
                  alt="كلية الدراسات الإسلامية والعربية بنين بدمياط الجديدة"
                />
                <p>
                  كلية الدراسات الإسلامية والعربية <br /> بنين بدمياط الجديدة
                </p>
              </div>
            </div>
            <h1>نموذج إثبات قيد</h1>
            <div className="grid-container">
              <div className="grid-item">
                <strong>اسم الطالب : </strong>
                {student.name}
              </div>
              <div className="grid-item">
                <strong>الرقم القومي : </strong>
                {student.nationalId}
              </div>
              <div className="grid-item">
                <strong>مقيد بالفرقة : </strong>
                {student.AcademicBand} -{" "}
                {student.fullTime ? "انتظام" : "انتساب"}
              </div>
              <div className="grid-item">
                <strong>الشعبة : </strong>
                {student.major}
              </div>
              <div className="grid-item">
                <strong>للعام الجامعي : </strong>
                2024 / 2025
              </div>
              <div className="grid-item">
                <strong>الحالة : </strong>
                {student.status}
              </div>
            </div>
            <div className="note">
              <p>
                وقد أعطى له البيان لتقديمه إلى :
                <input
                  type="text"
                  className="destination-input"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="اكتب هنا"
                />
              </p>
            </div>
            <div className="footer_details">
              <p>المختص</p>
              <p>رئيس القسم</p>
              <p>مدير الكلية</p>
            </div>
          </div>
          <div className="print-button">
            <button onClick={handlePrint}>طباعة</button>
          </div>
        </div>
      ) : (
        <p>لا توجد بيانات لعرضها.</p>
      )}
    </div>
  );
};

export default StudentDetailPage;
