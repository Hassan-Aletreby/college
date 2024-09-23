// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import RootLayout from "../components/RootLayout";
// import Home from "../pages/home";
// import NotFound from "../pages/pageNotFound";
// import StudentListPage from "../pages/StudentListPage";
// import EditStudentPage from "../pages/StudentsEdit";
// import StudentDetailPage from "../pages/studentDetails";
// function RoutesApp() {
//   return (
//     <Router>
//       <Routes>
//         <Route element={<RootLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/students" element={<StudentListPage />} />
//           <Route path="/students/:id/edit" element={<EditStudentPage />} />
//           <Route path="/students/:id/details" element={<StudentDetailPage />} />
//         </Route>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default RoutesApp;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import Home from "../pages/home";
import NotFound from "../pages/pageNotFound";
import StudentListPage from "../pages/StudentListPage";
import EditStudentPage from "../pages/StudentsEdit";
import StudentDetailPage from "../pages/studentDetails";
import Login from "../pages/loginPage";
import PrivateRoute from "../router/PrivateRoute";

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<RootLayout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <StudentListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/students/:id/edit"
            element={
              <PrivateRoute>
                <EditStudentPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/students/:id/details"
            element={
              <PrivateRoute>
                <StudentDetailPage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default RoutesApp;
