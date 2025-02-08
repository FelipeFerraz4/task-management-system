import Header from "../../components/HeaderAfterLogin";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import PageData from "./components/PageData";

const navLinks = [{ label: "Início", href: "/" }];

const user = { name: "João Silva" };

function HomeAfterLogin() {
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
          <PageData />
        </div>
        <Footer />
    </div>
  );

}

export default HomeAfterLogin;
