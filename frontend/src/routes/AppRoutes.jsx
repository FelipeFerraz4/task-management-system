import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import HomeAfterLogin from "../pages/HomeAfterLogin";
import EmployeeManagement from "../pages/EmployeeManagement";
import ProfilePage from "../pages/ProfilePage";
import HistoryPage from "../pages/HistoryPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<HomeAfterLogin />}/>
      <Route path="/profile" element={<ProfilePage />}/>
      <Route path="/task/history" element={<HistoryPage />}/>
      <Route path="/employee-management" element={<EmployeeManagement />}/>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
