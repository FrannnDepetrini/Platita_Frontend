// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Protected from "../components/Protected/Protected";

// Guest
import Layout from "../components/Layout/Layout";

// import Categories from "../components/categories/Categories/Categories";
import Home from "../pages/guest/Home/Home";
import Register from "../pages/guest/Register/Register";

// Employee
import EmployeeHome from "../pages/employee/EmployeeHome/EmployeeHome";
import EmployeeJobDetails from "../pages/employee/EmployeeJobDetails/EmployeeJobDetails";
import Postulations from "../pages/employee/Postulations/Postulations";
import EmployeeHistorial from "../pages/employee/EmployeeHistorial/EmployeeHistorial";
import EmployeeRating from "../pages/employee/EmployeeRating/EmployeeRating";

// Employer
import EmployerRequest from "../pages/employer/EmployerRequest/EmployerRequest";
import EmployerHistorial from "../pages/employer/EmployerHistorial/EmployerHistorial";

// Moderator
import ModeratorHome from "../pages/moderator/ModeratorHome/ModeratorHome";

// Admin
import RecoverPassword from "../pages/guest/RecoverPassword/RecoverPassword";
import UserProfile from "../pages/userProfile/UserProfile";
import EmployerCreateJob from "../pages/employer/EmployerCreateJob/EmployerCreateJob";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Invitado */}
      <Route path="/" element={<Layout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route index element={<Home />} />
        {/* Empleado  */}
        <Route
          path="/employee/home"
          element={
            <Protected acceptedRoles={["Admin", "Client"]}>
              <EmployeeHome />
            </Protected>
          }
        />
        <Route
          path="/employee/job/:id"
          element={
            <Protected acceptedRoles={["Admin", "Client"]}>
              <EmployeeJobDetails />
            </Protected>
          }
        />
        <Route
          path="/employee/postulations"
          element={
            <Protected acceptedRoles={["Admin", "Client"]}>
              <Postulations />
            </Protected>
          }
        />
        <Route
          path="/employee/rating"
          element={
            <Protected acceptedRoles={["Admin", "Client"]}>
              <EmployeeRating />
            </Protected>
          }
        />
        <Route
          path="/employee/historial"
          element={
            <Protected acceptedRoles={["Admin", "Client"]}>
              <EmployeeHistorial />
            </Protected>
          }
        />

        <Route
          path="/myProfile"
          element={
            <Protected acceptedRoles={["Admin", "Client"]}>
              <UserProfile />
            </Protected>
          }
        />
        {/*Empleador*/}

        <Route
          path="/employer/createJob"
          element={
            <Protected acceptedRoles={["Admin", "Client"]}>
              <EmployerCreateJob />
            </Protected>
          }
        />
        <Route
          path="/employer/request"
          element={
            <Protected acceptedRoles={["Admin", "Client"]}>
              <EmployerRequest />
            </Protected>
          }
        />
        {/*Moderador*/}
          <Route 
          path="/moderator/home"
          element={
            <Protected acceptedRoles={["Admin", "Client"]}>
              <ModeratorHome />
            </Protected>
          }
        />
      </Route>
    </Routes>
  );
}
