import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import HomeAfterLogin from "../pages/HomeAfterLogin";
import EmployeeManagement from "../pages/EmployeeManagement";
import ProfilePage from "../pages/ProfilePage";
import MyTasksPage from "../pages/MyTasksPage";
import TaskManagementPage from "../pages/TaskManagementPage";
import DashboardPage from "../pages/DashboardPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<HomeAfterLogin />}/>
      <Route path="/profile" element={<ProfilePage />}/>
      <Route path="/dashboard" element={<DashboardPage />}/>
      <Route path="/task/management" element={<TaskManagementPage />}/>
      <Route path="/task/metasks" element={<MyTasksPage />}/>
      <Route path="/employee/management" element={<EmployeeManagement />}/>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
