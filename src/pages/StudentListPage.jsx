import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import axiosInstance from "../api/axiosInstance";
import ConfirmationDialog from "../components/ConfirmationDialog";
import "../style/allStudents.css";

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [majorFilter, setMajorFilter] = useState("");
  const [academicBandFilter, setAcademicBandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fullTimeFilter, setFullTimeFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 15;

  const [showDialog, setShowDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const fetchStudents = async (
    major = "",
    academicBand = "",
    status = "",
    fullTime = ""
  ) => {
    setLoading(true);
    let resource = "?select=*";
    if (major) resource += `&major=eq.${major}`;
    if (academicBand) resource += `&AcademicBand=eq.${academicBand}`;
    if (status) resource += `&status=eq.${status}`;
    if (fullTimeFilter) {
      resource += `&fullTime=eq.${encodeURIComponent(fullTimeFilter)}`;
    }

    try {
      const response = await axiosInstance.get(`/rest/v1/students${resource}`);
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      setError("Error fetching students data");
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(
      majorFilter,
      academicBandFilter,
      statusFilter,
      fullTimeFilter
    );
  }, [majorFilter, academicBandFilter, statusFilter, fullTimeFilter]);

  const handleDelete = async (studentId) => {
    try {
      await axiosInstance.delete(`/rest/v1/students?id=eq.${studentId}`);
      setStudents(students.filter((student) => student.id !== studentId));
      setFilteredStudents(
        filteredStudents.filter((student) => student.id !== studentId)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
    }
    setShowDialog(false);
  };

  const confirmDelete = (studentId) => {
    setStudentToDelete(studentId);
    setShowDialog(true);
  };

  const cancelDelete = () => {
    setShowDialog(false);
    setStudentToDelete(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * studentsPerPage;
  const currentPageStudents = filteredStudents.slice(
    offset,
    offset + studentsPerPage
  );

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredStudents);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <RingLoader color="#4A90E2" />
        <p className="loading-message">جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (error) return <p>حدث خطأ: {error}</p>;

  return (
    <div className="container">
      {showDialog && (
        <ConfirmationDialog
          message="هل أنت متأكد من حذف هذا الطالب؟"
          onConfirm={() => handleDelete(studentToDelete)}
          onCancel={cancelDelete}
        />
      )}

      <div className="search-container">
        <div className="export-buttons">
          <button onClick={exportToExcel} className="export-button">
            تصدير إلى Excel
          </button>
        </div>
        <input
          type="text"
          placeholder="ابحث عن طالب بالاسم أو الرقم القومي"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="tabel_nav">
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="fullTime"> نوع الدراسة : </label>
            <select
              id="fullTime"
              value={fullTimeFilter}
              onChange={(e) => setFullTimeFilter(e.target.value)}
            >
              <option value="">كل الأنواع</option>
              <option value="انتظام">انتظام</option>
              <option value="انتساب">انتساب</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="status"> الحالة : </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">كل الحالات</option>
              <option value="مستجد">مستجد</option>
              <option value="باق">بَاقٍ</option>
              <option value="فرصة أولى">فرصة أولى</option>
              <option value="فرصة ثانية">فرصة ثانية</option>
              <option value="فرصة ثالثة">فرصة ثالثة</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="academicBand"> الفرقة الدراسية : </label>
            <select
              id="academicBand"
              value={academicBandFilter}
              onChange={(e) => setAcademicBandFilter(e.target.value)}
            >
              <option value="">كل الفرق</option>
              <option value="الأولى">الأولى</option>
              <option value="الثانية">الثانية</option>
              <option value="الثالثة">الثالثة</option>
              <option value="الرابعة">الرابعة</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="major"> الشعبة :</label>
            <select
              id="major"
              value={majorFilter}
              onChange={(e) => setMajorFilter(e.target.value)}
            >
              <option value="">كل الشُعب</option>
              <option value="الشريعة الإسلامية">الشريعة الإسلامية</option>
              <option value="اللغة العربية">اللغة العربية</option>
              <option value="أصول الدين">أصول الدين</option>
            </select>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الرقم القومي</th>
            <th className="mobile">تاريخ الميلاد</th>
            <th className="mobile">العنوان</th>
            <th className="mobile">رقم التليفون</th>
            <th>الشعبة</th>
            <th>الفرقة الدراسية</th>
            <th className="mobile">انتظام/انتساب</th>
            <th className="mobile">الحالة</th>
            <th>تعديل</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {currentPageStudents.length > 0 ? (
            currentPageStudents.map((student) => (
              <tr key={student.id}>
                <td className="student_name">
                  <Link to={`/students/${student.id}/details`}>
                    {student.name}
                  </Link>
                </td>
                <td>{student.nationalId}</td>
                <td className="mobile">{student.dateOfBirth}</td>
                <td className="mobile">{student.address}</td>
                <td className="mobile">{student.phone}</td>
                <td>{student.major}</td>
                <td>{student.AcademicBand}</td>
                <td className="mobile">{student.fullTime}</td>
                <td className="mobile">{student.status}</td>
                <td>
                  <Link
                    to={`/students/${student.id}/edit`}
                    className="edit_button"
                  >
                    تعديل
                  </Link>
                </td>
                <td>
                  <button
                    className="delete_button"
                    onClick={() => confirmDelete(student.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                لا توجد بيانات لعرضها
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"السابق"}
        nextLabel={"التالي"}
        breakLabel={"..."}
        pageCount={Math.ceil(filteredStudents.length / studentsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default StudentListPage;
