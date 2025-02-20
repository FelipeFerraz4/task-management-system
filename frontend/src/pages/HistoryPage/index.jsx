import Header from "../../components/HeaderAfterLogin";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import History from "./components/History";

const navLinks = [{ label: "Home", href: "/home" }];

const user = { name: "João Silva" };

function EmployeeManagement() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Usuário deslogado");
    navigate("/login");
  };

  return (
    <div className="base_page">
      <Header navLinks={navLinks} user={user} onLogout={handleLogout} />
        <div className="page-content d-flex">
          <History />
        </div>
        <Footer />
    </div>
  );

}

export default EmployeeManagement;
