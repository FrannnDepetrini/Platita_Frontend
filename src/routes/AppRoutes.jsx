// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Guest
import Layout from "../components/Layout/Layout";
import Login from "../pages/guest/Login/Login";
// import Categories from "../components/categories/Categories/Categories";
import Home from "../pages/guest/Home/Home";
import Register from "../pages/guest/Register/Register";

// Employee
import EmployeeHome from "../pages/employee/EmployeeHome/EmployeeHome";
import EmployeeJobDetails from "../pages/employee/EmployeeJobDetails/EmployeeJobDetails";
import Postulations from "../pages/employee/Postulations/Postulations";
import EmployeeHistorial from "../pages/employee/EmployeeHistorial/EmployeeHistorial";

// Employer
import EmployerHome from "../pages/employer/EmployerHome/EmployerHome";
import EmployerJobDetails from "../pages/employer/EmployerJobDetails/EmployerJobDetails";

// Admin
import AdminHome from "../pages/admin/AdminHome/AdminHome";
import Welcome from "../pages/guest/Welcome/Welcome";
import RecoverPassword from "../pages/guest/RecoverPassword/RecoverPassword";
import UserProfile from "../pages/userProfile/UserProfile";
import EmployerCreateJob from "../pages/employer/EmployerCreateJob/EmployerCreateJob";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Invitado */}
      <Route path="/" element={<Layout />}>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />

        <Route path="/recover-password" element={<RecoverPassword />} />

        <Route index element={<Home />} />
        {/* <Route path="/categories" element={<Categories />} /> */}
        {/* Empleado  */}
        <Route path="/employee/home" element={<EmployeeHome />} />
        <Route path="/employee/job/:id" element={<EmployeeJobDetails />} />
        <Route path="/employee/postulations" element={<Postulations />} />
        <Route path="/employee/historial" element={<EmployeeHistorial />} />

        <Route path="/myProfile" element={<UserProfile />} />
        <Route path="/employer/createJob" element={<EmployerCreateJob />} />
      </Route>

      {/* Empleador */}
      {/*<Route path="/employer/home" element={<EmployerHome />} />*/}
      {/*<Route path="/employer/job/:id" element={<EmployerJobDetails />} />*/}
      {/* Admin */}
      {/*<Route path="/admin/home" element={<AdminHome />} />*/}
    </Routes>
  );
}
