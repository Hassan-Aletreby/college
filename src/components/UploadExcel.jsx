// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import axiosInstance from "../api/axiosInstance";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const UploadExcel = ({ onUploadSuccess }) => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       toast.error("يرجى اختيار ملف Excel!");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const binaryStr = e.target.result;
//       const wb = XLSX.read(binaryStr, { type: "binary" });
//       const sheetName = wb.SheetNames[0];
//       const ws = wb.Sheets[sheetName];
//       const data = XLSX.utils.sheet_to_json(ws);

//       try {
//         await axiosInstance.post("/rest/v1/students", data);
//         toast.success("تم رفع البيانات بنجاح!");
//         if (onUploadSuccess) {
//           onUploadSuccess();
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error(error);
//       }
//     };

//     reader.readAsBinaryString(file);
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept=".xlsx, .xls"
//         onChange={handleFileChange}
//         className="file_input"
//       />
//       <button onClick={handleUpload}>رفع الملف</button>
//       <ToastContainer />
//     </div>
//   );
// };

// export default UploadExcel;
