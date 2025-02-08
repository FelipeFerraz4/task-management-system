import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import HomeAfterLogin from "../pages/HomeAfterLogin";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<HomeAfterLogin />}/>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
