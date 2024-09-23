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

        <Route
          element={
            <PrivateRoute>
              <RootLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route path="/students/:id/edit" element={<EditStudentPage />} />
          <Route path="/students/:id/details" element={<StudentDetailPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default RoutesApp;
