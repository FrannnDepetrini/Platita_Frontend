// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Protected from "../components/Protected/Protected";

// Guest
import Layout from "../components/Layout/Layout";

// import Categories from "../components/categories/Categories/Categories";
import Home from "../pages/guest/Home/Home";
import Register from "../pages/guest/Register/Register";
import UserProfile from "../pages/userProfile/UserProfile";
import RecoverPassword from "../pages/guest/RecoverPassword/RecoverPassword";

// Employee
import EmployeeHome from "../pages/employee/EmployeeHome/EmployeeHome";
import EmployeeJobDetails from "../pages/employee/EmployeeJobDetails/EmployeeJobDetails";
import Postulations from "../pages/employee/Postulations/Postulations";
import EmployeeHistorial from "../pages/employee/EmployeeHistorial/EmployeeHistorial";
import EmployeeRating from "../pages/employee/EmployeeRating/EmployeeRating";

// Employer
import EmployerRequest from "../pages/employer/EmployerRequest/EmployerRequest";
import EmployerHistorial from "../pages/employer/EmployerHistorial/EmployerHistorial";
import EmployerCreateJob from "../pages/employer/EmployerCreateJob/EmployerCreateJob";
import EmployerJobDetails from "../pages/employer/EmployerJobDetails/EmployerJobDetails";

// Moderator
import ModeratorHome from "../pages/moderator/ModeratorHome/ModeratorHome";
import ModeratorJobDetail from "../pages/moderator/moderatorJobDetail/ModeratorJobDetail";

// Admin
import SupportHome from "../pages/support/supportHome/SupportHome";
import SupportDetail from "../pages/support/supportDetail/SupportDetail";
import SysAdminCreateUser from "../pages/admin/sysAdminCreateUser/SysAdminCreateUser";

//Support
import HistoryComplains from "../pages/support/historial/HistoryComplains";

//NotFound / allowed
import NotFound from "../pages/not_found/NotFound";
import NotAllowed from "../pages/not_allowed/NotAllowed";
import GuestProtect from "./GuestProtect/GuestProtect";
import SysAdminHome from "../pages/admin/sysAdminHome/SysAdminHome";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/not-allowed" element={<NotAllowed />} />
      {/* Invitado */}
      <Route path="/" element={<Layout />}>
        <Route
          path="/register"
          element={
            <GuestProtect>
              <Register />
            </GuestProtect>
          }
        />

        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route index element={<Home />} />
        {/* Empleado  */}
        <Route
          path="/employee/home"
          element={
            <Protected acceptedRoles={["Client", "prueb"]}>
              <EmployeeHome />
            </Protected>
          }
        />
        <Route
          path="/employee/job/:id"
          element={
            <Protected acceptedRoles={["Client"]}>
              <EmployeeJobDetails />
            </Protected>
          }
        />
        <Route
          path="/employee/postulations"
          element={
            <Protected acceptedRoles={["Client"]}>
              <Postulations />
            </Protected>
          }
        />
        <Route
          path="/employee/rating"
          element={
            <Protected acceptedRoles={["Client"]}>
              <EmployeeRating />
            </Protected>
          }
        />
        <Route
          path="/employee/historial"
          element={
            <Protected acceptedRoles={["Client"]}>
              <EmployeeHistorial />
            </Protected>
          }
        />

        <Route
          path="/myProfile"
          element={
            <Protected acceptedRoles={["Client"]}>
              <UserProfile />
            </Protected>
          }
        />
        {/*Empleador*/}

        <Route
          path="/employer/createJob"
          element={
            <Protected acceptedRoles={["Client"]}>
              <EmployerCreateJob />
            </Protected>
          }
        />
        <Route
          path="/employer/request"
          element={
            <Protected acceptedRoles={["Client"]}>
              <EmployerRequest />
            </Protected>
          }
        />

        <Route
          path="/employer/jobDetails/:id"
          element={
            <Protected acceptedRoles={["Client"]}>
              <EmployerJobDetails />
            </Protected>
          }
        />

        <Route
          path="/employer/historial"
          element={
            <Protected acceptedRoles={["Client"]}>
              <EmployerHistorial />
            </Protected>
          }
        />

        {/*Moderador*/}
        <Route
          path="/moderator/home"
          element={
<<<<<<< 129-implementar-api-del-back-en-la-vista-moderatorjobdetailid
            <Protected acceptedRoles={["Moderator", "Client"]}>
=======
            <Protected acceptedRoles={["Moderator"]}>
>>>>>>> Develop
              <ModeratorHome />
            </Protected>
          }
        />
        <Route
          path="/moderator/job/detail/:id"
          element={
<<<<<<< 129-implementar-api-del-back-en-la-vista-moderatorjobdetailid
            <Protected acceptedRoles={["Moderator", "Client"]}>
=======
            <Protected acceptedRoles={["Moderator"]}>
>>>>>>> Develop
              <ModeratorJobDetail />
            </Protected>
          }
        />

        {/*Soporte*/}
        <Route
          path="/support/home"
          element={
            <Protected acceptedRoles={["SysAdmin", "Support"]}>
              <SupportHome />
            </Protected>
          }
        />
        <Route
          path="/support/historial_complains"
          element={
            <Protected acceptedRoles={["SysAdmin", "Support"]}>
              <HistoryComplains />
            </Protected>
          }
        />

        <Route
          path="/support/detail/:id"
          element={
            <Protected acceptedRoles={["SysAdmin", "Support"]}>
              <SupportDetail />
            </Protected>
          }
        />
        {/*SysAdmin*/}
        <Route
          path="/sysadmin/home"
          element={
            <Protected acceptedRoles={["SysAdmin", "Client"]}>
              <SysAdminHome />
            </Protected>
          }
        />
        <Route
          path="/sysadmin/createUser"
          element={
            <Protected acceptedRoles={["SysAdmin", "Client"]}>
              <SysAdminCreateUser />
            </Protected>
          }
        />
      </Route>
    </Routes>
  );
}
