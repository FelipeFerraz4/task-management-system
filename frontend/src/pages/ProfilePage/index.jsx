import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import "./styles.css";

const navLinks = [{ label: "Home", href: "/home" }];

const user = { name: "João Silva" };
const userTest = { id: "1", name: "Julia", email: "julia@gmail.com", role: "employee" };

function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Usuário deslogado");
    navigate("/login");
  };

  const handleUpdateProfile = (formData) => {
    userTest.name = formData.name;
    userTest.email = formData.email;
    userTest.role = formData.role;
  }

  return (
    <div className="base_page">
      <Header navLinks={navLinks} user={user} onLogout={handleLogout} />
        <div className="page-content d-flex">
          <UserProfile user={userTest} handleUpdateProfile={handleUpdateProfile}/>
        </div>
        <Footer />
    </div>
  );

}

export default ProfilePage;
